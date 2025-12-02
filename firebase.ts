import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager
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

// Initialize Firebase using compat for Auth (legacy support for simple usage)
const app = firebase.initializeApp(firebaseConfig);

// Export compat Auth for use in App.tsx (onAuthStateChanged)
export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

// Initialize Firestore with modern persistence settings
// This replaces the deprecated enableIndexedDbPersistence
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

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