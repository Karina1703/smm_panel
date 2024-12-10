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
      LMI_PAYMENT_NO: newPaymentId,
      LMI_PAYMENT_AMOUNT: req.amount + req.amount * 0.15,
      LMI_PAYEE_PURSE: process.env.WEBMONEY_PURSE,
      LMI_PAYMENT_DESC: `Payment #${newPaymentId}`,
    };

    // Add payment to MongoDB - payments collection
    await Payments.create({
      paymentId: newPaymentId,
      amount: req.amount,
      email: req.email,
      status: 0,
      gateway: "WebMoney",
      type: req.type,
      orderId: req?.orderId || "",
    });

    const paymentLink = await axios
      .post(
        "https://merchant.webmoney.com/lmi/payment_utf.asp",
        paymentDataPost
      )
      .then((webmoneyRes) => {
        console.log(webmoneyRes);
        return webmoneyRes.data;
      });

    return NextResponse.json({ link: paymentLink }, { status: 200 });
  } catch (e) {
    console.log(e.message);
  }
}
