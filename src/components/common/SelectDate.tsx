import { Button } from "@/components/ui/button";
import { CalendarDaysIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import React from "react";

interface ISelectDate {
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  date: Date | undefined;
}

const SelectDate = ({ setDate, date }: ISelectDate) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal">
          <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
          {date ? format(date, "dd/MM/yyyy") : <span>Select date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={(value) => setDate(value)} />
      </PopoverContent>
    </Popover>
  );
};

export default SelectDate;
