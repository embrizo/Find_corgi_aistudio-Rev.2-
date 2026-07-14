const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/z-index: 900;/g, 'z-index: 1100;');
css = css.replace(/\.vocab-sidebar {\n\s*position: fixed;/, `.vocab-sidebar {
    position: fixed;
    padding-bottom: calc(60px + env(safe-area-inset-bottom));`);

fs.writeFileSync('style.css', css);
