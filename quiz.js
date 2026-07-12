/* ==========================================================================
   Quiz Engine for "Find the Corgi" Web App
   REVISED: Scoped to active scene vocabulary, scene-locked stickers.
   ========================================================================== */

import { gameState, sceneRef } from './state.js';
import { saveProgress, openModal, closeModal, speakWord, triggerConfetti } from './app.js';

// ─── QUIZ STATE ───────────────────────────────────────────────────────────────
let quizQuestions        = [];
let currentQuestionIndex = 0;
let correctAnswersCount  = 0;
let quizMissedWords      = [];  // word IDs missed this attempt
let answerLocked         = false; // prevent double-tap during feedback
let quizVariantOrder     = [];  // shuffled variant sequence for this quiz session

const QUIZ_QUESTION_COUNT = 8; // number of questions per quiz session

// Specific sticker unlocks associated with each scene
export const SCENE_STICKERS = {
  street: "police",
  police_station: "police",
  kitchen: "fire",
  canteen: "fire",
  supermarket: "chef",
  hospital: "doctor",
  classroom: "doctor",
  park: "astronaut",
  theme_park: "astronaut",
  airplane: "astronaut",
  airport: "astronaut",
  farm: "explorer",
  beach: "explorer",
  hotel: "explorer",
  theater: "explorer",
  ship: "explorer",
  underwater: "explorer",
  office: "explorer"
};

// ─── WEB AUDIO SYNTH ─────────────────────────────────────────────────────────
let sharedAudioCtx = null;
function getAudioCtx() {
  if (!sharedAudioCtx || sharedAudioCtx.state === "closed") {
    const Klass = window.AudioContext || window.webkitAudioContext;
    if (!Klass) return null;
    sharedAudioCtx = new Klass();
  }
  if (sharedAudioCtx.state === "suspended") sharedAudioCtx.resume();
  return sharedAudioCtx;
}

function playSynthSound(type) {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;

    if (type === "correct") {
      [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
        setTimeout(() => {
          const osc  = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.14, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.35);
        }, i * 90);
      });

    } else if (type === "incorrect") {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.45);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);

    } else if (type === "victory") {
      [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        setTimeout(() => {
          const osc  = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.14, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.45);
        }, i * 65);
      });
    }
  } catch (err) {
    console.warn("Audio synth error:", err);
  }
}

// ─── INIT QUIZ ────────────────────────────────────────────────────────────────
export function initQuiz() {
  const activeScene = sceneRef.active;
  currentQuestionIndex = 0;
  correctAnswersCount  = 0;
  quizMissedWords      = [];
  answerLocked         = false;

  // Build pool: prioritise active scene discovered words, fill to QUIZ_QUESTION_COUNT from full vocab
  const discovered = [...(gameState.discoveredWords[activeScene.id] || [])];
  const fillIds    = activeScene.vocabulary
    .map(w => w.id)
    .filter(id => !discovered.includes(id));

  const pool = [
    ...shuffle(discovered),
    ...shuffle(fillIds)
  ].slice(0, QUIZ_QUESTION_COUNT);

  quizQuestions = pool.map(id => activeScene.vocabulary.find(w => w.id === id));

  // Generate a shuffled variant order (1, 2, 3 repeated, then shuffled)
  // so question types are unpredictable each session
  const variantBase = [];
  for (let i = 0; i < QUIZ_QUESTION_COUNT; i++) variantBase.push((i % 3) + 1);
  quizVariantOrder = shuffle(variantBase);

  openModal("quiz-overlay");
  renderQuizQuestion();
  setTimeout(() => speakWord("Let's start the quiz! Listen carefully."), 300);
}

// ─── RENDER QUESTION ─────────────────────────────────────────────────────────
function renderQuizQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  if (!q) { finishQuiz(); return; }

  answerLocked = false;

  document.getElementById("quiz-current-q").textContent    = currentQuestionIndex + 1;
  document.getElementById("quiz-correct-count").textContent = correctAnswersCount;

  const fb = document.getElementById("quiz-feedback");
  fb.className = "quiz-feedback-banner hidden";

  const decoys = shuffle(
    sceneRef.active.vocabulary.filter(w => w.id !== q.id)
  ).slice(0, 3);

  const options = shuffle([q, ...decoys]);
  const variant = quizVariantOrder[currentQuestionIndex] || 1;

  const promptEl  = document.getElementById("quiz-prompt-text");
  const audioBtnOld = document.getElementById("btn-quiz-audio");

  const audioBtn = audioBtnOld.cloneNode(true);
  audioBtnOld.replaceWith(audioBtn);

  const mcGrid = document.getElementById("quiz-mc-options");
  mcGrid.innerHTML = "";

  if (variant === 1) {
    promptEl.innerHTML = `Tap the picture that matches the audio:`;
    audioBtn.style.display = "inline-flex";
    audioBtn.addEventListener("click", () => speakWord(q.wordEn));
    setTimeout(() => speakWord(q.wordEn), 500);

    options.forEach(opt => {
      const card = makeOptionCard(
        opt,
        `<span class="quiz-option-emoji">${opt.emoji}</span><span>${opt.wordTh}</span>`,
        opt.id === q.id
      );
      mcGrid.appendChild(card);
    });

  } else if (variant === 2) {
    promptEl.innerHTML = `What is <span style="color:var(--secondary);font-weight:800;">"${q.wordTh}"</span> in English?`;
    audioBtn.style.display = "none";

    options.forEach(opt => {
      const card = makeOptionCard(
        opt,
        `<span class="quiz-option-emoji">${opt.emoji}</span>
         <span style="font-size:18px;font-weight:700;">${opt.wordEn}</span>`,
        opt.id === q.id
      );
      mcGrid.appendChild(card);
    });

  } else {
    promptEl.innerHTML = `🐾 Corgi says: "Where is the <strong style="color:var(--primary);">${q.wordEn}</strong>?"`;
    audioBtn.style.display = "inline-flex";
    audioBtn.addEventListener("click", () => speakWord(`Where is the ${q.wordEn}`));
    setTimeout(() => speakWord(`Where is the ${q.wordEn}`), 500);

    options.forEach(opt => {
      const card = makeOptionCard(
        opt,
        `<span class="quiz-option-emoji">${opt.emoji}</span><span>${opt.wordTh}</span>`,
        opt.id === q.id
      );
      mcGrid.appendChild(card);
    });
  }
}

function makeOptionCard(opt, innerHtml, isCorrect) {
  const card = document.createElement("div");
  card.className       = "quiz-option-card";
  card.dataset.wordId  = opt.id;
  card.dataset.correct = isCorrect ? "1" : "0";
  card.innerHTML       = innerHtml;
  card.addEventListener("click", () => handleAnswer(isCorrect, card));
  return card;
}

// ─── ANSWER HANDLING ─────────────────────────────────────────────────────────
function handleAnswer(isCorrect, clickedCard) {
  if (answerLocked) return;
  answerLocked = true;

  const cards = document.querySelectorAll(".quiz-option-card");
  cards.forEach(c => c.style.pointerEvents = "none");

  const fb     = document.getElementById("quiz-feedback");
  const fbText = document.getElementById("quiz-feedback-text");

  if (isCorrect) {
    correctAnswersCount++;
    clickedCard.style.borderColor     = "var(--success)";
    clickedCard.style.backgroundColor = "var(--success-light)";
    playSynthSound("correct");
    fbText.textContent = "Excellent! 🎉";
    fb.className = "quiz-feedback-banner correct";

  } else {
    clickedCard.style.borderColor     = "var(--primary)";
    clickedCard.style.backgroundColor = "var(--error-light)";

    const currentQ = quizQuestions[currentQuestionIndex];
    if (!quizMissedWords.includes(currentQ.id)) quizMissedWords.push(currentQ.id);

    cards.forEach(c => {
      if (c.dataset.correct === "1") {
        c.style.borderColor = "var(--success)";
        c.style.borderStyle = "dashed";
        c.style.backgroundColor = "var(--success-light)";
      }
    });

    playSynthSound("incorrect");
    fbText.textContent = "Oops! Check the correct answer above.";
    fb.className = "quiz-feedback-banner incorrect";
  }

  fb.classList.remove("hidden");

  setTimeout(() => {
    currentQuestionIndex++;
    renderQuizQuestion();
  }, 1800);
}

// ─── FINISH QUIZ ─────────────────────────────────────────────────────────────
export function finishQuiz() {
  const activeScene = sceneRef.active;
  const total       = quizQuestions.length;
  const pct         = Math.round((correctAnswersCount / total) * 100);
  const passed      = pct >= 70;

  // Log attempt
  gameState.quizHistory.push({ score: pct, passed, timestamp: new Date().toISOString() });

  // Update review list
  quizMissedWords.forEach(id => {
    const w = activeScene.vocabulary.find(v => v.id === id);
    if (w && !gameState.reviewWords.some(r => r.wordId === id && r.sceneId === activeScene.id)) {
      gameState.reviewWords.push({ wordId: w.id, sceneId: activeScene.id, wordEn: w.wordEn, wordTh: w.wordTh });
    }
  });
  quizQuestions.forEach(q => {
    if (!quizMissedWords.includes(q.id)) {
      gameState.reviewWords = gameState.reviewWords.filter(r => !(r.wordId === q.id && r.sceneId === activeScene.id));
    }
  });

  // Per-scene quiz pass tracking
  let newSticker = "";
  if (passed) {
    gameState.quizPassed[activeScene.id] = true;
    const targetSticker = SCENE_STICKERS[activeScene.id];
    if (targetSticker && !gameState.stickers.includes(targetSticker)) {
      newSticker = targetSticker;
      gameState.stickers.push(newSticker);
    }
  }

  saveProgress();
  closeModal("quiz-overlay");

  showQuizResult({ pct, passed, correct: correctAnswersCount, total, newSticker });
}

function showQuizResult({ pct, passed, correct, total, newSticker }) {
  const STICKER_NAMES = {
    police: "Police Corgi 👮",
    fire:   "Firefighter Corgi 🚒",
    chef:   "Chef Corgi 👨‍🍳",
    doctor: "Doctor Corgi 🩺",
    astronaut: "Astronaut Corgi 🚀",
    explorer:  "Explorer Corgi 🤠"
  };

  document.getElementById("result-emoji").textContent   = passed ? "🎉" : "👍";
  document.getElementById("result-title").textContent   = passed ? "You passed!" : "Good effort!";
  document.getElementById("result-score").textContent   = `${pct}%`;
  document.getElementById("result-message").textContent =
    passed
      ? `Brilliant! ${correct}/${total} correct — keep exploring!`
      : `You got ${correct}/${total}. Practise a few more words and try again!`;

  const banner     = document.getElementById("result-sticker-banner");
  const retryBtn   = document.getElementById("btn-result-retry");
  const stickerBtn = document.getElementById("btn-result-stickers");
  const exploreBtn = document.getElementById("btn-result-explore");

  if (passed && newSticker) {
    document.getElementById("result-sticker-name").textContent = STICKER_NAMES[newSticker] || newSticker;
    banner.classList.remove("hidden");
    stickerBtn.style.display = "inline-flex";
  } else {
    banner.classList.add("hidden");
    stickerBtn.style.display = passed ? "inline-flex" : "none";
  }

  retryBtn.style.display   = passed ? "none"        : "inline-flex";
  exploreBtn.style.display = "inline-flex"; // always visible — go back to scene map

  if (passed) {
    playSynthSound("victory");
    triggerConfetti();
    speakWord(`Congratulations! You scored ${pct} percent. Brilliant work!`);
  } else {
    speakWord(`Good effort! You scored ${pct} percent. Let's try again!`);
  }

  openModal("quiz-result-modal");
}

// ─── UTILITIES ───────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Note: quiz button wiring is handled by app.js via dynamic import

