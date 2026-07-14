const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/\.quiz-unlock-box \{/, `.quiz-unlock-box {
  padding-bottom: max(14px, env(safe-area-inset-bottom));`);

fs.writeFileSync('style.css', css);
