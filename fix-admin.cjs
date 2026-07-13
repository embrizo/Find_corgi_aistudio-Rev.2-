const fs = require('fs');
let html = fs.readFileSync('admin.html', 'utf8');

// Replace imports
html = html.replace(
  "import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';",
  "import { collection, getDocs, doc, updateDoc, setDoc, deleteField } from 'firebase/firestore';"
);

// Add global configs
html = html.replace(
  "onAuthStateChanged(auth, async (user) => {",
  "let sceneConfigs = {};\nonAuthStateChanged(auth, async (user) => {"
);

// Fetch configs inside the else block
html = html.replace(
  "      } else {\n        fetchUsers();\n      }",
  `      } else {
        await fetchConfigs();
        renderStats();
        renderScenes();
        fetchUsers();
      }`
);

// Add fetchConfigs function
html = html.replace(
  "    async function fetchUsers() {",
  `    async function fetchConfigs() {
      try {
        const snap = await getDocs(collection(db, "configs"));
        snap.forEach(d => {
          sceneConfigs[d.id] = d.data();
        });
      } catch (e) {
        console.error("Error fetching configs:", e);
      }
    }

    async function fetchUsers() {`
);

// Remove the synchronous calls to renderStats and renderScenes at the bottom
html = html.replace(
  "    renderStats();\n    renderScenes();\n  </script>",
  "  </script>"
);

// Update getImgSrc and hasOverride
html = html.replace(
  /function getImgSrc\(scene\) \{\s*return localStorage\.getItem\('image_override_' \+ scene\.id\) \|\| scene\.image;\s*\}/,
  `function getImgSrc(scene) {
      if (sceneConfigs[scene.id] && sceneConfigs[scene.id].image) return sceneConfigs[scene.id].image;
      return localStorage.getItem('image_override_' + scene.id) || scene.image;
    }`
);

html = html.replace(
  /function hasOverride\(sceneId\) \{\s*return !!localStorage\.getItem\('image_override_' \+ sceneId\);\s*\}/,
  `function hasOverride(sceneId) {
      return !!(sceneConfigs[sceneId] && sceneConfigs[sceneId].image) || !!localStorage.getItem('image_override_' + sceneId);
    }`
);

// Update handleFile
html = html.replace(
  /function handleFile\(file, scene, imgEl, badgeEl\) \{[\s\S]*?reader\.readAsDataURL\(file\);\s*\}/,
  `async function handleFile(file, scene, imgEl, badgeEl) {
      if (!file || !file.type.startsWith('image/')) {
        showToast('⚠️ Please select an image file.');
        return;
      }
      const reader = new FileReader();
      reader.onload = async (ev) => {
        let base64 = ev.target.result;
        // Optionally resize using canvas to save space (max 1200px width)
        const img = new Image();
        img.src = base64;
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const max_size = 1200;
          if (width > max_size || height > max_size) {
             if (width > height) {
                 height *= max_size / width;
                 width = max_size;
             } else {
                 width *= max_size / height;
                 height = max_size;
             }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.8);
          
          try {
            await setDoc(doc(db, "configs", scene.id), { image: compressed }, { merge: true });
            if (!sceneConfigs[scene.id]) sceneConfigs[scene.id] = {};
            sceneConfigs[scene.id].image = compressed;
            imgEl.src = compressed;
            badgeEl.classList.add('visible');
            showToast(\`✅ Image updated for "\${scene.nameEn}"\`);
            renderStats();
          } catch(e) {
            console.error(e);
            showToast('❌ Error saving to Firestore. Document may be too large.');
          }
        };
      };
      reader.readAsDataURL(file);
    }`
);

// Update resetImage
html = html.replace(
  /function resetImage\(sceneId, imgEl, badgeEl\) \{[\s\S]*?renderStats\(\);\s*\}/,
  `async function resetImage(sceneId, imgEl, badgeEl) {
      try {
        await setDoc(doc(db, "configs", sceneId), { image: deleteField() }, { merge: true });
        if (sceneConfigs[sceneId]) {
           delete sceneConfigs[sceneId].image;
        }
        localStorage.removeItem('image_override_' + sceneId);
        const scene = ALL_SCENES.find(s => s.id === sceneId);
        imgEl.src = scene.image;
        badgeEl.classList.remove('visible');
        showToast('🗑️ Reverted to default image');
        renderStats();
      } catch (e) {
         console.error(e);
         showToast('❌ Error resetting image.');
      }
    }`
);


fs.writeFileSync('admin.html', html);
