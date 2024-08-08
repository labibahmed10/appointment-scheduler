import { Button } from "@/components/ui/button";
import { CalendarDaysIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
const SelectDate = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal">
          <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
          <span>Select date</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" initialFocus />
      </PopoverContent>
    </Popover>
  );
};

export default SelectDate;
