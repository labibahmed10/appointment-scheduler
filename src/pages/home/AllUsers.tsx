import UsersCard from "@/components/card/UsersCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AllUsers = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Find Users</h2>
      <div className="bg-card p-6 rounded-md shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Search users..." className="flex-1" />
          <Button>Search</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <UsersCard />
          <UsersCard />
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
