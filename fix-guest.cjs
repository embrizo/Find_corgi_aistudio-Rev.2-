const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

code = code.replace(
  "if (err.code === 'auth/admin-restricted-operation' || err.code === 'auth/operation-not-allowed') {",
  "if (err.code === 'auth/admin-restricted-operation' || err.code === 'auth/operation-not-allowed' || (err.message && err.message.includes('auth/admin-restricted-operation'))) {"
);

fs.writeFileSync('app.js', code);
