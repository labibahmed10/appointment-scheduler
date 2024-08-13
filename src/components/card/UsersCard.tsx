import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AppointmentModal from "../modal/AppointmentModal";
import { DocumentData } from "firebase/firestore";

const UsersCard = ({ user }: { user: DocumentData }) => {
  const avatarFB = user?.name?.slice(0, 2).toLocaleUpperCase();

  return (
    <>
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
              <AvatarFallback>{avatarFB}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold capitalize">{user?.name}</div>
              <div className="text-muted-foreground">@{user?.name?.toLowerCase()}</div>
            </div>
          </div>

          <AppointmentModal name={user?.name} />
        </CardContent>
      </Card>
    </>
  );
};

export default UsersCard;
