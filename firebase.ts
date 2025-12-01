import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  getFirestore, 
  enableIndexedDbPersistence, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  orderBy,
  Timestamp,
  updateDoc
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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

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
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Error signing in", error);
    throw error;
  }
};

export const logout = async () => {
  await firebaseSignOut(auth);
};