import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import Payments from "@models/payments";
import { sha256 } from "@lib/sha256";
import querystring from "querystring";

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
      gateway: "Payeer",
      type: req.type,
      orderId: req?.orderId || "",
    });

    const m_shop = process.env.PAYEER_SHOP_ID;
    const m_orderid = newPaymentId;
    const m_amount = Number.parseFloat(req.currency === "RUB" ? req.rubAmount : req.amount).toFixed(2);
    const m_curr = req.currency;
    const m_desc = Buffer.from(`Payment #${newPaymentId}`).toString("base64");
    const m_key = process.env.PAYEER_SECRET;

    const arHash = [m_shop, m_orderid, m_amount, m_curr, m_desc, m_key];

    const sign = sha256(arHash);

    const params = {
      m_shop,
      m_orderid,
      m_amount,
      m_curr,
      m_desc,
      m_sign: sign,
    };

    const paymentLink = `https://payeer.com/merchant/?${querystring.stringify(params)}`;

    return NextResponse.json({ link: paymentLink }, { status: 200 });
  } catch (e) {
    console.log(e.message);
  }
}
