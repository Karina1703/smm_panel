import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import Affiliates from "@models/affiliates";
import User from "@models/user";
import Payouts from "@models/payouts";

export async function POST(request) {
  const req = await request.json();

  try {
    await dbConnect();
    const affiliate = await Affiliates.findOne({ email: req.email });
    const referrals = await User.find(
      { referrer: req.email },
      { email: 1, referrer_earned: 1, createdAt: 1 }
    );
    const payouts = await Payouts.find({ email: req.email });
    const encryptedReferrals = referrals.map((referral) => {
      const { email, createdAt, referrer_earned, ...rest } = referral;
      const [username, domain] = email.split("@");
      const encryptedEmail = `${username.substring(0, 2)}***@${domain}`;

      return { email: encryptedEmail, createdAt, referrer_earned };
    });

    return NextResponse.json({
      data: affiliate,
      referrals: encryptedReferrals,
      payouts: payouts,
    });
  } catch (e) {
    console.log(e.message);
  }
}
