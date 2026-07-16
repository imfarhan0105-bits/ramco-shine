import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hardcoded built-in authentication system
  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@ramcosteels.com' && password === 'imtheadmin') {
          setUser({ 
            uid: 'admin-1', 
            email: email,
            displayName: 'Admin'
          });
          setUserRole('admin');
          resolve();
        } else if (email === 'guest@ramcosteels.com' && password === 'imtheguest') {
          setUser({ 
            uid: 'guest-1', 
            email: email,
            displayName: 'Guest'
          });
          setUserRole('viewer');
          resolve();
        } else {
          reject(new Error("Invalid email or password. Please use authorized credentials."));
        }
      }, 500); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    return Promise.resolve();
  };

  const value = {
    user,
    userRole,
    isAdmin: userRole === 'admin',
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
