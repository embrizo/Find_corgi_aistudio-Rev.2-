import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInAnonymously, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQXD_OCusfdTggMf6f9ZZhIBrfNxlbnAU",
  authDomain: "hidden-capsule-n6tp2.firebaseapp.com",
  projectId: "hidden-capsule-n6tp2",
  storageBucket: "hidden-capsule-n6tp2.firebasestorage.app",
  messagingSenderId: "588331211644",
  appId: "1:588331211644:web:d5833a911e8cd2e6bf62f9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-findcorgiaistudi-0cb39447-b443-4c5b-9873-21632e3f6bb2");

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signInAsGuest = () => signInAnonymously(auth);
export const logOut = () => signOut(auth);

// We define the admin emails here or in Firestore, but for simplicity, we can check the user's email:
export const ADMIN_EMAILS = ['3mbr1z0@gmail.com'];
