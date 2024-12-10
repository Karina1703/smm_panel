import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import Payments from "@models/payments";
import { md5 } from "@lib/md5";

export async function POST(request) {
  const req = await request.json();

  try {
    await dbConnect();
    const newPaymentId = (await Payments.countDocuments()) + 1;

    // Add payment to MongoDB - payments collection
    await Payments.create({
      paymentId: newPaymentId,
      amount: req.amount,
      email: req.email,
      status: 0,
      gateway: "Freekassa",
      type: req.type,
      orderId: req?.orderId || "",
    });

    const sign = md5(
      `${process.env.FREEKASSA_SHOP_ID}:${req.currency === "RUB" ? req.rubAmount : req.amount}:${
        process.env.FREEKASSA_SECRET1
      }:${req.currency}:${newPaymentId}`
    );

    const paymentLink = `https://pay.freekassa.ru/?m=${process.env.FREEKASSA_SHOP_ID}&oa=${
      req.currency === "RUB" ? req.rubAmount : req.amount
    }&currency=${req.currency}&o=${newPaymentId}&s=${sign}&lang=en&em=${req.email}`;

    return NextResponse.json({ link: paymentLink }, { status: 200 });
  } catch (e) {
    console.log(e.message);
  }
}
