import AppointmentCard from "@/components/card/AppointmentCard";
import SelectDropdown from "@/components/common/SelectDropdown";
import { Button } from "@/components/ui/button";
import { timeFrame } from "@/const/constValue";
import { useAuth } from "@/context/AuthContext";
import { DocumentData, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MyAppointments = () => {
  const { allAppointments, loggedInUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [shortAppointments, setShortAppointments] = useState<DocumentData[]>([]);
  let showAllAppointments;

  const handleSubmit = () => {
    const filteredAppointments = allAppointments?.filter((user) => {
      if (searchTerm) {
        return user?.title?.toLowerCase().includes(searchTerm?.toLowerCase());
      }
      return user;
    });
    setShortAppointments(filteredAppointments);
  };

  useEffect(() => {
    const loggedInUsersAppointments = allAppointments?.filter(
      (appointment) => loggedInUser === appointment.appointmentFrom || loggedInUser === appointment.appointmentWith
    );

    setShortAppointments(loggedInUsersAppointments);
  }, [allAppointments, loggedInUser]);

  const onChange = (filterType: string) => {
    const result = shortAppointments
      .map((appointments) => {
        const appointmentDate = appointments.date instanceof Timestamp ? new Date(appointments?.date.toDate()) : new Date(appointments?.date);
        return { ...appointments, date: appointmentDate };
      })
      .sort((a, b) => {
        switch (filterType) {
          case "upcoming":
            return b?.date.getTime() - a.date.getTime();
          case "past":
            return a.date.getTime() - b.date.getTime();
          default:
            return 1;
        }
      });
    setShortAppointments(result);
  };

  if (shortAppointments?.length > 0) {
    showAllAppointments = (
      <div className="grid sm:grid-cols-2 gap-4">
        {shortAppointments.map((data) => (
          <AppointmentCard key={data.id} data={data} />
        ))}
      </div>
    );
  } else {
    showAllAppointments = (
      <div>
        <p className="text-2xl font-semibold font-mono text-indigo-800">No Appointments are Available</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mt-12 mb-6 ">My Appointments</h2>

      <div className="bg-card p-6 rounded-md shadow-md">
        <div className="flex items-start sm:items-center justify-between sm:flex-row flex-col gap-3 mb-4">
          {/* filter by status */}
          <div className="flex items-center justify-between gap-1">
            <Label className="w-full sm:w-40">Filter by status</Label>
            <SelectDropdown placeholder="Filter by status" items={timeFrame} onChange={onChange} />
          </div>

          {/* search by title */}
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search your appointment title..." />
            <Button type="submit" onClick={handleSubmit}>
              Search
            </Button>
          </div>
        </div>

        {showAllAppointments}
      </div>
    </div>
  );
};

export default MyAppointments;
