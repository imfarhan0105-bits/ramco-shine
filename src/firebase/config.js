import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ramco-shine.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ramco-shine",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ramco-shine.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "630229796934",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:630229796934:web:4eacb26f73e7c911046247",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-11VZPX8E3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Check if Firebase is actually configured
export const isDbConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY" && firebaseConfig.apiKey !== "";

export default app;
