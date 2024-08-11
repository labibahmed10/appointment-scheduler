import AppointmentCard from "@/components/card/AppointmentCard";
import SelectDropdown from "@/components/common/SelectDropdown";
import { Button } from "@/components/ui/button";
import { timeFrame } from "@/const/constValue";
import { useAuth } from "@/context/AuthContext";

const MyAppointments = () => {
  const { allAppointments } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-bold mt-12 mb-6">My Appointments</h2>
      <div className="bg-card p-6 rounded-md shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <SelectDropdown placeholder="Filter by status" items={timeFrame} />
          <Button>Filter</Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {allAppointments.map((data) => (
            <AppointmentCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
