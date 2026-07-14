const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

code = code.replace(
  "import { auth, db, signInWithGoogle, signInAsGuest, logOut, ADMIN_EMAILS } from './firebase-init.js';",
  "import { auth, db, signInWithGoogle, signInWithGoogleRedirect, signInAsGuest, logOut, ADMIN_EMAILS } from './firebase-init.js';"
);

code = code.replace(
  /document\.getElementById\('btn-login-google'\)\.addEventListener\('click', \(\) => \{\n\s*signInWithGoogle\(\)\.catch\(err => alert\("Google Login Error: " \+ err\.message\)\);\n\s*\}\);/,
  `document.getElementById('btn-login-google').addEventListener('click', () => {
    signInWithGoogle().catch(err => {
      if (err.code === 'auth/popup-blocked') {
        alert("Pop-ups are blocked in this browser. Attempting redirect... If it fails, please open the app in a standard browser like Safari or Chrome.");
        signInWithGoogleRedirect();
      } else {
        alert("Google Login Error: " + err.message);
      }
    });
  });`
);

fs.writeFileSync('app.js', code);
