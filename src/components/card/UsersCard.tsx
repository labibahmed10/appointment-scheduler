import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AppointmentModal from "../modal/appointment/AppointmentModal";

const UsersCard = () => {
  return (
    <>
      <Card>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold">Sarah Myles</div>
              <div className="text-muted-foreground">@sarahmyles</div>
            </div>
          </div>

          <AppointmentModal />
        </CardContent>
      </Card>
    </>
  );
};

export default UsersCard;
