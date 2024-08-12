/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { addDoc, collection, DocumentData, getDocs, query } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

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
  const [allAppointments, setAllAppointments] = useState<DocumentData[]>([]);

  // finding all users
  const queryofAppointments = async () => {
    const appointmentRef = collection(db, "users");
    const queryies = query(appointmentRef);
    const querySnap = await getDocs(queryies);
    return querySnap;
  };
  const { data: allUsers } = useQuery({ queryKey: ["users"], queryFn: queryofAppointments });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   async function getAllUsersFromDB() {
  //     const allUsersDoc = await getDocs(collection(db, "users"));
  //     const allUsers = allUsersDoc.docs.map((doc) => doc.data());

  //     setAllUsers(allUsers);
  //   }
  //   getAllUsersFromDB();
  // }, [currentUser?.uid]);

  // finding all appointments
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

  // logged in user
  const loggedInUser = currentUser?.email?.split("@email.com")[0];

  const value: IAuthContext = {
    currentUser,
    register,
    login,
    logout,
    allUsers: allUsers?.docs.map((doc) => doc.data()),
    allAppointments,
    loggedInUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext<IAuthContext>(AuthContext);
