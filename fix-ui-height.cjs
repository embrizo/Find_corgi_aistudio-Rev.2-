const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/height: 100dvh;\n    bottom: 0;/g, 'bottom: 0;\n    /* height removed to use top/bottom for stretching */');

fs.writeFileSync('style.css', css);
