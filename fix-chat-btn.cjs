const fs = require('fs');
let js = fs.readFileSync('chat.js', 'utf8');
js = js.replace(/btnChatbot\?\.addEventListener\("click", openChat\);/, `btnChatbot?.addEventListener("click", openChat);\n  document.getElementById("btn-home-chat")?.addEventListener("click", openChat);`);
fs.writeFileSync('chat.js', js);
