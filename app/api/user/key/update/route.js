import { NextResponse } from "next/server";
import User from "@models/user";
import dbConnect from "@utils/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const email = session?.user.email;
  const req = await request.json();

  if (session) {
    try {
      await dbConnect();
      const user = await User.findOne({ email: email });
      await user.updateOne({
        $set: {
          api_key: req.api_key,
        },
      });

      return NextResponse.json("API key changed!", { status: 200 });
    } catch (e) {
      console.log(e.message);
    }
  } else {
    return NextResponse.json("Access Denied", { status: 401 });
  }
}
