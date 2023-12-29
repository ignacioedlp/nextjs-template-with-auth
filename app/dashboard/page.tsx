import { AuthOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import ButtonSignOut from "@/components/ButtonSignOut";
import User from "@/components/User";

async function Page() {
  const session = await getServerSession(AuthOptions);

  return (
    <main className="flex flex-col items-center justify-center h-screen w-full gap-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <User />
      <p className="text-xl">You are {session?.user.role}</p>
      <ButtonSignOut />
    </main>
  );
}

export default Page;
