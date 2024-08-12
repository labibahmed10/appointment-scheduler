import { doc, deleteDoc } from "firebase/firestore";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { format } from "date-fns";
import { DocumentData, Timestamp } from "firebase/firestore";
import { Badge } from "../ui/badge";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";

const AppointmentCard = ({ data }: DocumentData) => {
  const { loggedInUser } = useAuth();
  const meetingText = loggedInUser === data?.appointmentFrom ? `With ${data?.appointmentWith}` : `From ${data?.appointmentFrom}`;
  const rescheduleMeeting = loggedInUser === data?.appointmentFrom ? true : false;

  const cancelAMeeeting = async (id: string) => {
    await deleteDoc(doc(db, "appointments", id));
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="font-bold">Meeting {meetingText}</div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              <div>{`
              ${data.date instanceof Timestamp ? format(data?.date?.toDate(), "PPP") : format(data?.date, "PPP")} at ${data?.time}`}</div>
            </div>
          </div>
          <Badge variant="secondary" className={`${data?.status === "upcoming" ? "bg-yellow-500" : "bg-red-400"}`}>
            {data?.status}
          </Badge>
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
            <Button
              variant="destructive"
              size="sm"
              disabled={data?.isAccepted}
              className="bg-red-600 disabled:bg-red-400 disabled:cursor-not-allowed"
              onClick={() => cancelAMeeeting(data?.id)}
            >
              Cancel
            </Button>
            {rescheduleMeeting ? (
              <Button size="sm" variant="default" className="bg-sky-600 hover:bg-sky-700">
                Reschedule
              </Button>
            ) : (
              <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                {data.isAccepted ? "Accepted" : "Accept"}
              </Button>
            )}
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
