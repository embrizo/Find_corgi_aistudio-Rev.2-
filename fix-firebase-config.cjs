const fs = require('fs');
const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));

let initCode = fs.readFileSync('firebase-init.js', 'utf8');

const newConfigStr = `{
  apiKey: "${config.apiKey}",
  authDomain: "${config.authDomain}",
  projectId: "${config.projectId}",
  storageBucket: "${config.storageBucket}",
  messagingSenderId: "${config.messagingSenderId}",
  appId: "${config.appId}"
}`;

initCode = initCode.replace(/const firebaseConfig = \{[\s\S]*?\};/, `const firebaseConfig = ${newConfigStr};`);

// Update getFirestore to use the databaseId
initCode = initCode.replace(
  "export const db = getFirestore(app);",
  `export const db = getFirestore(app, "${config.firestoreDatabaseId}");`
);

fs.writeFileSync('firebase-init.js', initCode);
