const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regex = /  async function handleUserLogin\(user\) \{[\s\S]*?    \} else \{\n      if \(authScreen\) authScreen.style.display = 'flex';/m;

const replacement = `
  async function handleUserLogin(user) {
    const authScreen = document.getElementById('auth-screen');
    const homeScreen = document.getElementById('home-screen');
    const gameScreen = document.getElementById('game-screen');
    
    if (authScreen) authScreen.style.display = 'none';
    
    const welcomeEl = document.getElementById('user-welcome');
    if (welcomeEl) {
      welcomeEl.textContent = \`Welcome, \${user.isAnonymous ? 'Guest' : (user.displayName || 'Explorer')}! 🐾\`;
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
      if (authScreen) authScreen.style.display = 'flex';`;

code = code.replace(regex, replacement);

fs.writeFileSync('app.js', code);
