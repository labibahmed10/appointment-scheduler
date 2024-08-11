/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ISelectDropdown {
  placeholder: string;
  items: string[];
  register?: any;
  onChange?: (value: string) => void;
  value?: string;
  // handleShortAppointments?: (value: string) => void;
}

const SelectDropdown = forwardRef<HTMLSelectElement, ISelectDropdown>(({ placeholder, items, register, onChange, value }, ref) => {
  return (
    <Select ref={ref} value={value} onValueChange={onChange} {...register}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

export default SelectDropdown;
