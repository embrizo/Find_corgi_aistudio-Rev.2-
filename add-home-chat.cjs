const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<button id="btn-home-stickers" class="btn btn-secondary">\n\s*<span>🏆<\/span> Sticker Book\n\s*<\/button>/, `<button id="btn-home-chat" class="btn btn-secondary">
          <span>🤖</span> Chat
        </button>
        <button id="btn-home-stickers" class="btn btn-secondary">
          <span>🏆</span> Sticker Book
        </button>`);
fs.writeFileSync('index.html', html);
