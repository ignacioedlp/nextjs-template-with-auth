import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import zod from "zod";

const schema = zod.object({
  email: zod.string().email("Invalid email").min(1, "Email is required"),
  username: zod.string().min(3, "Username is required").max(100),
  password: zod
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export async function POST(request: Request) {
  try {
    const { email, username, password } = schema.parse(await request.json());

    // Check values with zod

    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 409 }
      );
    }

    // Use bcrypt to hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        username,
        password: passwordHash,
      },
    });

    const body = {
      message: "User created successfully",
      user,
    };

    return NextResponse.json(body);
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
