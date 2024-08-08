import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { MicIcon } from "lucide-react";

const MyAppointments = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-12 mb-6">My Appointments</h2>
      <div className="bg-card p-6 rounded-md shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="past">Past</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
          <Button>Filter</Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
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
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-bold">Appointment with Sarah Myles</div>
                  <div className="text-muted-foreground">May 1, 2023 at 4:30 PM</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm">Accept</Button>
                </div>
              </div>
              <div className="text-muted-foreground">Discuss the new design proposals.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
