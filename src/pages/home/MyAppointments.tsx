import AppointmentCard from "@/components/card/AppointmentCard";
import SelectDropdown from "@/components/common/SelectDropdown";
import { Button } from "@/components/ui/button";
import { timeFrame } from "@/const/constValue";
import { useAuth } from "@/context/AuthContext";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

const MyAppointments = () => {
  const { allAppointments } = useAuth();
  const [shortAppointments, setShortAppointments] = useState<DocumentData[]>([]);

  useEffect(() => {
    setShortAppointments(allAppointments);
  }, [allAppointments]);

  const onChange = (filterType: string) => {
    const result = allAppointments
      .map((appointments) => {
        const appointmentDate = new Date(appointments?.date.toDate());
        return { ...appointments, date: appointmentDate };
      })
      .sort((a, b) => {
        switch (filterType) {
          case "upcoming":
            return b?.date.getTime() - a.date.getTime();
          case "past":
            return a.date.getTime() - b.date.getTime();
          case "all":
          default:
            return 1;
        }
      });

    setShortAppointments(result);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-12 mb-6">My Appointments</h2>
      <div className="bg-card p-6 rounded-md shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <SelectDropdown placeholder="Filter by status" items={timeFrame} onChange={onChange} />
          <Button>Filter</Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {shortAppointments.map((data) => (
            <AppointmentCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
