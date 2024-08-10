import { MicIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { format } from "date-fns";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppointmentCard = ({ data }: any) => {
  console.log(data);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-bold">Meeting with {data?.apntWith}</div>
            <div className="">{`${format(data?.date?.toDate() || data?.startDate?.toDate(), "PPP")} at ${data?.time}`}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">Accept</Button>
          </div>
        </div>
        <p className="">{data?.title}</p>
        <p className="">{data?.description}</p>
        <div className="mt-4 flex items-center gap-2">
          <MicIcon className="w-5 h-5 " />
          <span className="">Audio message attached</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
