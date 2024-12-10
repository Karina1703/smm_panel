import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import Reviews from "@models/reviews";

export async function POST(request) {
  const reviewData = await request.json();

  try {
    await dbConnect();

    await Reviews.create({
      name: reviewData.name,
      text: reviewData.text,
    });

    return NextResponse.json(
      { message: "New Review successfully published!" },
      { status: 200 }
    );
  } catch (e) {
    console.log(e.message);
  }
}
