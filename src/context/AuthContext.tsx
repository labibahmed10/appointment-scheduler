/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

interface IAuthContext {
  currentUser: User | null;
  register: (userName: string, password: string) => Promise<string | undefined>;
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
  const register = async (userName: string, password: string): Promise<string | undefined> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userName + "@email.com", password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: userName });

      const userDoc = await addDoc(collection(db, "users"), {
        id: user.uid,
        name: userName,
      });

      return userDoc.id;
    } catch (error) {
      console.log(error);
    }
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
