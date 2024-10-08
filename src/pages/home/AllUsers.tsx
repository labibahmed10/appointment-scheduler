import UsersCard from "@/components/card/UsersCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { DocumentData } from "firebase/firestore";

const AllUsers = () => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>("");
  const searchUserRef = useRef<HTMLInputElement>(null);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const { allUsers, currentUser } = useAuth();
  const [filteredUsers, setFilteredUsers] = useState<DocumentData[]>([]);
  let showUsers;

  useEffect(() => {
    const showUsers = allUsers?.filter((doc) => doc.id !== currentUser?.uid);
    setFilteredUsers(showUsers);
  }, [allUsers, currentUser?.uid]);

  const handleSearchUser = () => {
    const searchedUser = searchUserRef.current?.value.trim().toLowerCase();

    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
    timeOutRef.current = setTimeout(() => {
      setSearchQuery(searchedUser);
    }, 300);
  };

  const showFilteredUser = () => {
    const filteredUsers = allUsers?.filter((doc) => doc.id !== currentUser?.uid)?.filter((user) => user.name.toLowerCase().includes(searchQuery));
    setFilteredUsers(filteredUsers);
  };

  if (filteredUsers?.length > 0) {
    showUsers = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredUsers?.map((doc) => (
          <UsersCard user={doc} key={doc.id} />
        ))}
      </div>
    );
  } else {
    showUsers = (
      <div>
        <p className="text-base sm:text-2xl font-semibold font-mono text-indigo-800">Create a user to schedule an appointment</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 sm:mb-6">Find Users</h2>
      <div className="bg-card p-3 sm:p-6 rounded-md shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Input ref={searchUserRef} onChange={handleSearchUser} placeholder="Search users..." className="flex-1 h-7 sm:h-9 text-xs sm:text-sm" />
          <Button onClick={showFilteredUser} className="h-7 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm">
            Search
          </Button>
        </div>

        {/* all users are rendered here */}
        {showUsers}
      </div>
    </div>
  );
};

export default AllUsers;
