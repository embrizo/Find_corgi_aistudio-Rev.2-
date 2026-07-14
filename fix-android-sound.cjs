const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

js = js.replace(/function speakWord\(text\) \{[\s\S]*?\}, 50\);\n\}/, `function speakWord(text) {
  const synth = window.speechSynthesis;
  if (!synth) return;
  
  if (synth.speaking) {
    synth.cancel();
  }
  
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang  = "en-US";
  utt.rate  = 0.88;
  utt.pitch = 1.05;
  utt.volume = 1;
  if (preferredVoice) utt.voice = preferredVoice;
  
  if (synth.resume) synth.resume();
  synth.speak(utt);
}`);

fs.writeFileSync('app.js', js);
