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
      order_id: newPaymentId,
      amount: req.currency === "RUB" ? req.rubAmount : req.amount,
      type: "normal",
      shop_id: process.env.CARDLINK_SHOP_ID,
      currency_in: req.currency,
      name: `SMMSTATS.COM #${newPaymentId}`,
    };

    // Add payment to MongoDB - payments collection
    await Payments.create({
      paymentId: newPaymentId,
      amount: req.amount,
      email: req.email,
      status: 0,
      gateway: "Cardlink",
      type: req.type,
      orderId: req?.orderId || "",
    });

    const paymentLink = await axios
      .post("https://cardlink.link/api/v1/bill/create", paymentDataPost, {
        headers: {
          Authorization: `Bearer ${process.env.CARDLINK_TOKEN}`,
        },
      })
      .then((cardlinkRes) => {
        return cardlinkRes.data.link_page_url;
      });

    return NextResponse.json({ link: paymentLink }, { status: 200 });
  } catch (e) {
    console.log(e.message);
  }
}
