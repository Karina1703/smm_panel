import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import { md5 } from "@lib/md5";
import Payments from "@models/payments";
import { creditUserBalance } from "@lib/creditUserBalance";
import { processQuickOrder } from "@lib/processQuickOrder";

export async function POST(request) {
  // const contentType = request.headers.get("content-type");
  // console.log(contentType); // application/json
  console.log("================== CRYPTOMUS POSTBACK START ==================");

  const req = await request.json();

  console.log(req);
  const { sign, ...restData } = req;
  const jsonString = JSON.stringify(restData, null, 0);
  const hash = md5(Buffer.from(jsonString).toString("base64") + process.env.CRYPTOMUS_TOKEN);

  console.log("CRYPTOMUS jsonSTRING " + jsonString);
  console.log("CRYPTOMUS POSTBACK SIGN " + sign);
  console.log("CRYPTOMUS GENERATED SIGN " + hash);

  try {
    await dbConnect();

    const payment = await Payments.findOne({ paymentId: req.order_id });

    if (
      req.is_final &&
      (req.status === "paid" || req.status === "paid_over") &&
      hash === sign &&
      payment.status === 0 &&
      payment.type === "Add Funds"
    ) {
      console.log("====== NEW BALANCE TOP UP ======");
      console.log(req);

      await creditUserBalance(payment);

      console.log("================== CRYPTOMUS POSTBACK END ==================");
      return NextResponse.json({ message: "OK" }, { status: 200 });
    }

    if (
      hash === sign &&
      req.is_final &&
      (req.status === "paid" || req.status === "paid_over") &&
      payment.status === 0 &&
      payment.type !== "Add Funds"
    ) {
      console.log("====== NEW [ONE-TIME] ORDER ======");
      console.log(req);

      await processQuickOrder(payment);

      console.log("================== CRYPTOMUS POSTBACK END ==================");
      return NextResponse.json({ message: "OK" }, { status: 200 });
    }

    return NextResponse.json({ message: "wrong request" }, { status: 200 });
  } catch (e) {
    console.log(e.message);
  }
}
