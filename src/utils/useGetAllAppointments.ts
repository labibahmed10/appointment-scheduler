import { db } from "@/firebase/firebase";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetAllAppointments = () => {
  const [allAppointments, setAllAppointments] = useState<DocumentData[]>([]);
  useEffect(() => {
    const getAppointments = async () => {
      const appointments = await getDocs(collection(db, "appointments"));

      setAllAppointments(
        appointments.docs.map((doc) => {
          //   console.log(doc.id);

          return { ...doc.data(), id: doc.id };
        })
      );
    };

    getAppointments();
  }, []);

  return allAppointments;
};

export default useGetAllAppointments;
