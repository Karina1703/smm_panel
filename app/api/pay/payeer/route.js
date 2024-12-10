import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import Payments from "@models/payments";
import { sha256 } from "@lib/sha256";
import { creditUserBalance } from "@lib/creditUserBalance";
import { processQuickOrder } from "@lib/processQuickOrder";

export async function POST(request) {
  // const contentType = request.headers.get("content-type");
  // console.log(contentType); // application/x-www-form-urlencoded
  console.log("================== PAYEER POSTBACK START ==================");

  const formData = await request.formData();
  const req = Object.fromEntries(formData.entries());
  // console.log("REQ LOG---");
  // console.log(req);

  const {
    m_operation_id,
    m_operation_ps,
    m_operation_date,
    m_operation_pay_date,
    m_shop,
    m_orderid,
    m_amount,
    m_curr,
    m_desc,
    m_status,
    m_params,
    m_sign,
  } = req;

  const hashArray = [
    m_operation_id,
    m_operation_ps,
    m_operation_date,
    m_operation_pay_date,
    m_shop,
    m_orderid,
    m_amount,
    m_curr,
    m_desc,
    m_status,
  ];

  if (m_params) {
    hashArray.push(m_params);
  }

  hashArray.push(process.env.PAYEER_SECRET);

  const signHash = sha256(hashArray);

  // console.log("PAYEER POSTBACK SIGN " + m_sign);
  // console.log("PAYEER GENERATED SIGN " + signHash);
  // console.log("PAYEER PAYMENT STATUS " + m_status);

  try {
    await dbConnect();

    const payment = await Payments.findOne({ paymentId: m_orderid });

    if (m_sign === signHash && m_status === "success" && payment.status === 0 && payment.type === "Add Funds") {
      console.log("====== NEW BALANCE TOP UP ======");
      console.log(req);

      await creditUserBalance(payment);

      console.log("================== PAYEER POSTBACK END ==================");
      return NextResponse.json(`${m_orderid}|success`, { status: 200 });
    }

    if (m_sign === signHash && m_status === "success" && payment.status === 0 && payment.type !== "Add Funds") {
      console.log("====== NEW [ONE-TIME] ORDER ======");
      console.log(req);

      await processQuickOrder(payment);

      console.log("================== PAYEER POSTBACK END ==================");
      return NextResponse.json(`${m_orderid}|success`, { status: 200 });
    }

    return NextResponse.json(`${m_orderid}|error`, { status: 200 });
  } catch (e) {
    console.log(e.message);
  }
}
