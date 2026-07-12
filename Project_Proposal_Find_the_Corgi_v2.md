# Project Proposal: Find the Corgi - 1000 Words Web App 🐾
### v2 — Updated with Quiz & Reward System

## 1. Concept Overview
Inspired by the popular "Find the Duck" educational book, "Find the Corgi" is an interactive, gamified web application. Instead of looking for a hidden duck, users will search for a cute, hidden Corgi dog within various beautifully illustrated scenes (e.g., a farm, a city, a beach, a house).

The primary goal is educational: as users explore the scene to find the Corgi, they can click on other objects to learn English vocabulary, aiming to teach up to 1,000 words. After learning the words in a scene, users take a short quiz — passing it unlocks a reward and the next scene.

## 2. Target Audience
- **Children and Toddlers:** Engaging visuals and a fun hide-and-seek mechanic.
- **Parents:** A highly interactive educational tool for moms and dads teaching their kids English or multiple languages.
- **Corgi Lovers:** The charming mascot will attract dog lovers of all ages.

## 3. Core Features

### 3.1 Interactive Search Mechanics
Users can pan, zoom, and click around a large, detailed illustration.

### 3.2 Vocabulary Pop-ups
Clicking on any object (e.g., an apple, a car, a tree) brings up a pop-up with the word in English, the translation (e.g., Thai), and an audio pronunciation button.

### 3.3 The Corgi Reward
Clicking the hidden Corgi triggers a celebratory animation, rewarding the user with points, and unlocks the next scene.

### 3.4 Quiz & Reward System (NEW)
Once a user has discovered all (or a set number of) vocabulary words in a scene, a **"Corgi Quiz"** unlocks. Passing the quiz is required to earn the scene's reward and unlock the next scene.

**Quiz mechanic — Tap the Matching Picture**
- The word is played as audio (with optional text for early readers).
- 3-4 pictures are shown; the child taps the one matching the word.
- Correct answer → happy chime, picture bounces/glows.
- Incorrect answer → gentle "try again" sound, no negative/shaming feedback.

**Quiz variants (to prevent repetition/boredom)**
All variants reuse the same core quiz engine (question → tappable options → feedback), just with a different prompt template:

| Variant | How it plays | Purpose |
|---|---|---|
| Audio → Picture (classic) | Hear the word, tap the matching picture | Baseline recognition |
| Odd One Out | Show 3-4 pictures, tap the one that doesn't belong | Light logic/categorization |
| Speed Round | Classic format with a fun, non-stressful countdown; bonus points for speed | Adds energy/excitement |
| Corgi Says | Corgi character "asks" for an object by name; child taps it | Reinforces mascot/brand |
| Memory Flip | Briefly show 2 words, flip face-down, tap in the order shown | Advanced — later scenes/older kids |

Variants rotate by scene number or randomly, so kids don't always get the same format. Harder variants (e.g. Memory Flip) unlock as the child progresses.

**Scoring & pass rules**
- 8-10 questions per quiz.
- Pass threshold: 70% (e.g. 7/10 correct).
- If the child doesn't pass: missed words replay once, then the quiz re-runs — no "fail" screen, just gentle retry.

**Reward on pass**
- Corgi celebration animation.
- Collectible reward (recommended: **sticker book** — visually builds up over scenes, more motivating than abstract points alone).
- Next scene unlocks.

### 3.5 Progress Tracking
A dashboard for parents to see:
- How many of the "1,000 Words" have been discovered.
- Quiz results per scene (score, pass/fail, which specific words were missed) — so parents know exactly what to review with their child.

### 3.6 Multilingual Support
Support toggling between English, Thai, and other languages, in line with how the original book is used by parents teaching multiple languages.

## 4. Data Model Notes
Each vocabulary object needs:
```
{ word, image, audio_url, translation, scene_id }
```
Each quiz attempt needs:
```
{ scene_id, quiz_variant, score, passed, timestamp, missed_words: [] }
```

## 5. Recommended Tech Stack
- **Frontend / UI:** React.js or Vue.js.
- **Interactive Illustrations:** SVG with named/grouped paths (recommended for easier hit-testing and localization) or HTML5 Canvas/PixiJS if heavier animation is needed.
- **Backend:** Serverless-first where possible; Node.js/Express only if custom logic requires it.
- **Database:** Firebase (Firestore + Auth) recommended for MVP — faster to build accounts and real-time progress sync than a self-managed PostgreSQL setup.
- **Audio:** Web Audio API for smooth, fast playback of vocabulary pronunciation.

## 6. Compliance Note
Since the target audience includes children and the app plans to collect account/progress data, child-privacy regulations (e.g. COPPA) must be factored into the account and data-storage design from the start — no behavioral ads, minimal data collection, and a parental consent flow.

## 7. Development Milestones
1. **Phase 1: Design & Assets** — Build one fully-illustrated scene (15-20 words) with a hidden Corgi and mapped clickable coordinates. Validate the core loop with real users before scaling art production.
2. **Phase 2: Core Gameplay Loop** — Vocabulary pop-ups, Corgi find/reward, and the quiz engine (starting with 1-2 variants).
3. **Phase 3: Database & Progress** — User accounts, progress tracking, quiz result storage, privacy compliance.
4. **Phase 4: Content Scale-Up** — Add remaining scenes, additional quiz variants, multilingual toggle, sticker book rewards.
5. **Phase 5: Polish** — Sound effects, background music, animations, accessibility (text size, colorblind-safe Corgi placement, audio-first cues).
