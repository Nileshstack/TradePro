"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, firestore } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

type UserData = {
  uid: string;
  email?: string | null;
  watchlist?: string[];
  portfolio?: any;
  preferences?: Record<string, any>;
};

type AuthContextValue = {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  isNewUser: boolean;
  signup: (email: string, password: string) => Promise<User | null>;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (u) {
        const ref = doc(firestore, "users", u.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUserData(snap.data() as UserData);
        
        } else {
          
          const initial: UserData = {
            uid: u.uid,
            email: u.email,
            watchlist: [],
            portfolio: { positions: [] },
            preferences: {},
          };
          await setDoc(ref, initial);
          setUserData(initial);
          setIsNewUser(true);  
        }
      } else {
        setUserData(null);
        setIsNewUser(false);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  async function signup(email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    setIsNewUser(true);  
    return cred.user;
  }

  async function login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    setIsNewUser(false); 
    return cred.user;
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
    setUserData(null);
    setIsNewUser(false);
  }

  async function updateUserData(data: Partial<UserData>) {
    if (!user) return;
    const ref = doc(firestore, "users", user.uid);
    await setDoc(ref, data, { merge: true });
    setUserData((prev) => (prev ? { ...prev, ...data } : prev));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        isNewUser,
        signup,
        login,
        logout,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
