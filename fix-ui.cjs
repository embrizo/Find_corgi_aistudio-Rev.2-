const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(/height: 100vh;/g, 'height: 100dvh;\n    bottom: 0;');
fs.writeFileSync('style.css', css);

let js = fs.readFileSync('app.js', 'utf8');
js = js.replace(/function speakWord\(text\) \{[\s\S]*?synth\.speak\(utt\);\n\}/, `function speakWord(text) {
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();
  
  // Timeout helps Android Chrome TTS not drop the utterance if cancelled immediately before.
  setTimeout(() => {
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang  = "en-US";
    utt.rate  = 0.88;
    utt.pitch = 1.05;
    if (preferredVoice) utt.voice = preferredVoice;
    
    // Android workaround: sometimes requires resume
    if (synth.resume) synth.resume();
    
    synth.speak(utt);
  }, 50);
}`);

fs.writeFileSync('app.js', js);
