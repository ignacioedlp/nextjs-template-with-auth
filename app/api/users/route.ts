import { AuthOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export const GET = async (req: Request, res: Response) => {
  const session = await getServerSession(AuthOptions);

  if (!!session) {
    // Get all the users sin la password
    const users = await db.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        role: true
      },
    });

    return NextResponse.json(users);
  } else {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
};
