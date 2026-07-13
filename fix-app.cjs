const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

code = code.replace(
  "import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';",
  "import { doc, setDoc, getDoc, serverTimestamp, collection, getDocs } from 'firebase/firestore';"
);

// Add global var for image overrides
code = code.replace(
  "let currentUserUid = null;",
  "let currentUserUid = null;\nlet sceneConfigs = {};"
);

// Update getSceneImage to use sceneConfigs
code = code.replace(
  /function getSceneImage\(scene\) \{\s*return localStorage\.getItem\("image_override_" \+ scene\.id\) \|\| scene\.image;\s*\}/,
  `function getSceneImage(scene) {
  if (sceneConfigs[scene.id] && sceneConfigs[scene.id].image) return sceneConfigs[scene.id].image;
  return localStorage.getItem("image_override_" + scene.id) || scene.image;
}`
);

// In onAuthStateChanged, fetch configs before rendering home screen
code = code.replace(
  "        loadProgress();\n        window.renderHomeScreen();",
  `        loadProgress();
        try {
          const snap = await getDocs(collection(db, "configs"));
          snap.forEach(d => {
             const sceneId = d.id;
             sceneConfigs[sceneId] = d.data();
             // Apply vocab and corgi overrides if they exist in firestore
             // Wait, if we export code, they are in scenes.js. If we want we can apply them here.
             const scene = ALL_SCENES.find(s => s.id === sceneId);
             if (scene && d.data().vocab) scene.vocabulary = d.data().vocab;
             if (scene && d.data().corgi) scene.corgi = d.data().corgi;
          });
        } catch(e) {
          console.error("Could not load configs from firestore", e);
        }
        window.renderHomeScreen();`
);

fs.writeFileSync('app.js', code);
