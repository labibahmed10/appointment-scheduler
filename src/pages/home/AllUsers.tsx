import UsersCard from "@/components/card/UsersCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useAuth } from "@/context/AuthContext";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState<DocumentData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | undefined>("");
  const { currentUser } = useAuth();

  const searchUserRef = useRef<HTMLInputElement>(null);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchUser = () => {
    const searchedUser = searchUserRef.current?.value.trim().toLowerCase();
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
    timeOutRef.current = setTimeout(() => {
      setSearchQuery(searchedUser);
    }, 300);
  };

  useEffect(() => {
    async function getAllUsersFromDB() {
      const allUsersDoc = await getDocs(collection(db, "users"));
      const allUsers = allUsersDoc.docs.map((doc) => doc.data()).filter((doc) => doc.id !== currentUser?.uid);

      setAllUsers(allUsers);
    }
    getAllUsersFromDB();
  }, [currentUser?.uid]);

  const filteredUsers = allUsers.filter((user) => user.name.toLowerCase().includes(searchQuery));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Find Users</h2>
      <div className="bg-card p-6 rounded-md shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <Input ref={searchUserRef} onChange={handleSearchUser} placeholder="Search users..." className="flex-1" />
          <Button>Search</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredUsers?.map((doc) => (
            <UsersCard user={doc} key={doc.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
