/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SelectDate from "../common/SelectDate";
import { selectTimes } from "@/const/constValue";
import { useForm } from "react-hook-form";
import SelectDropdown from "../common/SelectDropdown";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const AppointmentModal = ({ name }: { name: string }) => {
  const { loggedInUser, allAppointments, allUsers, appointmentMutation } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [appointmentTime, setAppointmentTime] = useState(selectTimes);
  const { isError, isSuccess, isPending, error, mutate, reset: mutationStateReset } = appointmentMutation;
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const dateValue = watch("date");
    if (!dateValue) return;

    // Collect all booked times for the selected user and date
    const bookedTimes = allAppointments
      ?.filter((appointment) => {
        const appointmentDate = new Date(appointment.date.toDate()).toDateString();
        return appointment.appointmentWith === name && appointmentDate === dateValue.toDateString();
      })
      ?.map((appointment) => appointment.time);

    // Filter available times based on booked times
    const availableTimes = selectTimes.filter((time) => !bookedTimes.includes(time));
    setAppointmentTime(availableTimes); // Update the state with available times
  }, [allAppointments, allUsers, name, watch("date")]);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      reset();
      mutationStateReset();
      toast.success("Appointment was created successfully");
    }

    if (isError) {
      setIsOpen(false);
      reset();
      mutationStateReset();
      toast.error("Failed to create an appointment", {
        description: error ? error?.message : "",
      });
    }
  }, [error, isError, isSuccess, mutationStateReset, reset]);

  const onSubmit = async (data: any) => {
    try {
      const dateWithTime = `${new Date(data?.date)?.toLocaleDateString()} ${data?.time}`;
      const date = new Date(dateWithTime);
      const status = date > new Date() ? "upcoming" : "past";

      const appointmentData = {
        title: data.title,
        description: data.description,
        date: date,
        time: data.time,
        appointmentWith: name,
        appointmentFrom: loggedInUser,
        status: status,
        isAccepted: false,
      };

      mutate(appointmentData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Schedule Appointment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Create Appointment</DialogTitle>
          <DialogDescription className="text-center">Create an appointment with the user</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              {/* date of appointment */}
              <div className="space-y-2">
                <Label htmlFor="date">Start Date</Label>
                <SelectDate
                  setDate={(value) => setValue("date", value)}
                  date={watch("date")}
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && <span className="text-red-500">{errors.date.message as string}</span>}
              </div>

              {/* time of appointment */}
              <div className="space-y-2">
                <Label htmlFor="time">Start Time</Label>
                <SelectDropdown
                  register={undefined}
                  placeholder="Select time"
                  items={appointmentTime}
                  {...register("time", { required: "Time is required" })}
                  onChange={(value) => setValue("time", value)}
                  value={watch("time")}
                />
                {errors.time && <span className="text-red-500">{errors.time.message as string}</span>}
              </div>
            </div>

            {/* title of appointment */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Appointment title" {...register("title", { required: "Title is required" })} />
              {errors.title && <span className="text-red-500">{errors.title.message as string}</span>}
            </div>

            {/* description of appointment */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Appointment description"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && <span className="text-red-500">{errors.description.message as string}</span>}
            </div>

            {/* close btn */}
            <DialogFooter>
              <Button type="submit" className="w-full bg-indigo-700 hover:bg-indigo-800">
                {isPending && <svg className="animate-spin h-5 w-5 mr-2 border-white border-2 rounded-full" viewBox="0 0 48 48"></svg>}
                Create Appointment
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
