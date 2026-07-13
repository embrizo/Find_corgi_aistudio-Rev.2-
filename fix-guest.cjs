const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const onAuthMatch = code.match(/onAuthStateChanged\(auth, async \(user\) => \{([\s\S]*?)if \(user\) \{([\s\S]*?)\} else \{([\s\S]*?)\}\n  \}\);/);

if (!onAuthMatch) {
  console.log("Could not find onAuthStateChanged block");
  process.exit(1);
}

const userBlock = onAuthMatch[2];
const elseBlock = onAuthMatch[3];

let newCode = code.replace(onAuthMatch[0], `
  async function handleUserLogin(user) {
    const authScreen = document.getElementById('auth-screen');
    const homeScreen = document.getElementById('home-screen');
    const gameScreen = document.getElementById('game-screen');
    ${userBlock}
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      handleUserLogin(user);
    } else {${elseBlock}}
  });
`);

newCode = newCode.replace(
  "signInAsGuest().catch(err => alert(\"Guest Login Error: \" + err.message));",
  `signInAsGuest().catch(err => {
      if (err.code === 'auth/admin-restricted-operation' || err.code === 'auth/operation-not-allowed') {
        const fakeUser = {
          uid: "guest_local_" + Math.random().toString(36).substring(2, 9),
          isAnonymous: true,
          displayName: "Guest",
          email: null
        };
        handleUserLogin(fakeUser);
      } else {
        alert("Guest Login Error: " + err.message);
      }
    });`
);

fs.writeFileSync('app.js', newCode);
