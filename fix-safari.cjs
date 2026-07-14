const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

code = code.replace(
  /document\.getElementById\('btn-login-google'\)\.addEventListener\('click', \(\) => \{[\s\S]*?\}\);/,
  `document.getElementById('btn-login-google').addEventListener('click', () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // Mobile browsers (especially Safari and in-app browsers like LINE) strictly block popups.
      // Use redirect instead of popup.
      signInWithGoogleRedirect().catch(err => {
        alert("Google Login Error: " + err.message);
      });
    } else {
      signInWithGoogle().catch(err => {
        if (err.code === 'auth/popup-blocked') {
          alert("Pop-ups are blocked in this browser. Please allow popups or open the app in a standard browser.");
        } else {
          alert("Google Login Error: " + err.message);
        }
      });
    }
  });`
);

fs.writeFileSync('app.js', code);
