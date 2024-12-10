import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import Payments from "@models/payments";

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
      gateway: "TransactionCloud",
      type: req.type,
      orderId: req?.orderId || "",
    });

    const productId =
      req.type === "one-time"
        ? "TC-PR_AxDnw27"
        : req.type === "7-days"
        ? "TC-PR_1WvzaGO"
        : req.type === "30-days"
        ? "TC-PR_mgKYZNP"
        : "TC-PR_1WvzaGO";

    const res = await fetch(
      `https://api.transaction.cloud/v1/customize-product/${productId}`,
      {
        method: "POST",
        body: JSON.stringify({
          prices: [{ currency: "USD", value: req.amount }],
          userMail: req.email,
          description: `${req.category} ${req.subCategory}`,
          payload: newPaymentId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.TRANSACTION_CLOUD_API_KEY}:${process.env.TRANSACTION_CLOUD_SECRET}`,
        },
      }
    );
    const response = await res.json();

    return NextResponse.json({ link: response.link }, { status: 200 });
  } catch (e) {
    console.log(e.message);
  }
}
