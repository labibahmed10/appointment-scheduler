import { MicIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const AppointmentCard = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-bold">Meeting with John Doe</div>
            <div className="text-muted-foreground">April 15, 2023 at 2:00 PM</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">Accept</Button>
          </div>
        </div>
        <div className="text-muted-foreground">Let's discuss the project roadmap and timeline.</div>
        <div className="mt-4 flex items-center gap-2">
          <MicIcon className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground">Audio message attached</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
