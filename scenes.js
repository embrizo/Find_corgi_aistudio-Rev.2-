/* ==========================================================================
   Scene Dataset Configurations for "Find the Corgi" Web App
   Add, remove, or modify scenes here. Changes apply automatically to game & calibrator.
   ========================================================================== */

const STREET_SCENE = {
  id: "street",
  nameEn: "The Street",
  nameTh: "ถนน",
  image: "assets/street_scene.png",
  desc: "Explore a busy city street! Find vehicles, shops, and the hidden Corgi.",
  corgi: { x: 44.5, y: 33.8, radius: 5 },
  vocabulary: [
    { id: "fire_engine",   wordEn: "fire engine",   wordTh: "รถดับเพลิง",       phonetic: "/ˈfaɪər ˌen.dʒɪn/",   x: 25.87, y: 73.67, emoji: "🚒" },
    { id: "policeman",     wordEn: "policeman",     wordTh: "ตำรวจ",             phonetic: "/pəˈliːs.mən/",        x: 72.13, y: 58.07, emoji: "👮" },
    { id: "taxi",          wordEn: "taxi",           wordTh: "รถแท็กซี่",        phonetic: "/ˈtæk.si/",            x: 62.4, y: 79.4, emoji: "🚕" },
    { id: "traffic_light", wordEn: "traffic lights", wordTh: "สัญญาณไฟจราจร",  phonetic: "/ˈtræf.ɪk ˌlaɪts/",   x: 52.67, y: 51, emoji: "🚦" },
    { id: "crossing",      wordEn: "crossing",       wordTh: "ทางม้าลาย",        phonetic: "/ˈkrɒs.ɪŋ/",          x: 62.67, y: 66.73, emoji: "🚏" },
    { id: "cinema",        wordEn: "cinema",         wordTh: "โรงภาพยนตร์",      phonetic: "/ˈsɪn.ə.mə/",         x: 55.87, y: 35.27, emoji: "🎬" },
    { id: "house",         wordEn: "house",          wordTh: "บ้าน",             phonetic: "/haʊs/",               x: 30.13, y: 41, emoji: "🏠" },
    { id: "lorry",         wordEn: "lorry",          wordTh: "รถบรรทุก",         phonetic: "/ˈlɒr.i/",            x: 92.8, y: 67.67, emoji: "🚚" },
    { id: "motorbike",     wordEn: "motorbike",      wordTh: "รถจักรยานยนต์",   phonetic: "/ˈməʊ.tə.baɪk/",      x: 90.8, y: 76.5, emoji: "🏍️" },
    { id: "woman",         wordEn: "woman",          wordTh: "ผู้หญิง",          phonetic: "/ˈwʊm.ən/",           x: 68.6, y: 86.8, emoji: "👩" },
    { id: "lamp_post",     wordEn: "lamp post",      wordTh: "เสาไฟฟ้า",         phonetic: "/ˈlæmp ˌpəʊst/",      x: 84, y: 88, emoji: "💡" },
    { id: "market",        wordEn: "market",         wordTh: "ตลาด",             phonetic: "/ˈmɑː.kɪt/",          x: 84.27, y: 37.67, emoji: "🏪" },
    { id: "drill",         wordEn: "drill",          wordTh: "เครื่องเจาะ",      phonetic: "/drɪl/",              x: 39.73, y: 92.73, emoji: "⚙️" },
    { id: "school",        wordEn: "school",         wordTh: "โรงเรียน",         phonetic: "/skuːl/",             x: 14.61, y: 21.31, emoji: "🏫" },
    { id: "pipes",         wordEn: "pipes",          wordTh: "ท่อ",             phonetic: "/paɪps/",             x: 69.87, y: 95.8, emoji: "🧱" }
  ]
};

const FARM_SCENE = {
  id: "farm",
  nameEn: "The Farm",
  nameTh: "ฟาร์ม",
  image: "assets/farm_scene.png",
  desc: "Explore a sunny farmyard! Spot friendly animals, fields, and a tractor.",
  corgi: { x: 93.07, y: 72.6, radius: 5 },
  vocabulary: [
    { id: "tractor",    wordEn: "tractor",    wordTh: "รถแทรกเตอร์",   phonetic: "/ˈtræk.tər/",      x: 40.8, y: 49.93, emoji: "🚜" },
    { id: "cow",        wordEn: "cow",        wordTh: "วัว",          phonetic: "/kaʊ/",            x: 11.6, y: 41.4, emoji: "🐄" },
    { id: "horse",      wordEn: "horse",      wordTh: "ม้า",          phonetic: "/hɔːs/",           x: 13.47, y: 65.8, emoji: "🐎" },
    { id: "sheep",      wordEn: "sheep",      wordTh: "แกะ",          phonetic: "/ʃiːp/",           x: 31.33, y: 91.4, emoji: "🐑" },
    { id: "pig",        wordEn: "pig",        wordTh: "หมู",          phonetic: "/pɪɡ/",            x: 63.6, y: 85.67, emoji: "🐖" },
    { id: "barn",       wordEn: "barn",       wordTh: "ยุ้งฉาง",       phonetic: "/bɑːn/",           x: 85.33, y: 47, emoji: "🛖" },
    { id: "chicken",    wordEn: "chicken",    wordTh: "ไก่",          phonetic: "/ˈtʃɪk.ɪn/",       x: 75.6, y: 69.93, emoji: "🐓" },
    { id: "scarecrow",  wordEn: "scarecrow",  wordTh: "หุ่นไล่กา",     phonetic: "/ˈsker.kroʊ/",     x: 51.73, y: 36.2, emoji: "🌾" },
    { id: "hay",        wordEn: "hay",        wordTh: "กองฟาง",       phonetic: "/heɪ/",            x: 94.67, y: 63.67, emoji: "🌾" },
    { id: "farmer",     wordEn: "farmer",     wordTh: "ชาวนา",        phonetic: "/ˈfɑːr.mər/",      x: 33.47, y: 39.67, emoji: "👨‍🌾" },
    { id: "gate",       wordEn: "gate",       wordTh: "ประตูรั้ว",      phonetic: "/ɡeɪt/",           x: 44.8, y: 64.07, emoji: "🚪" },
    { id: "duck",       wordEn: "duck",       wordTh: "เป็ด",          phonetic: "/dʌk/",            x: 64.67, y: 35.4, emoji: "🦆" }
  ]
};

const BEACH_SCENE = {
  id: "beach",
  nameEn: "The Beach",
  nameTh: "ชายหาด",
  image: "assets/beach_scene.png",
  desc: "Spend a warm day at the beach! Find sea creatures, sandcastles, and boats.",
  corgi: { x: 81.33, y: 67.4, radius: 5 },
  vocabulary: [
    { id: "sandcastle", wordEn: "sandcastle", wordTh: "ปราสาททราย", phonetic: "/ˈsændˌkæs.əl/", x: 41.33, y: 59.13, emoji: "🏰" },
    { id: "crab", wordEn: "crab", wordTh: "ปู", phonetic: "/kræb/", x: 80, y: 83.67, emoji: "🦀" },
    { id: "coconut_tree", wordEn: "coconut tree", wordTh: "ต้นมะพร้าว", phonetic: "/ˈkoʊ.kə.nʌt triː/", x: 93.2, y: 33.93, emoji: "🌴" },
    { id: "shell", wordEn: "shell", wordTh: "เปลือกหอย", phonetic: "/ʃel/", x: 18.27, y: 78.87, emoji: "🐚" },
    { id: "boat", wordEn: "boat", wordTh: "เรือ", phonetic: "/boʊt/", x: 20.4, y: 47, emoji: "⛵" },
    { id: "umbrella", wordEn: "umbrella", wordTh: "ร่มชายหาด", phonetic: "/ʌmˈbrel.ə/", x: 79.73, y: 53.27, emoji: "⛱️" },
    { id: "starfish", wordEn: "starfish", wordTh: "ปลาดาว", phonetic: "/ˈstɑːr.fɪʃ/", x: 26.8, y: 89.8, emoji: "⭐" },
    { id: "sunscreen", wordEn: "sunscreen", wordTh: "ครีมกันแดด", phonetic: "/ˈsʌn.skriːn/", x: 67.73, y: 72.07, emoji: "🧴" },
    { id: "seagull", wordEn: "seagull", wordTh: "นกนางนวล", phonetic: "/ˈsiː.ɡʌl/", x: 62.53, y: 16.6, emoji: "🐦" },
    { id: "spade", wordEn: "spade", wordTh: "พลั่วตักทราย", phonetic: "/speɪd/", x: 39.47, y: 78.73, emoji: "🥄" },
    { id: "bucket", wordEn: "bucket", wordTh: "ถังน้ำ", phonetic: "/ˈbʌk.ɪt/", x: 27.6, y: 77.67, emoji: "🪣" },
    { id: "wave", wordEn: "wave", wordTh: "คลื่น", phonetic: "/weɪv/", x: 30.67, y: 48.6, emoji: "🌊" }
  ]
};

const KITCHEN_SCENE = {
  id: "kitchen",
  nameEn: "The Kitchen",
  nameTh: "ห้องครัว",
  image: "assets/kitchen_scene.png",
  desc: "Step inside the busy kitchen! Look for appliances, cooking pots, and tasty bread.",
  corgi: { x: 56.93, y: 61.53, radius: 5 },
  vocabulary: [
    { id: "refrigerator", wordEn: "refrigerator", wordTh: "ตู้เย็น", phonetic: "/rɪˈfrɪdʒ.ə.reɪ.tər/", x: 11.07, y: 45.53, emoji: "🧊" },
    { id: "stove", wordEn: "stove", wordTh: "เตาไฟ", phonetic: "/stoʊv/", x: 76.8, y: 68.87, emoji: "🍳" },
    { id: "toaster", wordEn: "toaster", wordTh: "เครื่องปิ้งขนมปัง", phonetic: "/ˈtoʊ.tər/", x: 59.33, y: 35, emoji: "🍞" },
    { id: "kettle", wordEn: "kettle", wordTh: "กาต้มน้ำ", phonetic: "/ˈket.əl/", x: 33.07, y: 70.87, emoji: "🫖" },
    { id: "pan", wordEn: "pan", wordTh: "กระทะ", phonetic: "/pæn/", x: 74.67, y: 29, emoji: "🍳" },
    { id: "cup", wordEn: "cup", wordTh: "ถ้วย", phonetic: "/kʌp/", x: 50.67, y: 67.8, emoji: "☕" },
    { id: "plate", wordEn: "plate", wordTh: "จาน", phonetic: "/pleɪt/", x: 59.2, y: 82.2, emoji: "🍽️" },
    { id: "spoon", wordEn: "spoon", wordTh: "ช้อน", phonetic: "/spuːn/", x: 48.27, y: 80.2, emoji: "🥄" },
    { id: "fork", wordEn: "fork", wordTh: "ส้อม", phonetic: "/fɔːrk/", x: 43.47, y: 82.87, emoji: "🍴" },
    { id: "knife", wordEn: "knife", wordTh: "มีด", phonetic: "/naɪf/", x: 68.67, y: 80.73, emoji: "🔪" },
    { id: "sink", wordEn: "sink", wordTh: "อ่างล้างจาน", phonetic: "/sɪŋ/", x: 77.2, y: 43.13, emoji: "🚰" },
    { id: "bread", wordEn: "bread", wordTh: "ขนมปัง", phonetic: "/bred/", x: 65.33, y: 74.73, emoji: "🍞" }
  ]
};

const CLASSROOM_SCENE = {
  id: "classroom",
  nameEn: "The Classroom",
  nameTh: "ห้องเรียน",
  image: "assets/classroom_scene.png",
  desc: "Time for school! Discover books, pencils, learning globes, and classroom desks.",
  corgi: { x: 47.73, y: 74.2, radius: 5 },
  vocabulary: [
    { id: "blackboard",  wordEn: "blackboard",  wordTh: "กระดานดำ",      phonetic: "/ˈblæk.bɔːrd/",    x: 25.73, y: 20.2, emoji: "📋" },
    { id: "desk",        wordEn: "desk",        wordTh: "โต๊ะเรียน",      phonetic: "/desk/",           x: 74.8, y: 58.33, emoji: "🪑" },
    { id: "book",        wordEn: "book",        wordTh: "หนังสือ",       phonetic: "/bʊk/",            x: 45.47, y: 85.53, emoji: "📖" },
    { id: "pencil",      wordEn: "pencil",      wordTh: "ดินสอ",         phonetic: "/ˈpen.səl/",       x: 57.6, y: 85, emoji: "✏️" },
    { id: "ruler",       wordEn: "ruler",       wordTh: "ไม้บรรทัด",      phonetic: "/ˈruː.lər/",       x: 74.4, y: 79, emoji: "📐" },
    { id: "eraser",      wordEn: "eraser",      wordTh: "ยางลบ",         phonetic: "/ɪˈreɪ.sər/",      x: 51.47, y: 90.07, emoji: "🧼" },
    { id: "backpack",    wordEn: "backpack",    wordTh: "กระเป๋าเป้",     phonetic: "/ˈbæk.pæk/",       x: 21.73, y: 84.2, emoji: "🎒" },
    { id: "teacher",     wordEn: "teacher",     wordTh: "คุณครู",        phonetic: "/ˈtiː.tʃər/",      x: 45.2, y: 29, emoji: "👩‍🏫" },
    { id: "clock",       wordEn: "clock",       wordTh: "นาฬิกา",        phonetic: "/klɑːk/",          x: 28, y: 38.47, emoji: "⏰" },
    { id: "globe",       wordEn: "globe",       wordTh: "ลูกโลก",        phonetic: "/ɡloʊb/",          x: 12.53, y: 32.6, emoji: "🌐" },
    { id: "scissors",    wordEn: "scissors",    wordTh: "กรรไกร",        phonetic: "/ˈsɪz.ərz/",       x: 81.47, y: 96.07, emoji: "✂️" },
    { id: "computer",    wordEn: "computer",    wordTh: "คอมพิวเตอร์",    phonetic: "/kəmˈpjuː.t̬ər/",   x: 88.13, y: 31.4, emoji: "💻" }
  ]
};

const PARK_SCENE = {
  id: "park",
  nameEn: "The Park",
  nameTh: "สวนสาธารณะ",
  image: "assets/park_scene.png",
  desc: "Have fun outdoors in the park! Spot slides, swings, flying kites, and trees.",
  corgi: { x: 48.93, y: 90.87, radius: 5 },
  vocabulary: [
    { id: "slide",      wordEn: "slide",      wordTh: "กระดานลื่น",     phonetic: "/slaɪd/",          x: 14.53, y: 44.73, emoji: "🛝" },
    { id: "swing",      wordEn: "swing",      wordTh: "ชิงช้า",         phonetic: "/swɪŋ/",           x: 32.67, y: 29.13, emoji: "🎠" },
    { id: "bench",      wordEn: "bench",      wordTh: "ม้านั่ง",        phonetic: "/bentʃ/",          x: 20.53, y: 74.07, emoji: "🪑" },
    { id: "fountain",   wordEn: "fountain",   wordTh: "น้ำพุ",         phonetic: "/ˈfaʊn.tɪn/",      x: 37.33, y: 82.87, emoji: "⛲" },
    { id: "tree",       wordEn: "tree",       wordTh: "ต้นไม้",        phonetic: "/triː/",           x: 48.27, y: 34.07, emoji: "🌳" },
    { id: "flower",     wordEn: "flower",     wordTh: "ดอกไม้",        phonetic: "/ˈflaʊ.ər/",       x: 72.67, y: 91.27, emoji: "🌸" },
    { id: "butterfly",  wordEn: "butterfly",  wordTh: "ผีเสื้อ",        phonetic: "/ˈbʌt.ər.flaɪ/",   x: 57.47, y: 82.73, emoji: "🦋" },
    { id: "bicycle",    wordEn: "bicycle",    wordTh: "จักรยาน",       phonetic: "/ˈbaɪ.sɪ.kəl/",    x: 63.87, y: 68.47, emoji: "🚲" },
    { id: "dog",        wordEn: "dog",        wordTh: "สุนัข",         phonetic: "/dɔːɡ/",           x: 74.27, y: 76.87, emoji: "🐕" },
    { id: "pond",       wordEn: "pond",       wordTh: "บ่อน้ำ",        phonetic: "/pɑːnd/",          x: 82.67, y: 61, emoji: "🌊" },
    { id: "balloon",    wordEn: "balloon",    wordTh: "ลูกโป่ง",       phonetic: "/bəˈluːn/",         x: 91.47, y: 55.67, emoji: "🎈" },
    { id: "kite",       wordEn: "kite",       wordTh: "ว่าว",          phonetic: "/kaɪt/",           x: 78.13, y: 11.53, emoji: "🪁" }
  ]
};

const THEME_PARK_SCENE = {
  id: "theme_park",
  nameEn: "Theme Park",
  nameTh: "สวนสนุก",
  image: "assets/theme_park_scene.png",
  desc: "Have a thrilling day at the amusement park! Spot roller coasters, rides, and treats.",
  corgi: { x: 38, y: 49.27, radius: 5 },
  vocabulary: [
    { id: "roller_coaster", wordEn: "roller coaster", wordTh: "รถไฟเหาะ",     phonetic: "/ˈroʊ.lər ˌkoʊ.stər/", x: 19.6, y: 30.73, emoji: "🎢" },
    { id: "ferris_wheel",    wordEn: "ferris wheel",   wordTh: "ชิงช้าสวรรค์",  phonetic: "/ˈfer.ɪs ˌwiːl/",     x: 33.2, y: 21, emoji: "🎡" },
    { id: "carousel",        wordEn: "carousel",       wordTh: "ม้าหมุน",       phonetic: "/ˌkær.əˈsel/",       x: 81.6, y: 44.07, emoji: "🎠" },
    { id: "castle",          wordEn: "castle",         wordTh: "ปราสาท",       phonetic: "/ˈkæs.əl/",          x: 76.8, y: 27.53, emoji: "🏰" },
    { id: "popcorn",         wordEn: "popcorn",        wordTh: "ป๊อปคอร์น",     phonetic: "/ˈpɑːp.kɔːrn/",      x: 71.07, y: 71.13, emoji: "🍿" },
    { id: "cotton_candy",    wordEn: "cotton candy",   wordTh: "สายไหม",       phonetic: "/ˌkɑː.t̬ən ˈkæn.di/", x: 88.8, y: 70.73, emoji: "🍭" },
    { id: "balloon_seller",  wordEn: "balloons",       wordTh: "ลูกโป่ง",       phonetic: "/bəˈluːnz/",         x: 47.07, y: 56.07, emoji: "🎈" },
    { id: "entrance",        wordEn: "entrance",       wordTh: "ทางเข้า",       phonetic: "/ˈen.trəns/",        x: 16.4, y: 53.53, emoji: "🚪" },
    { id: "ticket_booth",    wordEn: "ticket",         wordTh: "ตั๋ว",          phonetic: "/ˈtɪk.ɪt/",          x: 10.53, y: 62.2, emoji: "🎫" },
    { id: "clown",           wordEn: "clown",          wordTh: "ตัวตลก",       phonetic: "/klaʊn/",            x: 30.67, y: 77.8, emoji: "🤡" },
    { id: "mascot",          wordEn: "mascot",         wordTh: "มาสคอต",       phonetic: "/ˈmæs.kɑːt/",        x: 54.67, y: 81.93, emoji: "🦊" },
    { id: "ice_cream",       wordEn: "ice cream",      wordTh: "ไอศกรีม",       phonetic: "/ˈaɪs ˌkriːm/",       x: 78.4, y: 90.33, emoji: "🍦" }
  ]
};

const SUPERMARKET_SCENE = {
  id: "supermarket",
  nameEn: "Supermarket",
  nameTh: "ซูเปอร์มาร์เก็ต",
  image: "assets/supermarket_scene.png",
  desc: "Go shopping at the local supermarket! Find fresh food, shopping carts, and cashiers.",
  corgi: { x: 19.47, y: 45.93, radius: 5 },
  vocabulary: [
    { id: "shopping_cart", wordEn: "shopping cart", wordTh: "รถเข็นช้อปปิ้ง", phonetic: "/ˈʃɑː.pɪŋ ˌkɑːrt/", x: 36.93, y: 80.6, emoji: "🛒" },
    { id: "basket", wordEn: "basket", wordTh: "ตะกร้า", phonetic: "/ˈbæs.kɪt/", x: 57.73, y: 82.07, emoji: "🧺" },
    { id: "grocery_shelf", wordEn: "shelf", wordTh: "ชั้นวางของ", phonetic: "/ʃelf/", x: 71.47, y: 39, emoji: "🗄️" },
    { id: "fruits", wordEn: "fruits", wordTh: "ผลไม้", phonetic: "/fruːts/", x: 13.33, y: 27.4, emoji: "🍎" },
    { id: "vegetables", wordEn: "vegetables", wordTh: "ผัก", phonetic: "/ˈvedʒ.tə.bəlz/", x: 19.33, y: 38.2, emoji: "🥦" },
    { id: "checkout_register", wordEn: "checkout", wordTh: "เคาน์เตอร์ชำระเงิน", phonetic: "/ˈtʃek.aʊt/", x: 77.33, y: 63.93, emoji: "💳" },
    { id: "cashier", wordEn: "cashier", wordTh: "พนักงานแคชเชียร์", phonetic: "/kæˈʃɪr/", x: 91.2, y: 54.87, emoji: "🧑💼" },
    { id: "milk_bottle", wordEn: "milk", wordTh: "นม", phonetic: "/mɪlk/", x: 3.87, y: 85.67, emoji: "🥛" },
    { id: "bread", wordEn: "bread", wordTh: "ขนมปัง", phonetic: "/bred/", x: 11.2, y: 75.8, emoji: "🍞" },
    { id: "fish_counter", wordEn: "fish", wordTh: "ปลา", phonetic: "/fɪʃ/", x: 26.53, y: 54.2, emoji: "🐟" },
    { id: "eggs", wordEn: "eggs", wordTh: "ไข่", phonetic: "/eɡz/", x: 13.87, y: 58.73, emoji: "🥚" },
    { id: "shopping_bag", wordEn: "bag", wordTh: "ถุงช้อปปิ้ง", phonetic: "/bæɡ/", x: 85.6, y: 89.27, emoji: "🛍️" }
  ]
};

const HOTEL_SCENE = {
  id: "hotel",
  nameEn: "Hotel",
  nameTh: "โรงแรม",
  image: "assets/hotel_scene.png",
  desc: "Explore the cozy hotel! Spot the lobby reception desk, suitcases, and beds.",
  corgi: { x: 75.07, y: 87, radius: 5 },
  vocabulary: [
    { id: "bed", wordEn: "bed", wordTh: "เตียงนอน", phonetic: "/bed/", x: 63.47, y: 79.8, emoji: "🛏️" },
    { id: "key", wordEn: "key", wordTh: "กุญแจห้อง", phonetic: "/kiː/", x: 17.07, y: 36.2, emoji: "🔑" },
    { id: "pillow", wordEn: "pillow", wordTh: "หมอน", phonetic: "/ˈpɪl.oʊ/", x: 58.27, y: 63.13, emoji: "🛌" },
    { id: "suitcase", wordEn: "suitcase", wordTh: "กระเป๋าเดินทาง", phonetic: "/ˈsuːt.keɪs/", x: 35.07, y: 51, emoji: "🧳" },
    { id: "reception", wordEn: "reception", wordTh: "เคาน์เตอร์ต้อนรับ", phonetic: "/rɪˈsep.ʃən/", x: 22.53, y: 35.27, emoji: "🛎️" },
    { id: "elevator", wordEn: "elevator", wordTh: "ลิฟต์", phonetic: "/ˈel.ə.veɪ.tər/", x: 41.87, y: 18.6, emoji: "🛗" },
    { id: "room_service", wordEn: "room service", wordTh: "รูมเซอร์วิส", phonetic: "/ˈruːm ˌsɜːr.vɪs/", x: 87.87, y: 87, emoji: "🍽️" },
    { id: "shower", wordEn: "shower", wordTh: "ฝักบัวอาบน้ำ", phonetic: "/ˈʃaʊ.ər/", x: 8.4, y: 77.8, emoji: "🚿" },
    { id: "luggage_cart", wordEn: "luggage cart", wordTh: "รถเข็นกระเป๋า", phonetic: "/ˈlʌɡ.ɪdʒ ˌkɑːrt/", x: 27.6, y: 59.67, emoji: "🛒" },
    { id: "lobby_sofa", wordEn: "sofa", wordTh: "โซฟาล็อบบี้", phonetic: "/ˈsoʊ.fə/", x: 75.6, y: 31.93, emoji: "🛋️" },
    { id: "telephone", wordEn: "telephone", wordTh: "โทรศัพท์", phonetic: "/ˈtel.ə.foʊn/", x: 12.53, y: 37.4, emoji: "☎️" },
    { id: "hanger", wordEn: "hanger", wordTh: "ไม้แขวนเสื้อ", phonetic: "/ˈhæŋ.ər/", x: 30.8, y: 42.07, emoji: "🧥" }
  ]
};

const HOSPITAL_SCENE = {
  id: "hospital",
  nameEn: "Hospital",
  nameTh: "โรงพยาบาล",
  image: "assets/hospital_scene.png",
  desc: "Visit the busy hospital! Find doctors, nurses, wheelchairs, and ambulances.",
  corgi: { x: 48.4, y: 67.53, radius: 5 },
  vocabulary: [
    { id: "doctor", wordEn: "doctor", wordTh: "คุณหมอ", phonetic: "/ˈdɑːk.tər/", x: 78.67, y: 39.4, emoji: "👨⚕️" },
    { id: "nurse", wordEn: "nurse", wordTh: "พยาบาล", phonetic: "/nɜːrs/", x: 29.2, y: 49.8, emoji: "👩⚕️" },
    { id: "patient_bed", wordEn: "patient bed", wordTh: "เตียงผู้ป่วย", phonetic: "/ˈpeɪ.ʃənt ˌbed/", x: 94.8, y: 63.8, emoji: "🛏️" },
    { id: "stethoscope", wordEn: "stethoscope", wordTh: "หูฟังแพทย์", phonetic: "/ˈsteθ.ə.skoʊp/", x: 74, y: 47.93, emoji: "🩺" },
    { id: "wheelchair", wordEn: "wheelchair", wordTh: "รถเข็นผู้ป่วย", phonetic: "/ˈwiːl.tʃer/", x: 20.27, y: 65.53, emoji: "♿" },
    { id: "medicine", wordEn: "medicine", wordTh: "ยา", phonetic: "/ˈmed.ɪ.sən/", x: 59.47, y: 47.27, emoji: "💊" },
    { id: "syringe", wordEn: "syringe", wordTh: "เข็มฉีดยา", phonetic: "/sɪˈrɪndʒ/", x: 91.6, y: 71.93, emoji: "💉" },
    { id: "bandage", wordEn: "bandage", wordTh: "ผ้าพันแผล", phonetic: "/ˈbæn.dɪdʒ/", x: 48, y: 55.4, emoji: "🩹" },
    { id: "thermometer", wordEn: "thermometer", wordTh: "เครื่องวัดไข้", phonetic: "/θəˈmɒm.ɪ.tər/", x: 56.93, y: 51.8, emoji: "🌡️" },
    { id: "microscope", wordEn: "microscope", wordTh: "กล้องจุลทรรศน์", phonetic: "/ˈmaɪ.krə.skoʊp/", x: 51.87, y: 46.47, emoji: "🔬" },
    { id: "first_aid", wordEn: "first aid kit", wordTh: "กล่องปฐมพยาบาล", phonetic: "/ˌfɜːst ˈeɪd ˌkɪt/", x: 6.4, y: 31.27, emoji: "🧰" },
    { id: "ambulance", wordEn: "ambulance", wordTh: "รถพยาบาล", phonetic: "/ˈæm.bjə.ləns/", x: 61.33, y: 35.67, emoji: "🚑" }
  ]
};

const THEATER_SCENE = {
  id: "theater",
  nameEn: "Theater",
  nameTh: "โรงละคร",
  image: "assets/theater_scene.png",
  desc: "Enjoy a show at the grand theater! Spot stage spotlights, curtains, and actors.",
  corgi: { x: 21.24, y: 63.61, radius: 5 },
  vocabulary: [
    { id: "stage", wordEn: "stage", wordTh: "เวที", phonetic: "/steɪdʒ/", x: 58.91, y: 69.94, emoji: "🎭" },
    { id: "curtain", wordEn: "curtain", wordTh: "ม่านเวที", phonetic: "/ˈkɜː.tən/", x: 9.91, y: 35.94, emoji: "🎭" },
    { id: "seat", wordEn: "seat", wordTh: "ที่นั่งผู้ชม", phonetic: "/siːt/", x: 80.67, y: 57.27, emoji: "🪑" },
    { id: "actor", wordEn: "actor", wordTh: "นักแสดง", phonetic: "/ˈæk.tər/", x: 52.58, y: 50.11, emoji: "🧑🎤" },
    { id: "microphone", wordEn: "microphone", wordTh: "ไมโครโฟน", phonetic: "/ˈmaɪ.krə.foʊn/", x: 60.24, y: 43.28, emoji: "🎤" },
    { id: "ticket", wordEn: "ticket", wordTh: "ตั๋วเข้าชม", phonetic: "/ˈtɪk.ɪt/", x: 55.07, y: 93.67, emoji: "🎟️" },
    { id: "spotlight", wordEn: "spotlight", wordTh: "ไฟสปอตไลท์", phonetic: "/ˈspɑːt.laɪt/", x: 71.91, y: 11.28, emoji: "🔦" },
    { id: "mask", wordEn: "mask", wordTh: "หน้ากากละคร", phonetic: "/mæsk/", x: 44.08, y: 10.78, emoji: "🎭" },
    { id: "program", wordEn: "program", wordTh: "สูจิบัตร", phonetic: "/ˈproʊ.ɡræm/", x: 34.24, y: 87.28, emoji: "📖" },
    { id: "violin", wordEn: "violin", wordTh: "ไวโอลิน", phonetic: "/ˌvaɪəˈlɪn/", x: 81.33, y: 81.8, emoji: "🎻" },
    { id: "director_chair", wordEn: "director chair", wordTh: "เก้าอี้ผู้กำกับ", phonetic: "/daɪˈrek.tər ˌtʃer/", x: 65.58, y: 84.78, emoji: "🪑" },
    { id: "applause", wordEn: "applause", wordTh: "เสียงปรบมือ", phonetic: "/əˈplɑːz/", x: 86.53, y: 54.73, emoji: "👏" }
  ]
};

const AIRPLANE_SCENE = {
  id: "airplane",
  nameEn: "On the Airplane",
  nameTh: "บนเครื่องบิน",
  image: "assets/airplane_scene.png",
  desc: "Fly high in the sky! Spot seats, flight attendants, and the airplane wing.",
  corgi: { x: 59.24, y: 88.28, radius: 5 },
  vocabulary: [
    { id: "airplane", wordEn: "airplane", wordTh: "เครื่องบิน", phonetic: "/ˈer.pleɪn/", x: 19.08, y: 94.28, emoji: "✈️" },
    { id: "window_seat", wordEn: "window seat", wordTh: "ที่นั่งริมหน้าต่าง", phonetic: "/ˈwɪn.doʊ siːt/", x: 8.91, y: 54.94, emoji: "🪟" },
    { id: "pilot", wordEn: "pilot", wordTh: "นักบิน", phonetic: "/ˈpaɪ.lət/", x: 76.91, y: 50.28, emoji: "👨✈️" },
    { id: "flight_attendant", wordEn: "flight attendant", wordTh: "พนักงานต้อนรับบนเครื่องบิน", phonetic: "/ˈflaɪt əˌten.dənt/", x: 54.41, y: 36.78, emoji: "👩✈️" },
    { id: "safety_belt", wordEn: "safety belt", wordTh: "เข็มขัดนิรภัย", phonetic: "/ˈseɪf.ti belt/", x: 26.24, y: 61.28, emoji: "🪢" },
    { id: "luggage", wordEn: "luggage", wordTh: "กระเป๋าเดินทาง", phonetic: "/ˈlʌɡ.ɪdʒ/", x: 17.74, y: 16.94, emoji: "🧳" },
    { id: "seat_tray", wordEn: "seat tray", wordTh: "ถาดอาหาร", phonetic: "/siːt treɪ/", x: 54.08, y: 44.94, emoji: "🍽️" },
    { id: "passport", wordEn: "passport", wordTh: "หนังสือเดินทาง", phonetic: "/ˈpæs.pɔːrt/", x: 14.08, y: 68.61, emoji: "🛂" },
    { id: "headphone", wordEn: "headphones", wordTh: "หูฟัง", phonetic: "/ˈhed.foʊnz/", x: 23.41, y: 71.94, emoji: "🎧" },
    { id: "overhead_bin", wordEn: "overhead bin", wordTh: "ช่องเก็บของเหนือศีรษะ", phonetic: "/ˌoʊ.vərˈhed bɪn/", x: 25.08, y: 20.61, emoji: "🗄️" },
    { id: "wing", wordEn: "wing", wordTh: "ปีกเครื่องบิน", phonetic: "/wɪŋ/", x: 7.08, y: 45.11, emoji: "✈️" },
    { id: "cockpit", wordEn: "cockpit", wordTh: "ห้องนักบิน", phonetic: "/ˈkɑːk.pɪt/", x: 84.91, y: 67.61, emoji: "⚙️" }
  ]
};

const SHIP_SCENE = {
  id: "ship",
  nameEn: "The Ship",
  nameTh: "เรือเดินสมุทร",
  image: "assets/ship_scene.png",
  desc: "Sail the open seas! Look for anchors, lifebuoys, and the ship's captain.",
  corgi: { x: 80.91, y: 86.28, radius: 5 },
  vocabulary: [
    { id: "cruise_ship", wordEn: "cruise ship", wordTh: "เรือสำราญ", phonetic: "/ˈkruːz ʃɪp/", x: 43.08, y: 43.78, emoji: "🚢" },
    { id: "anchor", wordEn: "anchor", wordTh: "สมอเรือ", phonetic: "/ˈæŋ.kər/", x: 29.41, y: 87.78, emoji: "⚓" },
    { id: "deck", wordEn: "deck", wordTh: "ดาดฟ้าเรือ", phonetic: "/dek/", x: 47.41, y: 63.44, emoji: "🛳️" },
    { id: "life_jacket", wordEn: "life jacket", wordTh: "เสื้อชูชีพ", phonetic: "/ˈlaɪf ˌdʒæk.ɪt/", x: 72.08, y: 48.94, emoji: "🦺" },
    { id: "captain", wordEn: "captain", wordTh: "กัปตันเรือ", phonetic: "/ˈkæp.tɪn/", x: 73.91, y: 31.11, emoji: "👨✈️" },
    { id: "telescope", wordEn: "telescope", wordTh: "กล้องส่องทางไกล", phonetic: "/ˈtel.ə.skoʊp/", x: 75.08, y: 59.94, emoji: "🔭" },
    { id: "cabin", wordEn: "cabin", wordTh: "ห้องพักผู้โดยสาร", phonetic: "/ˈkæb.ɪn/", x: 52.91, y: 30.11, emoji: "🚪" },
    { id: "lifebuoy", wordEn: "lifebuoy", wordTh: "ห่วงยางชูชีพ", phonetic: "/ˈlaɪf.bɔɪ/", x: 58.74, y: 44.94, emoji: "🛟" },
    { id: "compass", wordEn: "compass", wordTh: "เข็มทิศ", phonetic: "/ˈkʌm.pəs/", x: 89.58, y: 60.28, emoji: "🧭" },
    { id: "wave", wordEn: "wave", wordTh: "คลื่นทะเล", phonetic: "/weɪv/", x: 8.41, y: 79.44, emoji: "🌊" },
    { id: "funnel", wordEn: "funnel", wordTh: "ปล่องไฟเรือ", phonetic: "/ˈfʌn.əl/", x: 44.91, y: 18.28, emoji: "🏭" },
    { id: "port", wordEn: "port", wordTh: "ท่าเรือ", phonetic: "/pɔːrt/", x: 5.74, y: 61.28, emoji: "⚓" }
  ]
};

const UNDERWATER_SCENE = {
  id: "underwater",
  nameEn: "Underwater",
  nameTh: "ใต้ท้องทะเล",
  image: "assets/underwater_scene.png",
  desc: "Dive deep under the sea! Discover coral reefs, turtles, and hidden treasure.",
  corgi: { x: 78.08, y: 92.61, radius: 5 },
  vocabulary: [
    { id: "fish", wordEn: "fish", wordTh: "ปลา", phonetic: "/fɪʃ/", x: 20.91, y: 9.11, emoji: "🐟" },
    { id: "coral", wordEn: "coral", wordTh: "ปะการัง", phonetic: "/ˈkɔːr.əl/", x: 41.91, y: 34.28, emoji: "🪸" },
    { id: "turtle", wordEn: "turtle", wordTh: "เต่าทะเล", phonetic: "/ˈtɜː.təl/", x: 34.24, y: 17.28, emoji: "🐢" },
    { id: "octopus", wordEn: "octopus", wordTh: "ปลาหมึกยักษ์", phonetic: "/ˈɒk.tə.pəs/", x: 11.91, y: 32.44, emoji: "🐙" },
    { id: "shark", wordEn: "shark", wordTh: "ฉลาม", phonetic: "/ʃɑːrk/", x: 69.58, y: 21.61, emoji: "🦈" },
    { id: "submarine", wordEn: "submarine", wordTh: "เรือดำน้ำ", phonetic: "/ˌsʌb.məˈriːn/", x: 27.41, y: 59.28, emoji: "🚢" },
    { id: "seaweed", wordEn: "seaweed", wordTh: "สาหร่ายทะเล", phonetic: "/ˈsiː.wiːd/", x: 79.91, y: 73.44, emoji: "🌿" },
    { id: "treasure_chest", wordEn: "treasure chest", wordTh: "หีบสมบัติ", phonetic: "/ˈtreʒ.ər tʃest/", x: 53.24, y: 78.44, emoji: "🏴‍☠️" },
    { id: "diver", wordEn: "diver", wordTh: "นักดำน้ำ", phonetic: "/ˈdaɪ.vər/", x: 69.08, y: 54.44, emoji: "🤿" },
    { id: "seashell", wordEn: "seashell", wordTh: "เปลือกหอย", phonetic: "/ˈsiː.ʃel/", x: 41.41, y: 96.28, emoji: "🐚" },
    { id: "jellyfish", wordEn: "jellyfish", wordTh: "แมงกะพรุน", phonetic: "/ˈdʒel.i.fɪʃ/", x: 90.74, y: 49.28, emoji: "🪼" },
    { id: "starfish", wordEn: "starfish", wordTh: "ปลาดาว", phonetic: "/ˈstɑː.fɪʃ/", x: 51.08, y: 91.94, emoji: "⭐" }
  ]
};

const OFFICE_SCENE = {
  id: "office",
  nameEn: "Office",
  nameTh: "ที่ทำงาน",
  image: "assets/office_scene.png",
  desc: "Explore a busy office floor! Find computers, desks, files, and chairs.",
  corgi: { x: 79.08, y: 75.78, radius: 5 },
  vocabulary: [
    { id: "desk", wordEn: "desk", wordTh: "โต๊ะทำงาน", phonetic: "/desk/", x: 8.67, y: 43, emoji: "🪑" },
    { id: "computer", wordEn: "computer", wordTh: "คอมพิวเตอร์", phonetic: "/kəmˈpjuː.t̬ər/", x: 28.91, y: 32.44, emoji: "🖥️" },
    { id: "keyboard", wordEn: "keyboard", wordTh: "คีย์บอร์ด", phonetic: "/ˈkiː.bɔːrd/", x: 28.41, y: 82.61, emoji: "⌨️" },
    { id: "mouse", wordEn: "mouse", wordTh: "เมาส์", phonetic: "/maʊs/", x: 40.41, y: 88.78, emoji: "🖱️" },
    { id: "office_chair", wordEn: "chair", wordTh: "เก้าอี้สำนักงาน", phonetic: "/tʃer/", x: 96.08, y: 65.11, emoji: "🪑" },
    { id: "filing_cabinet", wordEn: "cabinet", wordTh: "ตู้เก็บเอกสาร", phonetic: "/ˈkæb.ə.nət/", x: 58.74, y: 29.61, emoji: "🗄️" },
    { id: "printer", wordEn: "printer", wordTh: "เครื่องพิมพ์", phonetic: "/ˈprɪn.tər/", x: 70.41, y: 36.94, emoji: "🖨️" },
    { id: "calendar", wordEn: "calendar", wordTh: "ปฏิทิน", phonetic: "/ˈkæl.ən.dər/", x: 76.41, y: 20.78, emoji: "📅" },
    { id: "notebook", wordEn: "notebook", wordTh: "สมุดโน้ต", phonetic: "/ˈnoʊt.bʊk/", x: 6.24, y: 74.28, emoji: "📓" },
    { id: "coffee_mug", wordEn: "coffee mug", wordTh: "แก้วกาแฟ", phonetic: "/ˈkɑː.fi mʌɡ/", x: 26.58, y: 76.44, emoji: "☕" },
    { id: "telephone", wordEn: "telephone", wordTh: "โทรศัพท์", phonetic: "/ˈtel.ə.foʊn/", x: 55.41, y: 84.94, emoji: "☎️" },
    { id: "pen_holder", wordEn: "pen holder", wordTh: "ที่เสียบปากกา", phonetic: "/pen ˈhoʊl.dər/", x: 47.08, y: 83.11, emoji: "✏️" }
  ]
};

const CANTEEN_SCENE = {
  id: "canteen",
  nameEn: "Canteen",
  nameTh: "โรงอาหาร",
  image: "assets/canteen_scene.png",
  desc: "Visit the busy canteen! Spot food stalls, dining tables, plates, and trays.",
  corgi: { x: 81.91, y: 64.28, radius: 5 },
  vocabulary: [
    { id: "dining_table", wordEn: "dining table", wordTh: "โต๊ะอาหาร", phonetic: "/ˈdaɪ.nɪŋ ˌteɪ.bəl/", x: 12.4, y: 84.47, emoji: "🪑" },
    { id: "tray", wordEn: "tray", wordTh: "ถาดหลุม", phonetic: "/treɪ/", x: 87.24, y: 54.11, emoji: "🍽️" },
    { id: "water_dispenser", wordEn: "water dispenser", wordTh: "ตู้น้ำดื่ม", phonetic: "/ˈwɔː.tər dɪˈspen.sər/", x: 46.91, y: 28.61, emoji: "🚰" },
    { id: "food_stall", wordEn: "food stall", wordTh: "ร้านอาหาร", phonetic: "/fuːd stɔːl/", x: 72.93, y: 15.93, emoji: "🏪" },
    { id: "plate", wordEn: "plate", wordTh: "จานอาหาร", phonetic: "/pleɪt/", x: 23.91, y: 87.94, emoji: "🍽️" },
    { id: "spoon", wordEn: "spoon", wordTh: "ช้อน", phonetic: "/spuːn/", x: 30.93, y: 83.93, emoji: "🥄" },
    { id: "fork", wordEn: "fork", wordTh: "ส้อม", phonetic: "/fɔːrk/", x: 27.24, y: 84.78, emoji: "🍴" },
    { id: "juice_box", wordEn: "juice box", wordTh: "กล่องน้ำผลไม้", phonetic: "/dʒuːs bɑːks/", x: 3.41, y: 51.61, emoji: "🧃" },
    { id: "bowl", wordEn: "bowl", wordTh: "ชาม", phonetic: "/boʊl/", x: 31.41, y: 74.78, emoji: "🥣" },
    { id: "napkin", wordEn: "napkin", wordTh: "กระดาษทิชชู", phonetic: "/ˈnæp.kɪn/", x: 56.74, y: 69.44, emoji: "🧻" },
    { id: "queue_line", wordEn: "queue", wordTh: "แถวคิว", phonetic: "/kjuː/", x: 58.74, y: 53.44, emoji: "🚶" },
    { id: "trash_bin", wordEn: "trash bin", wordTh: "ถังขยะ", phonetic: "/træʃ bɪn/", x: 92.24, y: 68.94, emoji: "🗑️" }
  ]
};

const POLICE_STATION_SCENE = {
  id: "police_station",
  nameEn: "Police Station",
  nameTh: "สถานีตำรวจ",
  image: "assets/police_station_scene.png",
  desc: "Step inside the local police station! Find officers, police cars, and sirens.",
  corgi: { x: 52.41, y: 48.28, radius: 5 },
  vocabulary: [
    { id: "policeman", wordEn: "police officer", wordTh: "เจ้าหน้าที่ตำรวจ", phonetic: "/pəˈliːs ˌɑː.fɪ.sər/", x: 67.08, y: 68.11, emoji: "👮" },
    { id: "police_car", wordEn: "police car", wordTh: "รถตำรวจ", phonetic: "/pəˈliːs kɑːr/", x: 16.41, y: 38.78, emoji: "🚓" },
    { id: "badge", wordEn: "badge", wordTh: "ตราตำรวจ", phonetic: "/bædʒ/", x: 25.41, y: 81.44, emoji: "👮" },
    { id: "handcuffs", wordEn: "handcuffs", wordTh: "กุญแจมือ", phonetic: "/ˈhænd.kʌfs/", x: 65.24, y: 88.11, emoji: "⛓️" },
    { id: "jail_cell", wordEn: "jail cell", wordTh: "ห้องขัง", phonetic: "/dʒeɪl sel/", x: 66.4, y: 32.87, emoji: "🚪" },
    { id: "desk", wordEn: "desk", wordTh: "โต๊ะทำงาน", phonetic: "/desk/", x: 47.41, y: 65.94, emoji: "🪑" },
    { id: "computer", wordEn: "computer", wordTh: "คอมพิวเตอร์", phonetic: "/kəmˈpjuː.t̬ər/", x: 42.24, y: 58.44, emoji: "🖥️" },
    { id: "siren", wordEn: "siren", wordTh: "ไซเรน", phonetic: "/ˈsaɪr.ən/", x: 71.91, y: 9.61, emoji: "🚨" },
    { id: "telephone", wordEn: "telephone", wordTh: "โทรศัพท์", phonetic: "/ˈtel.ə.foʊn/", x: 37.91, y: 84.28, emoji: "☎️" },
    { id: "map", wordEn: "map", wordTh: "แผนที่เมือง", phonetic: "/mæp/", x: 16.08, y: 65.11, emoji: "🗺️" },
    { id: "walkie_talkie", wordEn: "walkie-talkie", wordTh: "วิทยุสื่อสาร", phonetic: "/ˌwɔː.kiˈtɔː.ki/", x: 37.41, y: 73.61, emoji: "📻" },
    { id: "megaphone", wordEn: "megaphone", wordTh: "โทรโข่ง", phonetic: "/ˈmeɡ.ə.foʊn/", x: 91.58, y: 32.94, emoji: "📢" }
  ]
};

const AIRPORT_SCENE = {
  id: "airport",
  nameEn: "Airport",
  nameTh: "สนามบิน",
  image: "assets/airport_scene.png",
  desc: "Explore a busy airport terminal! Find airplanes, luggage, and control towers.",
  corgi: { x: 86.74, y: 56.61, radius: 5 },
  vocabulary: [
    { id: "airplane", wordEn: "airplane", wordTh: "เครื่องบิน", phonetic: "/ˈer.pleɪn/", x: 20.58, y: 31.78, emoji: "✈️" },
    { id: "luggage", wordEn: "luggage", wordTh: "กระเป๋าเดินทาง", phonetic: "/ˈlʌɡ.ɪdʒ/", x: 64.91, y: 72.44, emoji: "🧳" },
    { id: "control_tower", wordEn: "control tower", wordTh: "หอบังคับการบิน", phonetic: "/kənˈtroʊl ˌtaʊ.ər/", x: 70.24, y: 21.44, emoji: "🏢" },
    { id: "runway", wordEn: "runway", wordTh: "รันเวย์", phonetic: "/ˈrʌn.weɪ/", x: 21.74, y: 17.11, emoji: "🛫" },
    { id: "security_scanner", wordEn: "security scanner", wordTh: "เครื่องสแกนความปลอดภัย", phonetic: "/səˈkjʊr.ə.ti ˈskæn.ər/", x: 33.41, y: 62.44, emoji: "🔍" },
    { id: "boarding_pass", wordEn: "boarding pass", wordTh: "บัตรผ่านขึ้นเครื่อง", phonetic: "/ˈbɔːr.dɪŋ pæs/", x: 47.24, y: 98.11, emoji: "🎫" },
    { id: "passport", wordEn: "passport", wordTh: "หนังสือเดินทาง", phonetic: "/ˈpæs.pɔːrt/", x: 41.58, y: 94.28, emoji: "🛂" },
    { id: "luggage_carousel", wordEn: "luggage carousel", wordTh: "สายพานรับกระเป๋า", phonetic: "/ˈlʌɡ.ɪdʒ ˌkær.əˈsel/", x: 70.24, y: 84.78, emoji: "🧳" },
    { id: "flight_board", wordEn: "flight board", wordTh: "ตารางเที่ยวบิน", phonetic: "/flaɪt bɔːrd/", x: 50.91, y: 50.61, emoji: "📋" },
    { id: "tarmac_bus", wordEn: "tarmac bus", wordTh: "รถบัสรันเวย์", phonetic: "/ˈtɑːr.mæk bʌs/", x: 46.41, y: 38.44, emoji: "🚌" }
  ]
};

const ALL_SCENES = [
  STREET_SCENE, 
  FARM_SCENE, 
  BEACH_SCENE, 
  KITCHEN_SCENE, 
  CLASSROOM_SCENE, 
  PARK_SCENE, 
  THEME_PARK_SCENE, 
  SUPERMARKET_SCENE,
  HOTEL_SCENE,
  HOSPITAL_SCENE,
  THEATER_SCENE,
  AIRPLANE_SCENE,
  SHIP_SCENE,
  UNDERWATER_SCENE,
  OFFICE_SCENE,
  CANTEEN_SCENE,
  POLICE_STATION_SCENE,
  AIRPORT_SCENE
];

export { ALL_SCENES };
window.ALL_SCENES = ALL_SCENES; // backwards compatibility
