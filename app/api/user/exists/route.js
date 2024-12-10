import { NextResponse } from "next/server";
import User from "@models/user";
import dbConnect from "@utils/database";
import { createUser } from "@lib/createUser";

export async function GET(req) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");

  try {
    await dbConnect();

    const userExists = await User.findOne({ email: email });

    if (!userExists) {
      await createUser(null, null, email);
      return NextResponse.json({ message: "User successfully created!" });
    }
    return NextResponse.json({ message: "User already exists!" });
  } catch (e) {
    console.log(e.message);
  }
}
