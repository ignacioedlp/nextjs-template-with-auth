"use client";
import { AuthOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React, { useEffect, useState } from "react";
import ButtonSignOut from "@/components/ButtonSignOut";
import User from "@/components/User";
import UserTable from "@/components/UserTable";

function Page() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/api/users");
    const users = await res.json();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Users Panel</h1>
      <UserTable users={users} />
    </div>
  );
}

export default Page;
