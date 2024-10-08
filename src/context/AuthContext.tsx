/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, query, updateDoc } from "firebase/firestore";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";

interface IAuthContext {
  currentUser: User | null;
  register: (userName: string, password: string) => Promise<string | undefined>;
  login: (userName: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  allUsers: DocumentData[];
  allAppointments: DocumentData[];
  loggedInUser: string | undefined;
  appointmentMutation: UseMutationResult<void, Error, any, unknown>;
  cancelAppointmentMutation: UseMutationResult<void, Error, any, unknown>;
  acceptAppointmentMutation: UseMutationResult<void, Error, any, unknown>;
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // finding all users
  const queryofUsers = async () => {
    const usersRef = collection(db, "users");
    const queries = query(usersRef);
    const querySnap = await getDocs(queries);
    return querySnap?.docs.map((doc) => doc.data());
  };
  const { data: allUsers } = useQuery({ queryKey: ["users"], queryFn: queryofUsers });

  // finding all appointments
  const queryOfAppointments = async () => {
    const appointmentRef = collection(db, "appointments");
    const queries = query(appointmentRef);
    const querySnap = await getDocs(queries);
    return querySnap?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };
  const { data: allAppointments } = useQuery({ queryKey: ["appointments"], queryFn: queryOfAppointments });

  // creating new appointment
  const createNewAppointment = async (appointmentData: any) => {
    const appointmentsRef = collection(db, "appointments");
    await addDoc(appointmentsRef, appointmentData);
  };

  const appointmentMutation = useMutation({
    mutationKey: ["appointments"],
    mutationFn: createNewAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  // decline / cancel appointment
  const cancelAMeeeting = async (id: string) => {
    return await deleteDoc(doc(db, "appointments", id));
  };

  const cancelAppointmentMutation = useMutation({
    mutationKey: ["appointments"],
    mutationFn: cancelAMeeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  const acceptAMeeeting = async (id: string) => {
    const appointmentRef = doc(db, "appointments", id);
    return await updateDoc(appointmentRef, {
      isAccepted: true,
    });
  };

  const acceptAppointmentMutation = useMutation({
    mutationKey: ["appointments"],
    mutationFn: acceptAMeeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  //  sign up or register
  const register = async (userName: string, password: string): Promise<string | undefined> => {
    const userCredential = await createUserWithEmailAndPassword(auth, userName + "@email.com", password);
    const userDoc = await addDoc(collection(db, "users"), {
      id: userCredential.user.uid,
      name: userName,
    });

    return userDoc.id;
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
    allUsers: allUsers as DocumentData[],
    allAppointments: allAppointments as DocumentData[],
    appointmentMutation,
    loggedInUser,
    cancelAppointmentMutation,
    acceptAppointmentMutation,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext<IAuthContext>(AuthContext);
