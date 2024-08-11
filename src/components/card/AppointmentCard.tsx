import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { format } from "date-fns";
import { DocumentData, Timestamp } from "firebase/firestore";

const AppointmentCard = ({ data }: DocumentData) => {
  console.log();
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="font-bold">Meeting with {data?.apntWith}</div>

            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />

              <div className="">{`
              ${data.date instanceof Timestamp ? format(data?.date?.toDate(), "PPP") : format(data?.date, "PPP")} at ${data?.time}`}</div>
            </div>
          </div>
        </div>

        <div className="py-1">
          <p className="text-xl font-semibold">{data?.title}</p>
          <p className="">{data?.description}</p>
        </div>

        <CardFooter className="flex justify-end gap-2 p-0">
          {/* <div className="flex gap-1">
            <MicIcon className="w-5 h-5 " />
            <span className="">Audio message attached</span>
          </div> */}

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">Accept</Button>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
