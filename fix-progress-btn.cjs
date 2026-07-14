const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

js = js.replace(/function updateProgressUI\(\) \{[\s\S]*?\}\n\n\/\/ ─── 13\. STICKER BOOK/, `function updateProgressUI() {
  const activeScene = sceneRef.active;
  const discoveredList = gameState.discoveredWords[activeScene.id] || [];
  const count = discoveredList.length;
  const total = activeScene.vocabulary.length;
  
  document.getElementById("discovered-count").textContent = count;
  document.getElementById("discovered-total").textContent = total;
  document.getElementById("progress-fill").style.width   = \`\${(count / total) * 100}%\`;

  const btn     = document.getElementById("btn-start-quiz");
  const btnMob  = document.getElementById("btn-start-quiz-mobile");
  const tipEl   = document.getElementById("quiz-tip-text");
  const needed  = 5;
  const isCorgiFound = gameState.corgiFound[activeScene.id] || false;
  const ready   = count >= needed && isCorgiFound;

  if (btn) btn.disabled = !ready;
  if (btnMob) btnMob.disabled = !ready;

  if (ready) {
    if (btn) btn.innerHTML = "🏁 Start Corgi Quiz!";
    if (btnMob) btnMob.innerHTML = "🏁 Start Corgi Quiz!";
    if (tipEl) tipEl.textContent = "You're ready! Take the quiz 🎉";
  } else if (!isCorgiFound && count < needed) {
    if (btn) btn.innerHTML = "🔒 Unlock Corgi Quiz";
    if (btnMob) btnMob.innerHTML = "🔒 Unlock Corgi Quiz";
    if (tipEl) tipEl.textContent = \`Find the Corgi & \$\{needed - count\} more word\$\{needed - count !== 1 ? "s" : ""\}!\`;
  } else if (!isCorgiFound) {
    if (btn) btn.innerHTML = "🔒 Find the hidden Corgi";
    if (btnMob) btnMob.innerHTML = "🔒 Find the hidden Corgi";
    if (tipEl) tipEl.textContent = "Almost there — find the Corgi!";
  } else {
    if (btn) btn.innerHTML = \`🔒 Find \$\{needed - count\} more word\$\{needed - count !== 1 ? "s" : ""\}\`;
    if (btnMob) btnMob.innerHTML = \`🔒 Find \$\{needed - count\} more word\$\{needed - count !== 1 ? "s" : ""\}\`;
    if (tipEl) tipEl.textContent = \`Discover \$\{needed - count\} more word\$\{needed - count !== 1 ? "s" : ""\} to unlock!\`;
  }
}

// ─── 13. STICKER BOOK`);

fs.writeFileSync('app.js', js);
