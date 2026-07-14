const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');
code = code.replace(/    \}\n  \}\);\n  \}\);/, '    }\n  });');
fs.writeFileSync('app.js', code);
