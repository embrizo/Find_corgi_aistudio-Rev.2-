import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signInAnonymously, signOut, onAuthStateChanged } from 'firebase/auth';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDF92fpEUTaCY2MYRj-23DNQ3hiF3ZhOQQ",
  authDomain: "find-corgi.firebaseapp.com",
  projectId: "find-corgi",
  storageBucket: "find-corgi.firebasestorage.app",
  messagingSenderId: "931296813432",
  appId: "1:931296813432:web:36076504687ae48338a88d",
  measurementId: "G-682HCDL3RP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LeW_lAtAAAAANH2ClcLyQbTnvpgKc7iLcsvIR3M'), 
  isTokenAutoRefreshEnabled: true 
});

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const signInAsGuest = () => signInAnonymously(auth);
export const logOut = () => signOut(auth);

// We define the admin emails here or in Firestore, but for simplicity, we can check the user's email:
export const ADMIN_EMAILS = ['3mbr1z0@gmail.com'];
