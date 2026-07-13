const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// 1. Add currentUserUid
code = code.replace(
  '// ─── 4. INIT ──────────────────────────────────────────────────────────────────',
  '// ─── 4. INIT ──────────────────────────────────────────────────────────────────\nlet currentUserUid = null;'
);

// 2. Remove loadProgress() from DOMContentLoaded
code = code.replace(
  '  initSpeech();\n  loadProgress();',
  '  initSpeech();'
);

// 3. Add loadProgress to onAuthStateChanged
code = code.replace(
  '      // Save user to Firestore\n      try {\n        const uid = user.uid;',
  `      // Save user to Firestore\n      try {\n        const uid = user.uid;\n        currentUserUid = uid;\n        loadProgress();\n        window.renderHomeScreen();`
);

// 4. Update loadProgress and saveProgress
const newProgressCode = `// ─── 6. PROGRESS PERSISTENCE ──────────────────────────────────────────────────
function loadProgress() {
  if (!currentUserUid) return;
  try {
    let raw = localStorage.getItem(\`find_the_corgi_progress_\${currentUserUid}\`);
    if (!raw) {
      // Migrate old global progress if it exists
      const oldGlobal = localStorage.getItem("find_the_corgi_progress");
      if (oldGlobal) {
        raw = oldGlobal;
        localStorage.setItem(\`find_the_corgi_progress_\${currentUserUid}\`, raw);
        // We do NOT remove old global so it can be migrated for another user if they share the same browser
      }
    }
    
    if (raw) {
      const saved = JSON.parse(raw);
      // discoveredWords — handle legacy format (old single-scene array)
      if (Array.isArray(saved.discoveredWords)) {
        gameState.discoveredWords.street = saved.discoveredWords;
      } else if (saved.discoveredWords) {
        gameState.discoveredWords = { ...gameState.discoveredWords, ...saved.discoveredWords };
      }
      // corgiFound — handle legacy format (old single boolean)
      if (typeof saved.corgiFound === "boolean") {
        gameState.corgiFound.street = saved.corgiFound;
      } else if (saved.corgiFound) {
        gameState.corgiFound = { ...gameState.corgiFound, ...saved.corgiFound };
      }
      // quizPassed — per-scene pass tracking (new field)
      if (saved.quizPassed) {
        gameState.quizPassed = { ...gameState.quizPassed, ...saved.quizPassed };
      }
      gameState.stickers    = saved.stickers    || [];
      gameState.quizHistory = saved.quizHistory || [];
      gameState.reviewWords = saved.reviewWords || [];
    } else {
      // Reset state for new user
      import('./scenes.js').then(({ ALL_SCENES }) => {
         gameState.discoveredWords = Object.fromEntries(ALL_SCENES.map(s => [s.id, []]));
         gameState.corgiFound = Object.fromEntries(ALL_SCENES.map(s => [s.id, false]));
         gameState.quizPassed = Object.fromEntries(ALL_SCENES.map(s => [s.id, false]));
         gameState.stickers = [];
         gameState.quizHistory = [];
         gameState.reviewWords = [];
      });
    }
  } catch (e) {
    console.warn("Could not load progress:", e);
  }
}

function saveProgress() {
  if (!currentUserUid) return;
  localStorage.setItem(\`find_the_corgi_progress_\${currentUserUid}\`, JSON.stringify(gameState));
}
`;

code = code.replace(
  /\/\/ ─── 6\. PROGRESS PERSISTENCE ──────────────────────────────────────────────────[\s\S]*?\}\n\nfunction saveProgress\(\) \{\n[\s\S]*?\}\n/,
  newProgressCode + '\n'
);

// 5. Fix Reset Data
code = code.replace(
  /localStorage\.removeItem\("find_the_corgi_progress"\);/g,
  'if (currentUserUid) localStorage.removeItem(`find_the_corgi_progress_${currentUserUid}`);'
);

fs.writeFileSync('app.js', code);
