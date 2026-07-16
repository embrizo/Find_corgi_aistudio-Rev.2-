const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

js = js.replace(/function speakWord\(text\) \{[\s\S]*?synth\.speak\(utt\);\n\}/, `let _activeUtterance = null;
function speakWord(text) {
  const synth = window.speechSynthesis;
  if (!synth) return;
  
  if (synth.speaking) {
    synth.cancel();
  }
  
  // Timeout and global reference workaround for Android Chrome TTS bug
  setTimeout(() => {
    _activeUtterance = new SpeechSynthesisUtterance(text);
    _activeUtterance.lang  = "en-US";
    _activeUtterance.rate  = 0.88;
    _activeUtterance.pitch = 1.05;
    _activeUtterance.volume = 1;
    if (preferredVoice) _activeUtterance.voice = preferredVoice;
    
    if (synth.resume) synth.resume();
    synth.speak(_activeUtterance);
  }, 50);
}`);

if (!js.includes('let _ttsInitialized')) {
  js = js + `\nlet _ttsInitialized = false;
document.addEventListener('pointerdown', () => {
  if (!_ttsInitialized && window.speechSynthesis) {
    const u = new SpeechSynthesisUtterance("");
    u.volume = 0;
    window.speechSynthesis.speak(u);
    _ttsInitialized = true;
  }
}, { once: true });
`;
}

fs.writeFileSync('app.js', js);
