import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCzXcyyQenxV0KavUXLaQA21sx4PyjBkQg",
  authDomain: "ramco-shine.firebaseapp.com",
  projectId: "ramco-shine",
  storageBucket: "ramco-shine.firebasestorage.app",
  messagingSenderId: "630229796934",
  appId: "1:630229796934:web:4eacb26f73e7c911046247",
  measurementId: "G-11VZPX8E3Z"
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
