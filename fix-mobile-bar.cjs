const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<\/section>\n\n    <\/main>/, `</section>\n\n      <!-- Mobile Bottom Tab for Quiz -->\n      <div class="mobile-quiz-bar">\n        <button id="btn-start-quiz-mobile" class="btn btn-primary btn-full" disabled>\n          🔒 Unlock Corgi Quiz\n        </button>\n      </div>\n\n    </main>`);
fs.writeFileSync('index.html', html);

let css = fs.readFileSync('style.css', 'utf8');
css += `
.mobile-quiz-bar {
  display: none;
}
@media (max-width: 860px) {
  .quiz-unlock-box {
    display: none !important;
  }
  .mobile-quiz-bar {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--bg-card-solid);
    padding: 12px 16px;
    padding-bottom: max(12px, env(safe-area-inset-bottom));
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    z-index: 900;
  }
  .scene-viewer {
    padding-bottom: calc(60px + env(safe-area-inset-bottom));
  }
}
`;
fs.writeFileSync('style.css', css);

let js = fs.readFileSync('app.js', 'utf8');

// replace progress logic
js = js.replace(/const btn     = document\.getElementById\("btn-start-quiz"\);\n\s*const tipEl   = document\.getElementById\("quiz-tip-text"\);\n\s*const needed  = 5;\n\s*const isCorgiFound = gameState\.corgiFound\[activeScene\.id\] \|\| false;\n\s*const ready   = count >= needed && isCorgiFound;\n\n\s*if \(ready\) \{\n\s*btn\.disabled = false;\n\s*btn\.textContent = "🐾 Start Corgi Quiz!";\n\s*tipEl\.textContent = "Ready to test your memory\?";\n\s*\} else \{\n\s*btn\.disabled = true;\n\s*btn\.textContent = "🔒 Unlock Corgi Quiz";\n\s*if \(!isCorgiFound\) tipEl\.textContent = \`Find the Corgi and \$\{Math\.max\(0, needed - count\)\} words!\`;\n\s*else tipEl\.textContent = \`Find \$\{Math\.max\(0, needed - count\)\} more words to unlock!\`;\n\s*\}/, `const btn     = document.getElementById("btn-start-quiz");
  const btnMob  = document.getElementById("btn-start-quiz-mobile");
  const tipEl   = document.getElementById("quiz-tip-text");
  const needed  = 5;
  const isCorgiFound = gameState.corgiFound[activeScene.id] || false;
  const ready   = count >= needed && isCorgiFound;

  if (ready) {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "🐾 Start Corgi Quiz!";
    }
    if (btnMob) {
      btnMob.disabled = false;
      btnMob.textContent = "🐾 Start Corgi Quiz!";
    }
    if (tipEl) tipEl.textContent = "Ready to test your memory?";
  } else {
    if (btn) {
      btn.disabled = true;
      btn.textContent = "🔒 Unlock Corgi Quiz";
    }
    if (btnMob) {
      btnMob.disabled = true;
      btnMob.textContent = "🔒 Unlock Corgi Quiz";
    }
    if (tipEl) {
      if (!isCorgiFound) tipEl.textContent = \`Find the Corgi and \$\{Math.max(0, needed - count)\} words!\`;
      else tipEl.textContent = \`Find \$\{Math.max(0, needed - count)\} more words to unlock!\`;
    }
  }`);

js = js.replace(/document\.getElementById\("btn-start-quiz"\)\.addEventListener\("click", \(\) => \{\n\s*if \(window\.innerWidth <= 860\) \{\n\s*sidebar\.classList\.remove\("open"\);\n\s*backdrop\.classList\.add\("hidden"\);\n\s*\}\n\s*\}\);/, `document.getElementById("btn-start-quiz").addEventListener("click", () => {
    if (window.innerWidth <= 860) {
      sidebar.classList.remove("open");
      backdrop.classList.add("hidden");
    }
  });
  const btnMob = document.getElementById("btn-start-quiz-mobile");
  if (btnMob) btnMob.addEventListener("click", () => {
    if (window.innerWidth <= 860) {
      sidebar.classList.remove("open");
      backdrop.classList.add("hidden");
    }
  });`);

js = js.replace(/document\.getElementById\('btn-start-quiz'\)\?\.addEventListener\('click', initQuiz\);/, `document.getElementById('btn-start-quiz')?.addEventListener('click', initQuiz);\n  document.getElementById('btn-start-quiz-mobile')?.addEventListener('click', initQuiz);`);

fs.writeFileSync('app.js', js);
