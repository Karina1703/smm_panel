import { NextResponse } from "next/server";
import User from "@models/user";
import dbConnect from "@utils/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session?.user.email;

  if (session) {
    try {
      await dbConnect();
      const user = await User.findOne({ email: email });
      return NextResponse.json(user.api_key);
    } catch (e) {
      console.log(e.message);
    }
  } else {
    return NextResponse.json("Access Denied", { status: 401 });
  }
}
