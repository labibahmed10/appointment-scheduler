import { doc, updateDoc } from "firebase/firestore";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { format } from "date-fns";
import { DocumentData, Timestamp } from "firebase/firestore";
import { Badge } from "../ui/badge";
import { useAuth } from "@/context/AuthContext";

const AppointmentCard = ({ data }: DocumentData) => {
  const { loggedInUser, cancelAppointmentMutation, acceptAppointmentMutation } = useAuth();
  const meetingText = loggedInUser === data?.appointmentFrom ? `With ${data?.appointmentWith}` : `From ${data?.appointmentFrom}`;
  const rescheduleMeeting = loggedInUser === data?.appointmentFrom ? true : false;
  const { isPending, mutate, variables } = cancelAppointmentMutation;
  const { isPending: isAcceptPending, mutate: acceptMutate, variables: acceptVariables } = acceptAppointmentMutation;

  return (
    <Card className="h-fit">
      <CardContent className="px-4 pt-4 pb-0">
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
          <p className="text-md text-muted-foreground break-words">{data?.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 px-4 pb-4">
        <div className="flex items-center gap-2">
          <Button variant="destructive" size="sm" className="bg-red-600 " onClick={() => mutate(data?.id)}>
            {data?.id === variables && isPending && (
              <svg className="animate-spin h-5 w-5 mr-2 border-white border-2 rounded-full" viewBox="0 0 48 48"></svg>
            )}
            Decline
          </Button>
          {!rescheduleMeeting && (
            <Button
              disabled={data?.isAccepted}
              size="sm"
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => acceptMutate(data?.id)}
            >
              {data?.id === acceptVariables && isAcceptPending && (
                <svg className="animate-spin h-5 w-5 mr-2 border-white border-2 rounded-full" viewBox="0 0 48 48"></svg>
              )}
              {data.isAccepted ? "Accepted" : "Accept"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AppointmentCard;
