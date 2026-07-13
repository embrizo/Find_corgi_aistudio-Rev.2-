const fs = require('fs');
let html = fs.readFileSync('admin.html', 'utf8');

html = html.replace(
  "const compressed = canvas.toDataURL('image/jpeg', 0.8);",
  "const compressed = canvas.toDataURL('image/webp', 0.85);"
);

fs.writeFileSync('admin.html', html);
