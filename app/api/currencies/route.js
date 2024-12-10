import { NextResponse } from "next/server";
import Currencies from "@models/currencies";
import dbConnect from "@utils/database";

export async function GET(request) {
  const url = new URL(request.url);
  const adminApiKey = url.searchParams.get("key");

  if (adminApiKey === process.env.SECRET_KEY) {
    try {
      await dbConnect();

      const res = await fetch(`${process.env.CURRENCY_RATE_API_URL}`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch currencies data");
      }

      const data = await res.json();
      const valutes = Object.values(data.Valute);

      valutes.map(async (item) => {
        try {
          const existingValute = await Currencies.findOne({
            currency: item.CharCode,
          });

          if (existingValute) {
            existingValute.value = item.Value;
            await existingValute.save();
          } else {
            await Currencies.create({
              currency: item.CharCode,
              value: item.Value,
              name: item.Name,
            });
          }
        } catch (e) {
          console.log("Failed to update currencies: " + e.message);
        }
      });
    } catch (e) {
      console.log(e.message);
    }

    return NextResponse.json({
      status: "Currencies successfully updated",
      timestamp: new Date(),
    });
  } else {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }
}