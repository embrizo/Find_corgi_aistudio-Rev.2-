const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/\.scene-viewer \{\n\s*padding-bottom: calc\(60px \+ env\(safe-area-inset-bottom\)\);\n\s*\}/, `.scene-viewer {
    padding-bottom: calc(60px + env(safe-area-inset-bottom));
  }
  .game-hint-overlay {
    bottom: calc(75px + env(safe-area-inset-bottom));
  }`);

fs.writeFileSync('style.css', css);
