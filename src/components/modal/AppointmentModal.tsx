/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SelectDate from "../common/SelectDate";
import { selectTimes } from "@/const/constValue";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import SelectDropdown from "../common/SelectDropdown";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const AppointmentModal = ({ name }: { name: string }) => {
  const { currentUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [whomToMakeAppointment, setWhomToMakeAppointment] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const appointmentData = {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        time: data.time,
        apntWith: name,
        person: currentUser?.uid,
        status: true,
      };

      const appointmentsRef = collection(db, "appointments");
      const docRef = await addDoc(appointmentsRef, appointmentData);

      if (docRef.id) {
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };
  console.log(whomToMakeAppointment);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setWhomToMakeAppointment(name)}>
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
                  items={selectTimes}
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
              <Button type="submit" className="w-full">
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
