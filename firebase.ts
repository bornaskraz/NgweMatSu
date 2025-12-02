import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { 
  getFirestore, 
  enableIndexedDbPersistence
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVTTfur5Mwx1NeEjPBG72AcTtmzQ9sKEo",
  authDomain: "ngwe-mat-su.firebaseapp.com",
  projectId: "ngwe-mat-su",
  storageBucket: "ngwe-mat-su.firebasestorage.app",
  messagingSenderId: "797196313318",
  appId: "1:797196313318:web:c7dcadbb17ec78d297d127",
  measurementId: "G-13Y9LSFNPM"
};

// Initialize Firebase using compat
const app = firebase.initializeApp(firebaseConfig);

// Export compat Auth for use in App.tsx (onAuthStateChanged) and internal methods
export const auth = firebase.auth();

// Export modular Firestore for use in transactionService.ts
export const db = getFirestore(app);

export const googleProvider = new firebase.auth.GoogleAuthProvider();

// Enable offline persistence
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a a time.');
    } else if (err.code == 'unimplemented') {
      console.warn('The current browser does not support all of the features required to enable persistence');
    }
  });
} catch (e) {
  // Ignore errors in non-browser environments during build
}

export const signIn = async () => {
  try {
    // Compat sign in
    await auth.signInWithPopup(googleProvider);
  } catch (error) {
    console.error("Error signing in", error);
    throw error;
  }
};

export const logout = async () => {
  // Compat sign out
  await auth.signOut();
};