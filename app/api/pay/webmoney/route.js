import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import { md5 } from "@lib/md5";
import Payments from "@models/payments";
import { creditUserBalance } from "@lib/creditUserBalance";
import { parse } from "querystring";
import { processQuickOrder } from "@lib/processQuickOrder";

export async function POST(request) {
  // const contentType = request.headers.get("content-type");
  // console.log(contentType); // application/x-www-form-urlencoded
  // console.log("==================FREEKASSA==================");
  const formData = await request.formData();
  const req = Object.fromEntries(formData.entries());
  // console.log(req);

  try {
    await dbConnect();

    const sign = md5(
      `${req.MERCHANT_ID}:${req.AMOUNT}:${process.env.FREEKASSA_SECRET2}:${req.MERCHANT_ORDER_ID}`
    );
    // console.log("FREEKASSA GENERATED SIGN " + sign);
    // console.log("FREEKASSA POSTBACK SIGN " + req.SIGN);

    const payment = await Payments.findOne({
      paymentId: req.MERCHANT_ORDER_ID,
    });

    if (sign === req.SIGN && payment.status === 0 && payment.type !== "Order") {
      await creditUserBalance(payment);

      return NextResponse.json("YES", { status: 200 });
    }

    if (sign === req.SIGN && payment.status === 0 && payment.type === "Order") {
      await processQuickOrder(payment);

      return NextResponse.json("YES", { status: 200 });
    }

    return NextResponse.json("wrong sign", { status: 200 });
  } catch (e) {
    console.log(e.message);
  }
}
