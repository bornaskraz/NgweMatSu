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

// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "mock-key",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "mock-app.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "mock-app",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "mock-app.appspot.com",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
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