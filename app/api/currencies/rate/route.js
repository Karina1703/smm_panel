import { NextResponse } from "next/server";
import Currencies from "@models/currencies";
import dbConnect from "@utils/database";

export async function GET(req) {
  const url = new URL(req.url);
  const currency = url.searchParams.get("currency");

  try {
    await dbConnect();

    const valute = await Currencies.findOne({ currency: currency });

    if (!valute) {
      return NextResponse.json(
        { error: "Currency not found" },
        { status: 404 }
      );
    }

    const value = JSON.parse(JSON.stringify(valute.value));

    return NextResponse.json({ value });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { error: "Failed to fetch currency", details: e.message },
      { status: 500 }
    );
  }
}
