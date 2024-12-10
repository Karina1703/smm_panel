import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import Affiliates from "@models/affiliates";
import Payouts from "@models/payouts";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function POST(request) {
  const req = await request.json();
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      await dbConnect();
      const affiliate = await Affiliates.findOne({ email: req.email });
      await affiliate.updateOne(
        { $inc: { balance: -req.amount } },
        { new: true }
      );

      const newPayoutId = (await Payouts.countDocuments()) + 1;

      // Add payment to MongoDB - payments collection
      await Payouts.create({
        payoutId: newPayoutId,
        amount: req.amount,
        email: req.email,
        status: 0,
        payoutMethod: req.payoutMethod,
        wallet: req.wallet,
      });

      return NextResponse.json({ status: "success" }, { status: 200 });
    } catch (e) {
      console.log("Affiliate Payout Request Error: " + e.message);
    }
  } else {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }
}
