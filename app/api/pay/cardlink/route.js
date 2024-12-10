import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import { md5 } from "@lib/md5";
import Payments from "@models/payments";
import { creditUserBalance } from "@lib/creditUserBalance";
import { processQuickOrder } from "@lib/processQuickOrder";

export async function POST(request) {
  // const contentType = request.headers.get("content-type");
  // console.log(contentType); // application/x-www-form-urlencoded
  console.log("================== CARDLINK POSTBACK START ==================");
  const formData = await request.formData();
  const req = Object.fromEntries(formData.entries());

  try {
    await dbConnect();

    const sign = md5(req.OutSum + ":" + req.InvId + ":" + process.env.CARDLINK_TOKEN).toUpperCase();

    // console.log("CARDLINK GENERATED SIGN " + sign);
    // console.log("CARDLINK POSTBACK SIGN " + req.SignatureValue);

    const payment = await Payments.findOne({ paymentId: req.InvId });

    if (
      sign === req.SignatureValue &&
      req.Status === "SUCCESS" &&
      payment.status === 0 &&
      payment.type === "Add Funds"
    ) {
      console.log("====== NEW BALANCE TOP UP ======");
      console.log(req);

      await creditUserBalance(payment);

      console.log("================== CARDLINK POSTBACK END ==================");
      return NextResponse.json({ message: "OK" }, { status: 200 });
    }

    if (
      sign === req.SignatureValue &&
      req.Status === "SUCCESS" &&
      payment.status === 0 &&
      payment.type !== "Add Funds"
    ) {
      console.log("====== NEW [ONE-TIME] ORDER ======");
      console.log(req);

      await processQuickOrder(payment);

      console.log("================== CARDLINK POSTBACK END ==================");
      return NextResponse.json({ message: "OK" }, { status: 200 });
    }

    if (sign === req.SignatureValue && req.Status === "FAIL") {
      return NextResponse.json("payment status is fail, but response is OK!", { status: 200 });
    }

    return NextResponse.json({ message: "wrong sign" }, { status: 403 });
  } catch (e) {
    console.log(e.message);
  }
}
