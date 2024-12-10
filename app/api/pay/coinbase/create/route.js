import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import Payments from "@models/payments";
import axios from "axios";

export async function POST(request) {
  const req = await request.json();

  try {
    await dbConnect();
    const newPaymentId = (await Payments.countDocuments()) + 1;

    const paymentDataPost = {
      name: `Email: (${req.email})`,
      description: newPaymentId,
      local_price: {
        amount: req.currency === "RUB" ? req.rubAmount + "" : req.amount + "",
        currency: req.currency,
      },
      pricing_type: "fixed_price",
      cancel_url: "https://smmstats.com",
      redirect_url: "https://smmstats.com/payments/success",
    };

    // Add payment to MongoDB - payments collection
    await Payments.create({
      paymentId: newPaymentId,
      amount: req.amount,
      email: req.email,
      status: 0,
      gateway: "Coinbase",
      type: req.type,
      orderId: req?.orderId || "",
    });

    const paymentLink = await axios
      .post("https://api.commerce.coinbase.com/charges/", paymentDataPost, {
        headers: {
          "X-CC-Api-Key": `${process.env.COINBASE_TOKEN}`,
          "X-CC-Version": "2018-03-22",
        },
      })
      .then((coinbaseRes) => {
        return coinbaseRes.data.data.hosted_url;
      });

    return NextResponse.json({ link: paymentLink }, { status: 200 });
  } catch (e) {
    console.log(e.message);
  }
}
