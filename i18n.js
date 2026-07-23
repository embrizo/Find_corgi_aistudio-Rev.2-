/* ==========================================================================
   i18n Module for "Find the Corgi" Web App
   Handles UI language switching (English / Thai). Word/quiz audio always
   stays in English — only visual chrome text is translated.
   ========================================================================== */

const STORAGE_KEY = "corgi_ui_lang";

const TRANSLATIONS = {
  en: {
    app_title: "Find the Corgi - 1000 Words English-Thai App 🐾",
    auth_title: "Find the Corgi!",
    auth_subtitle: "Learn English & Thai vocabulary!",
    btn_login_google: "Log in with Google",
    auth_or: "OR",
    btn_login_guest: "Play as Guest 🐾",
    home_subtitle: "1,000 Words English-Thai Learning Game",
    btn_logout: "Log Out",
    btn_admin_dashboard: "Admin Dashboard",
    btn_adjust_pins: "Adjust Pins",
    btn_chat: "Chat",
    btn_stickers: "Sticker Book",
    btn_parents_only: "Parents Only",
    section_select_scene: "Select a Scene to Explore 🗺️",
    btn_explore: "Explore 🐾",
    scene_words_count: "{count}/{total} Words",
    corgi_badge_found: "🐕 Found!",
    corgi_badge_hidden: "🐾 Hidden",
    scene_complete: "⭐ Complete!",
    btn_home: "Home",
    btn_words: "Words",
    btn_quiz_locked: "🔒 Quiz",
    scene_progress: "Scene Progress:",
    words_in_scene: "Words in this Scene",
    quiz_locked_default: "🔒 Unlock Corgi Quiz",
    quiz_tip_default: "Find the Corgi and 5 words to unlock!",
    viewport_hint: "💡 Drag to pan · scroll to zoom · click objects to learn!",
    chat_title: "🤖 Chat with AI",
    chat_greeting: "Hi there! I'm your learning assistant. Ask me anything about English, Thai, or this game!",
    chat_placeholder: "Type your message...",
    chat_send: "Send",
    chat_thinking: "Thinking...",
    chat_error_processing: "Sorry, I had trouble processing that.",
    chat_error_network: "Network error. Please try again later.",
    listen: "Listen",
    great_ok: "Great! 👍",
    corgi_found_title: "You found the Corgi!",
    corgi_found_subtitle: "Bark! Woof! 🎉 Amazing detective work!",
    corgi_found_desc: "You can now unlock the <strong>Corgi Quiz</strong> once you've found 5 words in this scene!",
    yay: "Yay! 🐾",
    quiz_question_of: "Question",
    quiz_stars: "⭐ {count} correct",
    quiz_stars_suffix: "correct",
    quiz_default_prompt: "Tap the picture that matches!",
    quiz_prompt_listen: "Tap the picture that matches the audio:",
    quiz_prompt_what_is: 'What is "{word}" in English?',
    quiz_prompt_corgi_says: '🐾 Corgi says: "Where is the {word}?"',
    quiz_feedback_correct: "Excellent! 🎉",
    quiz_feedback_incorrect: "Oops! Check the correct answer above.",
    result_passed_title: "You passed!",
    result_failed_title: "Good effort!",
    result_score_label: "Score",
    result_passed_msg: "Brilliant! {correct}/{total} correct — keep exploring!",
    result_failed_msg: "You got {correct}/{total}. Practise a few more words and try again!",
    sticker_unlocked: "🏆 New Sticker Unlocked:",
    btn_try_again: "Try Again 🔄",
    btn_keep_exploring: "Keep Exploring 🗺️",
    btn_sticker_book: "Sticker Book 🏆",
    sticker_book_title: "Your Sticker Book 🏆",
    sticker_book_subtitle: "Complete quizzes to earn Corgi badges!",
    parent_gate_title: "Parental Verification 🔒",
    parent_gate_desc: "Type the numbers shown below (as digits) to continue:",
    parent_gate_placeholder: "e.g. 3402",
    parent_gate_go: "Go →",
    parent_gate_error: "Oops! That's not right. Try again.",
    parent_dashboard_title: "Parents Dashboard 📊",
    progress_summary: "Progress Summary",
    overall_words: "Overall Words Discovered:",
    scenes_cleared: "Scenes Fully Cleared:",
    quiz_completed: "Quiz Completed:",
    stickers_earned: "Stickers Earned:",
    words_to_review: "Words to Review",
    review_desc: "Words missed in quizzes — worth practising!",
    no_review_words: "No review words yet! Keep it up.",
    image_manager: "⚙️ Image Manager",
    calibrate_pins: "🎯 Calibrate Pins",
    btn_reset_progress: "Reset Progress",
    btn_close: "Close",
    reset_confirm_title: "⚠️ Reset All Progress?",
    reset_confirm_desc: "This will erase all discovered words, quiz history, and sticker achievements across all scenes. This cannot be undone!",
    btn_cancel: "Cancel",
    btn_yes_reset: "Yes, Reset",
    quiz_tip_ready: "You're ready! Take the quiz 🎉",
    quiz_tip_need_words: "Find the Corgi & {n} more word{s}!",
    quiz_tip_find_corgi: "Almost there — find the Corgi!",
    quiz_tip_find_more: "Discover {n} more word{s} to unlock!",
    quiz_btn_ready: "🏁 Start Corgi Quiz!",
    quiz_btn_ready_mobile: "🏁 Quiz!",
    quiz_btn_locked: "🔒 Unlock Corgi Quiz",
    quiz_btn_find_corgi: "🔒 Find the hidden Corgi",
    quiz_btn_find_more: "🔒 Find {n} more word{s}",
    welcome_message: "Welcome, {name}! 🐾",
    lang_label: "Language",
    sticker_police: "Police Corgi 👮",
    sticker_fire: "Firefighter Corgi 🚒",
    sticker_chef: "Chef Corgi 👨‍🍳",
    sticker_doctor: "Doctor Corgi 🩺",
    sticker_astronaut: "Astronaut Corgi 🚀",
    sticker_explorer: "Explorer Corgi 🤠",
    sticker_scenes_count: "{completed}/{total} Scenes",
    hear_english: "Hear English",
    show_hint: "Show Hint",
  },
  th: {
    app_title: "ตามหาคอร์กี้ - เรียนรู้ 1000 คำศัพท์ อังกฤษ-ไทย 🐾",
    auth_title: "ตามหาคอร์กี้!",
    auth_subtitle: "เรียนรู้คำศัพท์ภาษาอังกฤษและภาษาไทย!",
    btn_login_google: "เข้าสู่ระบบด้วย Google",
    auth_or: "หรือ",
    btn_login_guest: "เล่นแบบผู้เยี่ยมชม 🐾",
    home_subtitle: "เกมเรียนรู้คำศัพท์ 1,000 คำ อังกฤษ-ไทย",
    btn_logout: "ออกจากระบบ",
    btn_admin_dashboard: "แดชบอร์ดผู้ดูแล",
    btn_adjust_pins: "ปรับตำแหน่งหมุด",
    btn_chat: "แชท",
    btn_stickers: "สมุดสติกเกอร์",
    btn_parents_only: "สำหรับผู้ปกครอง",
    section_select_scene: "เลือกฉากเพื่อสำรวจ 🗺️",
    btn_explore: "สำรวจ 🐾",
    scene_words_count: "{count}/{total} คำ",
    corgi_badge_found: "🐕 พบแล้ว!",
    corgi_badge_hidden: "🐾 ซ่อนอยู่",
    scene_complete: "⭐ สำเร็จ!",
    btn_home: "หน้าแรก",
    btn_words: "คำศัพท์",
    btn_quiz_locked: "🔒 แบบทดสอบ",
    scene_progress: "ความคืบหน้าของฉาก:",
    words_in_scene: "คำศัพท์ในฉากนี้",
    quiz_locked_default: "🔒 ปลดล็อกแบบทดสอบคอร์กี้",
    quiz_tip_default: "ตามหาคอร์กี้และคำศัพท์ 5 คำเพื่อปลดล็อก!",
    viewport_hint: "💡 ลากเพื่อเลื่อน · เลื่อนล้อเพื่อซูม · คลิกวัตถุเพื่อเรียนรู้!",
    chat_title: "🤖 แชทกับ AI",
    chat_greeting: "สวัสดี! ฉันคือผู้ช่วยการเรียนรู้ของคุณ ถามอะไรก็ได้เกี่ยวกับภาษาอังกฤษ ภาษาไทย หรือเกมนี้!",
    chat_placeholder: "พิมพ์ข้อความของคุณ...",
    chat_send: "ส่ง",
    chat_thinking: "กำลังคิด...",
    chat_error_processing: "ขออภัย เกิดปัญหาในการประมวลผล",
    chat_error_network: "เกิดข้อผิดพลาดเครือข่าย กรุณาลองใหม่ภายหลัง",
    listen: "ฟังเสียง",
    great_ok: "เยี่ยม! 👍",
    corgi_found_title: "คุณพบคอร์กี้แล้ว!",
    corgi_found_subtitle: "บ๊อก! เห่า! 🎉 นักสืบตัวจริง!",
    corgi_found_desc: "ตอนนี้คุณสามารถปลดล็อก <strong>แบบทดสอบคอร์กี้</strong> ได้เมื่อพบคำศัพท์ 5 คำในฉากนี้!",
    yay: "เย้! 🐾",
    quiz_question_of: "คำถามที่",
    quiz_stars: "⭐ ตอบถูก {count} ข้อ",
    quiz_stars_suffix: "ข้อที่ถูก",
    quiz_default_prompt: "แตะภาพที่ตรงกัน!",
    quiz_prompt_listen: "แตะภาพที่ตรงกับเสียง:",
    quiz_prompt_what_is: 'คำว่า "{word}" ภาษาอังกฤษคืออะไร?',
    quiz_prompt_corgi_says: '🐾 คอร์กี้ถามว่า: "{word} อยู่ที่ไหน?"',
    quiz_feedback_correct: "เยี่ยมมาก! 🎉",
    quiz_feedback_incorrect: "โอ๊ะ! ดูคำตอบที่ถูกต้องด้านบน",
    result_passed_title: "คุณผ่านแล้ว!",
    result_failed_title: "พยายามได้ดี!",
    result_score_label: "คะแนน",
    result_passed_msg: "ยอดเยี่ยม! ตอบถูก {correct}/{total} — สำรวจต่อไปนะ!",
    result_failed_msg: "คุณได้ {correct}/{total} ฝึกคำศัพท์เพิ่มอีกนิดแล้วลองใหม่นะ!",
    sticker_unlocked: "🏆 ปลดล็อกสติกเกอร์ใหม่:",
    btn_try_again: "ลองอีกครั้ง 🔄",
    btn_keep_exploring: "สำรวจต่อ 🗺️",
    btn_sticker_book: "สมุดสติกเกอร์ 🏆",
    sticker_book_title: "สมุดสติกเกอร์ของคุณ 🏆",
    sticker_book_subtitle: "ทำแบบทดสอบให้ครบเพื่อรับตราคอร์กี้!",
    parent_gate_title: "ยืนยันตัวตนผู้ปกครอง 🔒",
    parent_gate_desc: "พิมพ์ตัวเลขที่แสดงด้านล่าง (เป็นตัวเลข) เพื่อดำเนินการต่อ:",
    parent_gate_placeholder: "เช่น 3402",
    parent_gate_go: "ไป →",
    parent_gate_error: "โอ๊ะ! ไม่ถูกต้อง ลองอีกครั้ง",
    parent_dashboard_title: "แดชบอร์ดผู้ปกครอง 📊",
    progress_summary: "สรุปความคืบหน้า",
    overall_words: "คำศัพท์ที่ค้นพบทั้งหมด:",
    scenes_cleared: "ฉากที่ผ่านครบสมบูรณ์:",
    quiz_completed: "ทำแบบทดสอบแล้ว:",
    stickers_earned: "สติกเกอร์ที่ได้รับ:",
    words_to_review: "คำศัพท์ที่ควรทบทวน",
    review_desc: "คำที่ตอบผิดในแบบทดสอบ — ควรฝึกเพิ่ม!",
    no_review_words: "ยังไม่มีคำศัพท์ที่ต้องทบทวน! ทำได้ดีมาก",
    image_manager: "⚙️ จัดการรูปภาพ",
    calibrate_pins: "🎯 ปรับตำแหน่งหมุด",
    btn_reset_progress: "รีเซ็ตความคืบหน้า",
    btn_close: "ปิด",
    reset_confirm_title: "⚠️ รีเซ็ตความคืบหน้าทั้งหมด?",
    reset_confirm_desc: "การทำเช่นนี้จะลบคำศัพท์ที่ค้นพบ ประวัติแบบทดสอบ และสติกเกอร์ที่ได้รับทั้งหมดในทุกฉาก ไม่สามารถย้อนกลับได้!",
    btn_cancel: "ยกเลิก",
    btn_yes_reset: "ใช่ รีเซ็ต",
    quiz_tip_ready: "พร้อมแล้ว! ทำแบบทดสอบเลย 🎉",
    quiz_tip_need_words: "ตามหาคอร์กี้และอีก {n} คำ!",
    quiz_tip_find_corgi: "ใกล้แล้ว — ตามหาคอร์กี้!",
    quiz_tip_find_more: "ค้นหาอีก {n} คำเพื่อปลดล็อก!",
    quiz_btn_ready: "🏁 เริ่มแบบทดสอบคอร์กี้!",
    quiz_btn_ready_mobile: "🏁 ทดสอบ!",
    quiz_btn_locked: "🔒 ปลดล็อกแบบทดสอบคอร์กี้",
    quiz_btn_find_corgi: "🔒 ตามหาคอร์กี้ที่ซ่อนอยู่",
    quiz_btn_find_more: "🔒 หาอีก {n} คำ",
    welcome_message: "ยินดีต้อนรับ, {name}! 🐾",
    lang_label: "ภาษา",
    sticker_police: "คอร์กี้ตำรวจ 👮",
    sticker_fire: "คอร์กี้นักดับเพลิง 🚒",
    sticker_chef: "คอร์กี้เชฟ 👨‍🍳",
    sticker_doctor: "คอร์กี้หมอ 🩺",
    sticker_astronaut: "คอร์กี้นักบินอวกาศ 🚀",
    sticker_explorer: "คอร์กี้นักสำรวจ 🤠",
    sticker_scenes_count: "{completed}/{total} ฉาก",
    hear_english: "ฟังเสียงภาษาอังกฤษ",
    show_hint: "แสดงคำใบ้",
  }
};

let currentLang = null;
const listeners = [];

function detectDefaultLang() {
  try {
    const nav = (navigator.language || "en").toLowerCase();
    if (nav.startsWith("th")) return "th";
  } catch (e) { /* ignore */ }
  return "en";
}

function getLang() {
  if (currentLang) return currentLang;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "th") {
      currentLang = saved;
      return currentLang;
    }
  } catch (e) { /* ignore */ }
  currentLang = detectDefaultLang();
  return currentLang;
}

function setLang(lang) {
  if (lang !== "en" && lang !== "th") return;
  currentLang = lang;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  document.documentElement.lang = lang;
  applyStaticTranslations();
  document.querySelectorAll(".lang-select").forEach(select => { select.value = lang; });
  listeners.forEach(cb => { try { cb(lang); } catch (e) { console.error(e); } });
}

function t(key, vars) {
  const lang = getLang();
  let str = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
  if (vars) {
    Object.keys(vars).forEach(k => {
      str = str.replaceAll(`{${k}}`, vars[k]);
    });
  }
  return str;
}

function onLangChange(callback) {
  listeners.push(callback);
}

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    el.innerHTML = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    el.setAttribute("title", t(key));
  });
  const titleTag = document.querySelector("title[data-i18n]");
  if (titleTag) document.title = t(titleTag.getAttribute("data-i18n"));
}

function initLangSelector() {
  document.documentElement.lang = getLang();
  document.querySelectorAll(".lang-select").forEach(select => {
    select.value = getLang();
    select.addEventListener("change", () => setLang(select.value));
  });
  applyStaticTranslations();
}

export { t, getLang, setLang, onLangChange, applyStaticTranslations, initLangSelector };
