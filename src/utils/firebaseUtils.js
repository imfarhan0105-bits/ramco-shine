import { getDocs } from 'firebase/firestore';

/**
 * Wraps a Firestore getDocs promise with a timeout.
 * If Firebase hangs (e.g. database not created yet), it will reject after the timeout
 * instead of hanging indefinitely, allowing the app to fall back smoothly.
 */
export const getDocsWithTimeout = async (query, timeoutMs = 8000) => {
  return Promise.race([
    getDocs(query),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Firebase query timed out. Falling back to local data.')), timeoutMs)
    )
  ]);
};
