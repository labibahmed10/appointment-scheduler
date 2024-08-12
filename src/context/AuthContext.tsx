/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { addDoc, collection, DocumentData, getDocs } from "firebase/firestore";

interface IAuthContext {
  currentUser: User | null;
  register: (userName: string, password: string) => Promise<string | undefined>;
  login: (userName: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  allUsers: DocumentData[];
  allAppointments: DocumentData[];
  loggedInUser: string | undefined;
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<DocumentData[]>([]);
  const [allAppointments, setAllAppointments] = useState<DocumentData[]>([]);

  useEffect(() => {
    const getAppointments = async () => {
      const appointments = await getDocs(collection(db, "appointments"));
      setAllAppointments(
        appointments.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    };

    getAppointments();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // finding all users
  useEffect(() => {
    async function getAllUsersFromDB() {
      const allUsersDoc = await getDocs(collection(db, "users"));
      const allUsers = allUsersDoc.docs.map((doc) => doc.data());

      setAllUsers(allUsers);
    }
    getAllUsersFromDB();
  }, [currentUser?.uid]);

  //  sign up or register
  const register = async (userName: string, password: string): Promise<string | undefined> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userName + "@email.com", password);

      const userDoc = await addDoc(collection(db, "users"), {
        id: userCredential.user.uid,
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

  const loggedInUser = currentUser?.email?.split("@email.com")[0];

  const value: IAuthContext = {
    currentUser,
    register,
    login,
    logout,
    allUsers,
    allAppointments,
    loggedInUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext<IAuthContext>(AuthContext);
