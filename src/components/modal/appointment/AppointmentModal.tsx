import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectDropdown from "../../common/SelectDropdown";

import { Textarea } from "@/components/ui/textarea";
import SelectDate from "../SelectDate";
import { selectTimes } from "@/const/constValue";

const AppointmentModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Schedule Appointment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Create Appointment</DialogTitle>
          <DialogDescription className="text-center">create an appointment with the user</DialogDescription>
        </DialogHeader>

        <form>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <SelectDate />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <SelectDropdown placeholder="Select time" items={selectTimes} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Appointment title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Appointment description" />
            </div>
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
