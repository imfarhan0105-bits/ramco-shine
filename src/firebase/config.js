import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ-1PGSmHqAyxDyHQpbxa4F20M6uK7680",
  authDomain: "ramcoshine.firebaseapp.com",
  projectId: "ramcoshine",
  storageBucket: "ramcoshine.firebasestorage.app",
  messagingSenderId: "914314014574",
  appId: "1:914314014574:web:0c72aea2a5632357629b7f",
  measurementId: "G-1CZTMWXW7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Check if Firebase is actually configured
export const isDbConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY" && firebaseConfig.apiKey !== "";

export default app;
