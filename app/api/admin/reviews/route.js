import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import Reviews from "@models/reviews";

export const revalidate = 10;

export async function GET(req) {
  try {
    await dbConnect();

    const reviews = await Reviews.find({}).lean().sort({ createdAt: -1 }).limit(5);

    const filteredReviewsList = reviews.map((review) => {
      const { __v, _id, updatedAt, ...filteredReview } = review;
      return filteredReview;
    });

    return NextResponse.json(filteredReviewsList);
  } catch (e) {
    console.log(e.message);
  }
}
