const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

code = code.replace(
  /const isMobile = \/iPhone\|iPad\|iPod\|Android\/i\.test\(navigator\.userAgent\);/,
  `const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isEmbedded = /Line|FBAV|FBAN|Instagram/i.test(navigator.userAgent);
    if (isEmbedded) {
      alert("Please tap the menu button (•••) and select 'Open in Browser' (Safari/Chrome) to log in with Google.");
      return;
    }`
);

fs.writeFileSync('app.js', code);
