import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInAnonymously, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import config from './firebase-applet-config.json';

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app, config.firestoreDatabaseId);

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signInAsGuest = () => signInAnonymously(auth);
export const logOut = () => signOut(auth);

// We define the admin emails here or in Firestore, but for simplicity, we can check the user's email:
export const ADMIN_EMAILS = ['3mbr1z0@gmail.com'];
