/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { auth } from "@/firebase/firebase";

interface IAuthContext {
  currentUser: User | null;
  register: (userName: string, password: string) => Promise<UserCredential>;
  login: (userName: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  //  sign up or register
  const register = (userName: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, userName + "@email.com", password);
  };

  //  login
  const login = (userName: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, userName + "@email.com", password);
  };

  //  logout
  const logout = () => {
    return signOut(auth);
  };

  const value: IAuthContext = {
    currentUser,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext<IAuthContext>(AuthContext);
