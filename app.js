/* ==========================================================================
   Main Game Engine for "Find the Corgi" Web App
   REVISED: Scene definitions moved to scenes.js for modularity.
   ========================================================================== */

import { ALL_SCENES, resolveAssetUrl } from './scenes.js';
import { gameState, sceneRef } from './state.js';
import { auth, db, signInWithGoogle, signInWithGoogleRedirect, signInAsGuest, logOut, ADMIN_EMAILS } from './firebase-init.js';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, collection, getDocs } from 'firebase/firestore';
import { initChat } from './chat.js';
import { t, getLang, initLangSelector, onLangChange } from './i18n.js';

// ─── 1. ACTIVE SCENE accessor (reads/writes sceneRef.active) ─────────────────
// quiz.js also imports sceneRef from state.js — no circular dependency.
function getActiveScene() { return sceneRef.active; }
function setActiveScene(scene) { sceneRef.active = scene; }

// Convenience alias used throughout this file
// (replaces `activeScene` variable references)

function getSceneImage(scene) {
  const configuredImage = sceneConfigs[scene.id] && sceneConfigs[scene.id].image;
  const image = configuredImage || localStorage.getItem("image_override_" + scene.id) || scene.image;
  return resolveAssetUrl(image);
}

// ─── 2. PAN & ZOOM STATE ──────────────────────────────────────────────────────
let tx = 0, ty = 0, scale = 1.0;
let isPanning = false;
let pointerStartX = 0, pointerStartY = 0;
let panStartTx = 0, panStartTy = 0;

const MAP_SIZE = 1000;
const MIN_SCALE = 0.6;
const MAX_SCALE = 4.0;

// ─── 3. SPEECH SYNTHESIS (Android 16 compatible) ─────────────────────────────
let preferredVoice = null;
let _audioUnlocked = false;     // Set to true after first user touch
let _activeUtterance = null;
let _synthKeepAliveTimer = null;

/**
 * Pick the best English voice. Called eagerly and again on voiceschanged.
 * Retries up to 5 times with 300 ms spacing if the list is still empty
 * (common on Android Chrome where voices load asynchronously).
 */
function _pickVoice(retries = 5) {
  const synth = window.speechSynthesis;
  if (!synth) return;
  const voices = synth.getVoices();
  if (voices.length === 0 && retries > 0) {
    setTimeout(() => _pickVoice(retries - 1), 300);
    return;
  }
  preferredVoice =
    voices.find(v => v.lang.startsWith("en") && v.name.includes("Google")) ||
    voices.find(v => v.lang.startsWith("en") && v.localService === false) ||
    voices.find(v => v.lang.startsWith("en")) ||
    null;
}

function initSpeech() {
  const synth = window.speechSynthesis;
  if (!synth) return;
  _pickVoice();
  // Also listen for the async load event (Android Chrome fires this late)
  if (typeof synth.onvoiceschanged !== 'undefined') {
    synth.onvoiceschanged = () => {
      _pickVoice();
      synth.onvoiceschanged = null;
    };
  }

  // Keep-alive: Android Chrome pauses/kills the synth queue in background;
  // pausing then resuming every 10 s prevents the silent-queue bug.
  if (_synthKeepAliveTimer) clearInterval(_synthKeepAliveTimer);
  _synthKeepAliveTimer = setInterval(() => {
    if (synth.speaking) {
      synth.pause();
      synth.resume();
    }
  }, 10000);
}

/**
 * Speak text. Robust against Android 16 autoplay policy:
 * - Waits for audio unlock if the user hasn't touched the screen yet.
 * - Force-cancels any stalled/stuck queue before speaking.
 * - Keeps a global reference so the utterance isn't GC'd mid-speech.
 */
function speakWord(text) {
  const synth = window.speechSynthesis;
  if (!synth) return;

  // Android 16 / Chrome autoplay: must have user gesture first
  if (!_audioUnlocked) {
    // Queue the speech for after the next touch
    const _pendingText = text;
    const unlockAndSpeak = () => {
      document.removeEventListener('pointerdown', unlockAndSpeak);
      speakWord(_pendingText);
    };
    document.addEventListener('pointerdown', unlockAndSpeak, { once: true });
    return;
  }

  // Cancel any currently speaking or queued utterance
  if (synth.speaking || synth.pending) {
    synth.cancel();
  }

  // Small delay after cancel so Android Chrome can flush its queue
  setTimeout(() => {
    _activeUtterance = new SpeechSynthesisUtterance(text);
    _activeUtterance.lang   = "en-US";
    _activeUtterance.rate   = 0.88;
    _activeUtterance.pitch  = 1.05;
    _activeUtterance.volume = 1;
    if (preferredVoice) _activeUtterance.voice = preferredVoice;

    // Stall-detection: if onend hasn't fired within 8 s, reset synth
    const stallGuard = setTimeout(() => {
      if (synth.speaking) synth.cancel();
    }, 8000);
    _activeUtterance.onend = () => clearTimeout(stallGuard);
    _activeUtterance.onerror = () => clearTimeout(stallGuard);

    // Resume first (Android pauses synth when tab goes to background)
    if (synth.paused) synth.resume();
    synth.speak(_activeUtterance);
  }, 80);
}

// ─── 4. INIT ──────────────────────────────────────────────────────────────────
let currentUserUid = null;
let sceneConfigs = {};
let currentWelcomeName = null;
document.addEventListener("DOMContentLoaded", () => {
  initSpeech();
  initViewport();
  setupEventListeners();
  initChat();
  initLangSelector();

  onLangChange(() => {
    const homeScreen = document.getElementById("home-screen");
    const gameScreen = document.getElementById("game-screen");
    if (homeScreen && !homeScreen.classList.contains("hidden")) window.renderHomeScreen();
    if (gameScreen && !gameScreen.classList.contains("hidden")) {
      renderSidebar();
      updateProgressUI();
    }
    const welcomeEl = document.getElementById('user-welcome');
    if (welcomeEl && currentWelcomeName) {
      welcomeEl.textContent = t('welcome_message', { name: currentWelcomeName });
    }
    const stickerModal = document.getElementById('sticker-book-modal');
    if (stickerModal && !stickerModal.classList.contains('hidden')) {
      renderStickerBook();
    }
  });

  document.getElementById('btn-login-google').addEventListener('click', () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isEmbedded = /Line|FBAV|FBAN|Instagram/i.test(navigator.userAgent);
    if (isEmbedded) {
      alert("Please tap the menu button (•••) and select 'Open in Browser' (Safari/Chrome) to log in with Google.");
      return;
    }
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
  });
  document.getElementById('btn-login-guest').addEventListener('click', () => {
    signInAsGuest().catch(err => {
      if (err.code === 'auth/admin-restricted-operation' || err.code === 'auth/operation-not-allowed' || (err.message && err.message.includes('auth/admin-restricted-operation'))) {
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
    });
  });
  document.getElementById('btn-logout').addEventListener('click', () => {
    logOut().then(() => window.location.reload());
  });

  

  async function handleUserLogin(user) {
    const authScreen = document.getElementById('auth-screen');
    const homeScreen = document.getElementById('home-screen');
    const gameScreen = document.getElementById('game-screen');
    
    if (authScreen) authScreen.style.display = 'none';
    
    const welcomeEl = document.getElementById('user-welcome');
    if (welcomeEl) {
      currentWelcomeName = user.isAnonymous ? 'Guest' : (user.displayName || 'Explorer');
      welcomeEl.textContent = t('welcome_message', { name: currentWelcomeName });
    }

    // Save user to Firestore
    try {
      const uid = user.uid;
      currentUserUid = uid;
      loadProgress();
      try {
        const snap = await getDocs(collection(db, "configs"));
        snap.forEach(d => {
            const sceneId = d.id;
            sceneConfigs[sceneId] = d.data();
            // Apply vocab and corgi overrides if they exist in firestore
            const scene = ALL_SCENES.find(s => s.id === sceneId);
            if (scene && d.data().vocab) scene.vocabulary = d.data().vocab;
            if (scene && d.data().corgi) scene.corgi = d.data().corgi;
        });
      } catch(e) {
        console.error("Could not load configs from firestore", e);
      }
      window.renderHomeScreen();
      
      let province = "Unknown";
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.region) province = data.region;
      } catch(e) { console.warn("Could not fetch location", e); }
      
      const userRef = doc(db, 'users', uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists() && docSnap.data().blocked) {
          alert("Your account has been blocked.");
          await logOut();
          window.location.reload();
          return;
      }

      await setDoc(userRef, {
        displayName: user.isAnonymous ? 'Guest' : (user.displayName || 'Guest'),
        email: user.email || null,
        isGuest: user.isAnonymous,
        lastLogin: serverTimestamp(),
        province: province
      }, { merge: true });
    } catch(e) { console.error("Error saving user to Firestore", e); }

    const isAdmin = user && user.email && ADMIN_EMAILS.includes(user.email);
    const btnAdjustHome = document.getElementById('btn-adjust-pins-home');
    const btnAdjustGame = document.getElementById('btn-adjust-pins');
    const btnAdminDash = document.getElementById('btn-admin-dashboard');
    
    if (isAdmin) {
      if (btnAdjustHome) btnAdjustHome.classList.remove('hidden');
      if (btnAdjustGame) btnAdjustGame.classList.remove('hidden');
      if (btnAdminDash) btnAdminDash.classList.remove('hidden');
    } else {
      if (btnAdjustHome) btnAdjustHome.classList.add('hidden');
      if (btnAdjustGame) btnAdjustGame.classList.add('hidden');
      if (btnAdminDash) btnAdminDash.classList.add('hidden');
    }

    // If neither screen is showing, we are probably loading fresh
    if (homeScreen && gameScreen && homeScreen.classList.contains('hidden') && gameScreen.classList.contains('hidden')) {
      window.renderHomeScreen();
      homeScreen.classList.remove('hidden');
    }
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      handleUserLogin(user);
    } else {
      const authScreen = document.getElementById('auth-screen');
      const homeScreen = document.getElementById('home-screen');
      const gameScreen = document.getElementById('game-screen');
      if (authScreen) authScreen.style.display = 'flex';
      if (homeScreen) homeScreen.classList.add('hidden');
      if (gameScreen) gameScreen.classList.add('hidden');
    }
  });

});

// Load hotspot positions saved by calibrate.html (scoped by scene id)
function loadCalibrationOverrides() {
  const activeScene = sceneRef.active;
  try {
    const savedVocab = localStorage.getItem("hotspot_override_vocab_" + activeScene.id);
    const savedCorgi = localStorage.getItem("hotspot_override_corgi_" + activeScene.id);
    if (savedVocab) {
      const calibratedVocab = JSON.parse(savedVocab);
      calibratedVocab.forEach(saved => {
        const item = activeScene.vocabulary.find(v => v.id === saved.id);
        if (item) { item.x = saved.x; item.y = saved.y; }
      });
    }
    if (savedCorgi) {
      const calibratedCorgi = JSON.parse(savedCorgi);
      activeScene.corgi.x = calibratedCorgi.x;
      activeScene.corgi.y = calibratedCorgi.y;
    }
  } catch(e) {
    console.warn("Could not load calibration overrides:", e);
  }
}

// ─── 5. HOME SCREEN & NAVIGATION ─────────────────────────────────────────────
window.showHomeScreen = function showHomeScreen() {
  document.getElementById("home-screen").classList.remove("hidden");
  document.getElementById("game-screen").classList.add("hidden");
  window.renderHomeScreen();
};
window.renderHomeScreen = function renderHomeScreen() {
  const grid = document.getElementById("scene-grid");
  grid.innerHTML = "";

  ALL_SCENES.forEach(scene => {
    const discovered = gameState.discoveredWords[scene.id] || [];
    const count = discovered.length;
    const total = scene.vocabulary.length;
    const cleared = isSceneCleared(scene.id);
    const corgiBadge = gameState.corgiFound[scene.id] ? t('corgi_badge_found') : t('corgi_badge_hidden');

    const card = document.createElement("div");
    card.className = "scene-card";
    card.innerHTML = `
      <div class="scene-card-preview">
        <img src="${getSceneImage(scene)}" alt="${scene.nameEn}" onload="this.style.display='block'; this.nextElementSibling.style.display='none';" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="fallback-placeholder" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; flex-direction: column; color: #475569; font-weight: bold; font-family: var(--font-title); font-size: 18px; text-align: center; background-color: #cbd5e1; padding: 20px;">
          <span style="font-size: 32px; margin-bottom: 8px;">🖼️</span>
          <span>${scene.nameEn}</span>
        </div>
        <span class="scene-card-progress">${t('scene_words_count', { count, total })}</span>
      </div>
      <div class="scene-card-body">
        <div class="scene-card-title">
          <span>${scene.nameEn}</span>
          <span class="th">${scene.nameTh}</span>
        </div>
        <p class="scene-card-desc">${getLang() === 'th' ? (scene.descTh || scene.desc) : scene.desc}</p>
        <div style="font-size: 11px; margin-top: 10px; font-weight:600; display:flex; gap:12px; color:var(--text-muted);">
          <span>${corgiBadge}</span>
          ${cleared ? `<span style="color:var(--success)">${t('scene_complete')}</span>` : ''}
        </div>
      </div>
      <div class="scene-card-footer">
        <button class="btn btn-primary btn-full" onclick="loadScene('${scene.id}')">${t('btn_explore')}</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function loadScene(sceneId) {
  const scene = ALL_SCENES.find(s => s.id === sceneId);
  if (!scene) return;
  setActiveScene(scene);
  const activeScene = getActiveScene();

  loadCalibrationOverrides();
  document.getElementById("home-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");

  const imgEl = document.getElementById("scene-image");
  const fallbackEl = document.getElementById("scene-image-fallback");
  if (imgEl) imgEl.style.display = 'block';
  if (fallbackEl) fallbackEl.style.display = 'none';

  const sceneImage = document.getElementById("scene-image");
  sceneImage.src = getSceneImage(activeScene);
  sceneImage.onload = () => {
    sceneImage.style.display = 'block';
    fallbackEl.style.display = 'none';
  };
  sceneImage.onerror = () => {
    sceneImage.style.display = 'none';
    fallbackEl.style.display = 'flex';
  };
  
  document.getElementById("active-scene-title").textContent = activeScene.nameEn;
  document.getElementById("active-scene-subtitle").textContent = activeScene.nameTh;
  document.getElementById("sidebar-scene-badge").textContent = `${activeScene.nameEn} (${activeScene.nameTh})`;

  renderSidebar();
  renderHotspots();
  updateProgressUI();
  
  scale = 1.0;
  centerMap();
}

function isSceneCleared(sceneId) {
  const discovered = gameState.discoveredWords[sceneId] || [];
  const scene = ALL_SCENES.find(s => s.id === sceneId);
  if (!scene) return false;
  return discovered.length === scene.vocabulary.length
    && gameState.corgiFound[sceneId] === true
    && gameState.quizPassed[sceneId] === true;
}

// ─── 6. PROGRESS PERSISTENCE ──────────────────────────────────────────────────
function loadProgress() {
  if (!currentUserUid) return;
  try {
    let raw = localStorage.getItem(`find_the_corgi_progress_${currentUserUid}`);
    if (!raw) {
      // Migrate old global progress if it exists
      const oldGlobal = localStorage.getItem("find_the_corgi_progress");
      if (oldGlobal) {
        raw = oldGlobal;
        localStorage.setItem(`find_the_corgi_progress_${currentUserUid}`, raw);
        // We do NOT remove old global so it can be migrated for another user if they share the same browser
      }
    }
    
    if (raw) {
      const saved = JSON.parse(raw);
      // discoveredWords — handle legacy format (old single-scene array)
      if (Array.isArray(saved.discoveredWords)) {
        gameState.discoveredWords.street = saved.discoveredWords;
      } else if (saved.discoveredWords) {
        gameState.discoveredWords = { ...gameState.discoveredWords, ...saved.discoveredWords };
      }
      // corgiFound — handle legacy format (old single boolean)
      if (typeof saved.corgiFound === "boolean") {
        gameState.corgiFound.street = saved.corgiFound;
      } else if (saved.corgiFound) {
        gameState.corgiFound = { ...gameState.corgiFound, ...saved.corgiFound };
      }
      // quizPassed — per-scene pass tracking (new field)
      if (saved.quizPassed) {
        gameState.quizPassed = { ...gameState.quizPassed, ...saved.quizPassed };
      }
      gameState.stickers    = saved.stickers    || [];
      gameState.quizHistory = saved.quizHistory || [];
      gameState.reviewWords = saved.reviewWords || [];
    } else {
      // Reset state for new user
      import('./scenes.js').then(({ ALL_SCENES }) => {
         gameState.discoveredWords = Object.fromEntries(ALL_SCENES.map(s => [s.id, []]));
         gameState.corgiFound = Object.fromEntries(ALL_SCENES.map(s => [s.id, false]));
         gameState.quizPassed = Object.fromEntries(ALL_SCENES.map(s => [s.id, false]));
         gameState.stickers = [];
         gameState.quizHistory = [];
         gameState.reviewWords = [];
      });
    }
  } catch (e) {
    console.warn("Could not load progress:", e);
  }
}

function saveProgress() {
  if (!currentUserUid) return;
  localStorage.setItem(`find_the_corgi_progress_${currentUserUid}`, JSON.stringify(gameState));
}


// ─── 7. SIDEBAR RENDERING ─────────────────────────────────────────────────────
function renderSidebar() {
  const activeScene = sceneRef.active;
  const list = document.getElementById("vocab-list");
  list.innerHTML = "";

  const discoveredList = gameState.discoveredWords[activeScene.id] || [];

  activeScene.vocabulary.forEach(item => {
    const discovered = discoveredList.includes(item.id);
    const card = document.createElement("div");
    card.id        = `sidebar-card-${item.id}`;
    card.className = `word-card ${discovered ? "discovered" : "undiscovered"}`;

    card.innerHTML = `
      <span class="word-card-emoji">${item.emoji}</span>
      <div class="word-info">
        <span class="word-english">${item.wordEn}</span>
        <span class="word-phonetic-sidebar">${item.phonetic}</span>
        <span class="word-thai">${discovered ? item.wordTh : "???"}</span>
      </div>
      <div class="word-actions">
        <button class="btn-sidebar-icon" data-action="speak" data-word="${item.wordEn}" title="${t('hear_english')}">🔊</button>
        <button class="btn-sidebar-icon" data-action="hint"  data-id="${item.id}"       title="${t('show_hint')}">💡</button>
      </div>`;

    card.addEventListener("click", e => {
      if (e.target.closest("[data-action]")) return;
      if (discovered) {
        showVocabModal(item);
      } else {
        triggerHint(item.id);
      }
    });

    card.querySelectorAll("[data-action]").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        if (btn.dataset.action === "speak") {
          speakWord(btn.dataset.word);
        } else {
          triggerHint(btn.dataset.id);
        }
      });
    });

    list.appendChild(card);
  });
}

// ─── 8. HOTSPOT RENDERING ─────────────────────────────────────────────────────
function renderHotspots() {
  const activeScene = sceneRef.active;
  const container = document.getElementById("hotspot-container");
  container.innerHTML = "";

  const discoveredList = gameState.discoveredWords[activeScene.id] || [];

  activeScene.vocabulary.forEach(item => {
    const discovered = discoveredList.includes(item.id);
    const el = document.createElement("div");
    el.id        = `hotspot-${item.id}`;
    el.className = `hotspot hotspot-vocab${discovered ? " discovered-active" : ""}`;
    el.style.left = `${item.x}%`;
    el.style.top  = `${item.y}%`;

    el.addEventListener("pointerdown", e => e.stopPropagation());
    el.addEventListener("click",       () => discoverWord(item));

    container.appendChild(el);
  });

  const isCorgiFound = gameState.corgiFound[activeScene.id] || false;
  const corgi = document.createElement("div");
  corgi.id        = "hotspot-corgi";
  corgi.className = `hotspot hotspot-corgi${isCorgiFound ? " found-active" : ""}`;
  corgi.style.left   = `${activeScene.corgi.x}%`;
  corgi.style.top    = `${activeScene.corgi.y}%`;
  corgi.style.width  = `${activeScene.corgi.radius * 1.8}%`;
  corgi.style.height = `${activeScene.corgi.radius * 1.8}%`;

  corgi.addEventListener("pointerdown", e => e.stopPropagation());
  corgi.addEventListener("click", () => {
    if (!gameState.corgiFound[activeScene.id]) {
      gameState.corgiFound[activeScene.id] = true;
      corgi.classList.add("found-active");
      saveProgress();
      updateProgressUI();
      triggerConfetti();
      speakWord("You found the Corgi! Amazing job!");
      openModal("corgi-found-modal");
    } else {
      speakWord("Bark! Woof!");
      triggerConfetti();
    }
  });

  container.appendChild(corgi);
}

// ─── 9. HINT ──────────────────────────────────────────────────────────────────
function triggerHint(wordId) {
  const el = document.getElementById(`hotspot-${wordId}`);
  if (!el) return;
  el.classList.add("hotspot-hint-active");
  setTimeout(() => el.classList.remove("hotspot-hint-active"), 3500);
  panToWord(wordId);
}

function panToWord(wordId) {
  const activeScene = sceneRef.active;
  const item = activeScene.vocabulary.find(w => w.id === wordId);
  if (!item) return;
  const vp = document.getElementById("scene-viewport");

  const wx = (item.x / 100) * MAP_SIZE;
  const wy = (item.y / 100) * MAP_SIZE;

  scale = Math.max(scale, 1.6);
  tx = (vp.clientWidth  / 2) - wx * scale;
  ty = (vp.clientHeight / 2) - wy * scale;

  applyTransform(true);
}

// ─── 10. VIEWPORT PAN & ZOOM ──────────────────────────────────────────────────
function initViewport() {
  const vp = document.getElementById("scene-viewport");

  document.getElementById("btn-zoom-in").addEventListener("click",    () => zoomBy( 0.3));
  document.getElementById("btn-zoom-out").addEventListener("click",   () => zoomBy(-0.3));
  document.getElementById("btn-zoom-reset").addEventListener("click", () => { scale = 1; centerMap(); });

  vp.addEventListener("pointerdown", e => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    isPanning      = true;
    pointerStartX  = e.clientX;
    pointerStartY  = e.clientY;
    panStartTx     = tx;
    panStartTy     = ty;
    vp.classList.add("is-panning");
    vp.setPointerCapture(e.pointerId);
  });

  vp.addEventListener("pointermove", e => {
    if (!isPanning) return;
    tx = panStartTx + (e.clientX - pointerStartX);
    ty = panStartTy + (e.clientY - pointerStartY);
    applyTransform();
  });

  vp.addEventListener("pointerup", e => {
    if (!isPanning) return;
    isPanning = false;
    vp.classList.remove("is-panning");
    vp.releasePointerCapture(e.pointerId);
  });

  vp.addEventListener("wheel", e => {
    e.preventDefault();
    const rect   = vp.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;
    const delta  = e.deltaY > 0 ? -0.15 : 0.15;
    zoomAtPoint(delta, cursorX, cursorY);
  }, { passive: false });
}

function centerMap() {
  const vp = document.getElementById("scene-viewport");
  tx = (vp.clientWidth  - MAP_SIZE * scale) / 2;
  ty = (vp.clientHeight - MAP_SIZE * scale) / 2;
  applyTransform();
}

function zoomBy(delta) {
  const vp = document.getElementById("scene-viewport");
  zoomAtPoint(delta, vp.clientWidth / 2, vp.clientHeight / 2);
}

function zoomAtPoint(delta, px, py) {
  const oldScale = scale;
  scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta));
  tx = px - (px - tx) * (scale / oldScale);
  ty = py - (py - ty) * (scale / oldScale);
  applyTransform();
}

function applyTransform(smooth = false) {
  const wrapper = document.getElementById("scene-map-wrapper");
  wrapper.style.transition = smooth ? "transform 0.35s cubic-bezier(0.25,0.8,0.25,1)" : "none";
  wrapper.style.transform  = `translate(${tx}px, ${ty}px) scale(${scale})`;
}

// ─── 11. WORD DISCOVERY ───────────────────────────────────────────────────────
function discoverWord(item) {
  const activeScene = sceneRef.active;
  const discoveredList = gameState.discoveredWords[activeScene.id] || [];
  
  if (!discoveredList.includes(item.id)) {
    discoveredList.push(item.id);
    gameState.discoveredWords[activeScene.id] = discoveredList;
    saveProgress();
    
    const el = document.getElementById(`hotspot-${item.id}`);
    if (el) el.classList.add("discovered-active");
    
    updateProgressUI();
    renderSidebar();
  }
  showVocabModal(item);
}

function showVocabModal(item) {
  document.getElementById("vocab-emoji").textContent      = item.emoji;
  document.getElementById("vocab-title-en").textContent   = item.wordEn;
  document.getElementById("vocab-phonetic").textContent   = item.phonetic;
  document.getElementById("vocab-title-th").textContent   = item.wordTh;

  const oldBtn = document.getElementById("vocab-audio-trigger");
  const newBtn = oldBtn.cloneNode(true);
  oldBtn.replaceWith(newBtn);
  newBtn.addEventListener("click", () => speakWord(item.wordEn));

  openModal("vocab-modal");
  speakWord(item.wordEn);
}

// ─── 12. PROGRESS UI ─────────────────────────────────────────────────────────
function updateProgressUI() {
  const activeScene = sceneRef.active;
  const discoveredList = gameState.discoveredWords[activeScene.id] || [];
  const count = discoveredList.length;
  const total = activeScene.vocabulary.length;
  
  document.getElementById("discovered-count").textContent = count;
  document.getElementById("discovered-total").textContent = total;
  document.getElementById("progress-fill").style.width   = `${(count / total) * 100}%`;

  const btn     = document.getElementById("btn-start-quiz");
  const btnMob  = document.getElementById("btn-start-quiz-mobile");
  const tipEl   = document.getElementById("quiz-tip-text");
  const needed  = 5;
  const isCorgiFound = gameState.corgiFound[activeScene.id] || false;
  const ready   = count >= needed && isCorgiFound;

  if (btn) btn.disabled = !ready;
  if (btnMob) btnMob.disabled = !ready;

  const remaining = needed - count;
  const plural = remaining !== 1 ? "s" : "";

  if (ready) {
    if (btn) btn.innerHTML = t('quiz_btn_ready');
    if (btnMob) btnMob.innerHTML = t('quiz_btn_ready_mobile');
    if (tipEl) tipEl.textContent = t('quiz_tip_ready');
  } else if (!isCorgiFound && count < needed) {
    if (btn) btn.innerHTML = t('quiz_btn_locked');
    if (btnMob) btnMob.innerHTML = `🔒 ${t('btn_quiz_locked')}`;
    if (tipEl) tipEl.textContent = t('quiz_tip_need_words', { n: remaining, s: plural });
  } else if (!isCorgiFound) {
    if (btn) btn.innerHTML = t('quiz_btn_find_corgi');
    if (btnMob) btnMob.innerHTML = `🔒 ${t('btn_quiz_locked')}`;
    if (tipEl) tipEl.textContent = t('quiz_tip_find_corgi');
  } else {
    if (btn) btn.innerHTML = t('quiz_btn_find_more', { n: remaining, s: plural });
    if (btnMob) btnMob.innerHTML = `🔒 ${t('btn_quiz_locked')}`;
    if (tipEl) tipEl.textContent = t('quiz_tip_find_more', { n: remaining, s: plural });
  }
}

// ─── 13. STICKER BOOK ────────────────────────────────────────────────────────
export const STICKERS = [
  { id: "police", titleKey: "sticker_police", emoji: "👮", image: "assets/sticker/police_corgi.png" },
  { id: "fire", titleKey: "sticker_fire", emoji: "🚒", image: "assets/sticker/fire_corgi.png" },
  { id: "chef", titleKey: "sticker_chef", emoji: "👨‍🍳" },
  { id: "doctor", titleKey: "sticker_doctor", emoji: "🩺" },
  { id: "astronaut", titleKey: "sticker_astronaut", emoji: "🚀" },
  { id: "explorer", titleKey: "sticker_explorer", emoji: "🤠" }
];

// SCENE_STICKERS is loaded from quiz.js asynchronously to avoid circular dependency.
// We cache it locally once loaded.
let _cachedSceneStickers = null;

async function getSceneStickers() {
  if (!_cachedSceneStickers) {
    const mod = await import('./quiz.js');
    _cachedSceneStickers = mod.SCENE_STICKERS;
  }
  return _cachedSceneStickers;
}

async function renderStickerBook() {
  const grid = document.getElementById("sticker-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const SCENE_STICKERS = await getSceneStickers();

  STICKERS.forEach(sticker => {
    const associatedScenes = ALL_SCENES.filter(scene => SCENE_STICKERS[scene.id] === sticker.id);
    const completedCount = associatedScenes.filter(scene => gameState.quizPassed[scene.id]).length;
    const totalCount = associatedScenes.length;
    
    const unlocked = gameState.stickers.includes(sticker.id);

    const slot = document.createElement("div");
    slot.className = `sticker-slot ${unlocked ? "" : "locked"}`;
    slot.dataset.sticker = sticker.id;

    const stickerTitle = t(sticker.titleKey);
    let mediaHtml = "";
    if (sticker.image) {
      mediaHtml = `<img src="${resolveAssetUrl(sticker.image)}" alt="${stickerTitle}">`;
    } else {
      mediaHtml = `<span class="sticker-emoji-placeholder">${sticker.emoji}</span>`;
    }

    const sceneStatusList = associatedScenes.map(s => {
      const isDone = gameState.quizPassed[s.id];
      return `${s.nameEn} ${isDone ? "✅" : "❌"}`;
    }).join(", ");

    slot.innerHTML = `
      <div class="sticker-wrapper" title="${sceneStatusList}">
        ${mediaHtml}
      </div>
      <span class="sticker-title">${stickerTitle}</span>
      <span class="sticker-progress">${t('sticker_scenes_count', { completed: completedCount, total: totalCount })}</span>
    `;

    grid.appendChild(slot);
  });
}


// ─── 14. MODAL HELPERS ───────────────────────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
}
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// ─── 15. EVENT LISTENERS ─────────────────────────────────────────────────────
function setupEventListeners() {
  // Mobile sidebar toggle drawer
  const toggleBtn = document.getElementById("btn-toggle-sidebar");
  const sidebar = document.querySelector(".vocab-sidebar");
  
  // Create backdrop if it doesn't exist
  let backdrop = document.getElementById("sidebar-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = "sidebar-backdrop";
    backdrop.className = "sidebar-backdrop hidden";
    document.body.appendChild(backdrop);
  }

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    backdrop.classList.remove("hidden");
  });

  backdrop.addEventListener("click", () => {
    sidebar.classList.remove("open");
    backdrop.classList.add("hidden");
  });

  // When clicking a card in the sidebar on mobile, close the drawer
  document.getElementById("vocab-list").addEventListener("click", (e) => {
    if (window.innerWidth <= 860 && e.target.closest(".word-card")) {
      sidebar.classList.remove("open");
      backdrop.classList.add("hidden");
    }
  });

  // Also close when quiz button is clicked
  document.getElementById("btn-start-quiz").addEventListener("click", () => {
    if (window.innerWidth <= 860) {
      sidebar.classList.remove("open");
      backdrop.classList.add("hidden");
    }
  });
  const btnMob = document.getElementById("btn-start-quiz-mobile");
  if (btnMob) btnMob.addEventListener("click", () => {
    if (window.innerWidth <= 860) {
      sidebar.classList.remove("open");
      backdrop.classList.add("hidden");
    }
  });

  document.getElementById("btn-go-home").addEventListener("click", window.showHomeScreen);

  document.getElementById("btn-close-vocab").addEventListener("click", () => closeModal("vocab-modal"));
  document.getElementById("btn-vocab-ok").addEventListener("click",    () => closeModal("vocab-modal"));

  document.getElementById("btn-corgi-found-ok").addEventListener("click", () => closeModal("corgi-found-modal"));

  document.getElementById("btn-home-stickers").addEventListener("click", () => {
    renderStickerBook();
    openModal("sticker-book-modal");
  });
  document.getElementById("btn-home-parent").addEventListener("click", () => {
    generateParentGateCode();
    openModal("parent-gate-modal");
  });

  document.getElementById("btn-game-stickers").addEventListener("click", () => {
    renderStickerBook();
    openModal("sticker-book-modal");
  });

  const btnAdjustPins = document.getElementById("btn-adjust-pins");
  if (btnAdjustPins) {
    btnAdjustPins.addEventListener("click", () => {
      const activeScene = sceneRef.active;
      if (activeScene) {
        window.location.href = `/calibrate.html?scene=${activeScene.id}`;
      } else {
        window.location.href = `/calibrate.html`;
      }
    });
  }
  document.getElementById("btn-close-stickers").addEventListener("click", () => closeModal("sticker-book-modal"));

  document.getElementById("btn-result-stickers").addEventListener("click", () => {
    closeModal("quiz-result-modal");
    renderStickerBook();
    openModal("sticker-book-modal");
  });
  document.getElementById("btn-result-retry").addEventListener("click", () => {
    closeModal("quiz-result-modal");
    if (typeof initQuiz === "function") initQuiz();
  });
  document.getElementById("btn-result-explore").addEventListener("click", () => {
    closeModal("quiz-result-modal");
    // stay on scene map — nothing else needed
  });
  document.getElementById("btn-close-result").addEventListener("click", () => {
    closeModal("quiz-result-modal");
  });

  document.getElementById("btn-close-parent-gate").addEventListener("click", () => closeModal("parent-gate-modal"));
  document.getElementById("btn-parent-gate-submit").addEventListener("click", verifyParentGate);
  document.getElementById("parent-gate-input").addEventListener("keydown", e => {
    if (e.key === "Enter") verifyParentGate();
  });

  document.getElementById("btn-close-parent-dash").addEventListener("click",  () => closeModal("parent-dashboard-modal"));
  document.getElementById("btn-parent-dash-close").addEventListener("click",  () => closeModal("parent-dashboard-modal"));

  document.getElementById("btn-reset-data").addEventListener("click", () => openModal("reset-confirm-modal"));
  document.getElementById("btn-reset-cancel").addEventListener("click",  () => closeModal("reset-confirm-modal"));
  document.getElementById("btn-reset-confirm").addEventListener("click", () => {
    closeModal("reset-confirm-modal");
    closeModal("parent-dashboard-modal");
    if (currentUserUid) localStorage.removeItem(`find_the_corgi_progress_${currentUserUid}`);
    location.reload();
  });

  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", e => {
      if (e.target === overlay) overlay.classList.add("hidden");
    });
  });
}

// ─── 16. PARENT GATE ─────────────────────────────────────────────────────────
let activeGateCode = "";

function generateParentGateCode() {
  const names  = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
  const digits = Array.from({length: 4}, () => Math.floor(Math.random() * 10));
  activeGateCode = digits.join("");
  document.getElementById("parent-gate-text").textContent = digits.map(d => names[d]).join(" ");
  document.getElementById("parent-gate-input").value      = "";
  document.getElementById("parent-gate-error").classList.add("hidden");
}

function verifyParentGate() {
  const input = document.getElementById("parent-gate-input").value.trim();
  if (input === activeGateCode) {
    closeModal("parent-gate-modal");
    openParentDashboard();
  } else {
    document.getElementById("parent-gate-error").classList.remove("hidden");
    generateParentGateCode();
  }
}

function openParentDashboard() {
  let overallFound = 0;
  let overallTotal = 0;
  let scenesCleared = 0;

  ALL_SCENES.forEach(scene => {
    const list = gameState.discoveredWords[scene.id] || [];
    overallFound += list.length;
    overallTotal += scene.vocabulary.length;
    if (isSceneCleared(scene.id)) {
      scenesCleared++;
    }
  });

  document.getElementById("dash-words-found").textContent    = `${overallFound}/${overallTotal}`;
  document.getElementById("dash-scenes-cleared").textContent   = `${scenesCleared}/${ALL_SCENES.length}`;
  document.getElementById("dash-quiz-completed").textContent = `${gameState.quizHistory.length} time${gameState.quizHistory.length !== 1 ? "s" : ""}`;
  document.getElementById("dash-stickers-count").textContent = `${gameState.stickers.length}/6`;

  const ul = document.getElementById("parent-review-list");
  ul.innerHTML = "";
  if (gameState.reviewWords.length === 0) {
    ul.innerHTML = '<li class="empty-list">No review words yet — great work!</li>';
  } else {
    gameState.reviewWords.forEach(w => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${w.wordEn}</span><span class="missed-word-th">${w.wordTh}</span>`;
      ul.appendChild(li);
    });
  }

  openModal("parent-dashboard-modal");
}

// ─── 17. CONFETTI ────────────────────────────────────────────────────────────
function triggerConfetti() {
  if (typeof confetti !== "function") return;
  confetti({ particleCount: 160, spread: 85, origin: { y: 0.55 } });
}

window.loadScene = loadScene;

// Wire quiz button after quiz.js loads (breaks circular dependency — quiz.js imports from state.js not app.js)
import('./quiz.js').then(({ initQuiz }) => {
  document.getElementById('btn-start-quiz')?.addEventListener('click', initQuiz);
  document.getElementById('btn-start-quiz-mobile')?.addEventListener('click', initQuiz);
  document.getElementById('btn-exit-quiz')?.addEventListener('click', () => {
    document.getElementById('quiz-overlay')?.classList.add('hidden');
  });
});

export { saveProgress, openModal, closeModal, speakWord, triggerConfetti, updateProgressUI, renderSidebar };

// ── Android 16 Audio Unlock ──────────────────────────────────────────────────
// The first user touch (pointerdown) unlocks both the AudioContext and the
// SpeechSynthesis engine. A silent 0-volume utterance "warms up" the TTS
// pipeline so subsequent real words play immediately.
document.addEventListener('pointerdown', () => {
  if (_audioUnlocked) return;
  _audioUnlocked = true;

  const synth = window.speechSynthesis;
  if (synth) {
    // Warm-up: silent utterance primes the TTS engine on Android
    const warmUp = new SpeechSynthesisUtterance("");
    warmUp.volume = 0;
    warmUp.lang = "en-US";
    synth.speak(warmUp);
  }

  // Also try to unlock Web Audio (used by some sound effects)
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
  } catch(e) { /* non-critical */ }
}, { once: true });
