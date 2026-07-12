/* ==========================================================================
   Shared State Module for "Find the Corgi" Web App
   Holds gameState and activeScene so app.js and quiz.js can both import
   from here without creating a circular dependency.
   ========================================================================== */

import { ALL_SCENES } from './scenes.js';

// ─── GAME STATE ───────────────────────────────────────────────────────────────
export const gameState = {
  discoveredWords: Object.fromEntries(ALL_SCENES.map(s => [s.id, []])),
  corgiFound:      Object.fromEntries(ALL_SCENES.map(s => [s.id, false])),
  quizPassed:      Object.fromEntries(ALL_SCENES.map(s => [s.id, false])),
  stickers: [],
  quizHistory: [],
  reviewWords: []
};

// ─── ACTIVE SCENE (mutable reference wrapper) ────────────────────────────────
// We export an object so mutations are visible across all importers.
export const sceneRef = {
  active: ALL_SCENES[0]
};
