import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import Payments from "@models/payments";
import axios from "axios";
import crypto from "crypto";
import { md5 } from "@lib/md5";

export async function POST(request) {
  const req = await request.json();

  try {
    await dbConnect();
    const newPaymentId = (await Payments.countDocuments()) + 1;

    const paymentDataPost = {
      order_id: newPaymentId + "",
      amount: req.currency === "RUB" ? req.rubAmount + "" : req.amount + "",
      currency: req.currency,
      url_return: "https://smmstats.com/payments/success",
      url_callback: "https://smmstats.com/api/pay/cryptomus",
      additional_data: req.email + "_" + newPaymentId,
    };

    // Add payment to MongoDB - payments collection
    await Payments.create({
      paymentId: newPaymentId,
      amount: req.amount,
      email: req.email,
      status: 0,
      gateway: "Cryptomus",
      type: req.type,
      orderId: req?.orderId || "",
    });

    const sign = md5(Buffer.from(JSON.stringify(paymentDataPost)).toString("base64") + process.env.CRYPTOMUS_TOKEN);

    const paymentLink = await axios
      .post("https://api.cryptomus.com/v1/payment", paymentDataPost, {
        headers: {
          merchant: process.env.CRYPTOMUS_SHOP_ID,
          sign: sign,
          "Content-Type": "application/json",
        },
      })
      .then((cryptomusRes) => {
        return cryptomusRes.data.result.url;
      });

    return NextResponse.json({ link: paymentLink }, { status: 200 });
  } catch (e) {
    console.log(e.message);
  }
}
