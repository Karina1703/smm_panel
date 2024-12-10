import { NextResponse } from "next/server";
import User from "@models/user";
import dbConnect from "@utils/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET(req) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      await dbConnect();
      const user = await User.findOne({ email: email });
      return NextResponse.json(user.balance);
    } catch (e) {
      console.log(e.message);
    }
  } else {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }
}
