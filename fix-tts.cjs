const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

js = js.replace(/utt\.pitch = 1\.05;/, `utt.pitch = 1.05;\n    utt.volume = 1;`);

fs.writeFileSync('app.js', js);
