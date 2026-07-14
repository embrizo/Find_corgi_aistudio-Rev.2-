const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regex = /document\.getElementById\('btn-login-google'\)\.addEventListener\('click', \(\) => \{[\s\S]*?\}\);/g;
const matches = code.match(regex);
console.log(matches.length);
console.log(matches);
