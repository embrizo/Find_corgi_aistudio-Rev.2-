const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

js = js.replace(/if \(btnMob\) btnMob\.innerHTML = "🏁 Start Corgi Quiz!";/, `if (btnMob) btnMob.innerHTML = "🏁 Quiz!";`);
js = js.replace(/if \(btnMob\) btnMob\.innerHTML = "🔒 Unlock Corgi Quiz";/g, `if (btnMob) btnMob.innerHTML = "🔒 Quiz";`);
js = js.replace(/if \(btnMob\) btnMob\.innerHTML = "🔒 Find the hidden Corgi";/, `if (btnMob) btnMob.innerHTML = "🔒 Quiz";`);
js = js.replace(/if \(btnMob\) btnMob\.innerHTML = \`🔒 Find \$\{needed - count\} more word\$\{needed - count !== 1 \? "s" : ""\}\`;/, `if (btnMob) btnMob.innerHTML = "🔒 Quiz";`);

fs.writeFileSync('app.js', js);
