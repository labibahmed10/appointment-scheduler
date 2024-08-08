import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const SelectTime = () => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select time" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="9:00 AM">9:00 AM</SelectItem>
        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
        <SelectItem value="12:00 PM">12:00 PM</SelectItem>
        <SelectItem value="1:00 PM">1:00 PM</SelectItem>
        <SelectItem value="2:00 PM">2:00 PM</SelectItem>
        <SelectItem value="3:00 PM">3:00 PM</SelectItem>
        <SelectItem value="4:00 PM">4:00 PM</SelectItem>
        <SelectItem value="5:00 PM">5:00 PM</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectTime;
