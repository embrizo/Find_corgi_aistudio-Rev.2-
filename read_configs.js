import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDF92fpEUTaCY2MYRj-23DNQ3hiF3ZhOQQ",
  authDomain: "find-corgi.firebaseapp.com",
  projectId: "find-corgi",
  storageBucket: "find-corgi.firebasestorage.app",
  messagingSenderId: "931296813432",
  appId: "1:931296813432:web:36076504687ae48338a88d"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  const snap = await getDocs(collection(db, 'configs'));
  snap.forEach(d => {
    const data = d.data();
    console.log(`Config for ${d.id}:`, data.image ? data.image.substring(0, 100) + '...' : 'No image');
  });
  process.exit(0);
}
run();
