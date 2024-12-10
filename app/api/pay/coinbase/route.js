import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import Payments from "@models/payments";
import { headers } from "next/headers";
import crypto from "crypto";
import { creditUserBalance } from "@lib/creditUserBalance";
import { processQuickOrder } from "@lib/processQuickOrder";

export async function POST(request) {
  // const contentType = request.headers.get("content-type");
  // console.log(contentType); // application/json
  console.log("================== COINBASE POSTBACK START ==================");

  const req = await request.json();
  const headersList = headers();
  const coinbaseSign = headersList.get("x-cc-webhook-signature");
  const payload = JSON.stringify(req);
  const sharedSecret = process.env.COINBASE_WEBHOOK;
  const sign = crypto.createHmac("sha256", sharedSecret).update(Buffer.from(payload)).digest("hex");

  // console.log("COINBASE GENERATED SIGN " + sign);
  // console.log("COINBASE POSTBACK SIGN " + coinbaseSign);
  // console.log(req.event.type);

  try {
    await dbConnect();

    const payment = await Payments.findOne({
      paymentId: req.event.data.description,
    });

    if (
      sign === coinbaseSign &&
      (req.event.type === "charge:confirmed" ||
        req.event.type === "charge:delayed" ||
        req.event.type === "charge:resolved") &&
      payment.status === 0 &&
      payment.type === "Add Funds"
    ) {
      console.log("====== NEW BALANCE TOP UP ======");
      console.log(req);

      await creditUserBalance(payment);

      console.log("================== COINBASE POSTBACK END ==================");
      return NextResponse.json({ message: "OK" }, { status: 200 });
    }

    if (
      sign === coinbaseSign &&
      (req.event.type === "charge:confirmed" ||
        req.event.type === "charge:delayed" ||
        req.event.type === "charge:resolved") &&
      payment.status === 0 &&
      payment.type !== "Add Funds"
    ) {
      console.log("====== NEW [ONE-TIME] ORDER ======");
      console.log(req);

      await processQuickOrder(payment);

      console.log("================== COINBASE POSTBACK END ==================");
      return NextResponse.json({ message: "OK" }, { status: 200 });
    }

    return NextResponse.json({ message: "wrong request" }, { status: 200 });
  } catch (e) {
    console.log(e.message);
  }
}
