import { NextResponse } from "next/server";
import Services from "@models/services";
import dbConnect from "@utils/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export const revalidate = 10;

export async function GET(req) {
  try {
    await dbConnect();

    const servicesList = await Services.find({ enabled: true }).lean().sort({
      priority: -1,
      rate1K: 1,
    });

    const filteredServicesList = servicesList.map((service) => {
      const { __v, _id, createdAt, updatedAt, enabled, ...filteredService } = service;
      return filteredService;
    });

    return NextResponse.json({
      message: "success",
      count: filteredServicesList.length,
      data: filteredServicesList,
    });
  } catch (e) {
    console.error(e);
  }
}
