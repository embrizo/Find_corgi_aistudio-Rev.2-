const fs = require('fs');

// Remove mobile quiz bar from index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\s*<!-- Mobile Bottom Tab for Quiz -->\n\s*<div class="mobile-quiz-bar">\n\s*<button id="btn-start-quiz-mobile" class="btn btn-primary btn-full" disabled>\n\s*🔒 Unlock Corgi Quiz\n\s*<\/button>\n\s*<\/div>/, '');

// Insert quiz button in header-left
html = html.replace(/<button id="btn-toggle-sidebar" class="btn btn-secondary" style="display: none;">\n\s*<span>📖<\/span> Words\n\s*<\/button>/, `<button id="btn-toggle-sidebar" class="btn btn-secondary" style="display: none;">
          <span>📖</span> Words
        </button>
        <button id="btn-start-quiz-mobile" class="btn btn-primary" style="display: none;" disabled>
          🔒 Quiz
        </button>`);

fs.writeFileSync('index.html', html);

// Modify CSS
let css = fs.readFileSync('style.css', 'utf8');
// Replace display block on mobile-quiz-bar
css = css.replace(/\.mobile-quiz-bar \{\n\s*display: none;\n\}/, '');
css = css.replace(/\.mobile-quiz-bar \{[\s\S]*?z-index: 1100;\n\s*\}/, '');
css = css.replace(/\.scene-viewer \{\n\s*padding-bottom: calc\(60px \+ env\(safe-area-inset-bottom\)\);\n\s*\}/g, '');
css = css.replace(/padding-bottom: calc\(60px \+ env\(safe-area-inset-bottom\)\);/g, '');
css = css.replace(/\.game-hint-overlay \{\n\s*bottom: calc\(75px \+ env\(safe-area-inset-bottom\)\);\n\s*\}/, '');

css += `
@media (max-width: 860px) {
  #btn-start-quiz-mobile {
    display: inline-flex !important;
  }
}
`;

fs.writeFileSync('style.css', css);
