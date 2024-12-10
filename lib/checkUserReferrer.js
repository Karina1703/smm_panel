import Affiliates from "@models/affiliates";

export async function checkUserReferrer(user, payment) {
  const referrerEmail = user.referrer;
  if (referrerEmail) {
    const referrer = await Affiliates.findOne({ email: referrerEmail });
    const affiliatePercent =
      user.affiliate_bonus > 0 ? user.affiliate_bonus : 15;

    await referrer.updateOne({
      $inc: {
        earned: payment.amount * (affiliatePercent / 100),
        balance: payment.amount * (affiliatePercent / 100),
      },
    });

    await user.updateOne({
      $set: {
        referrer_earned:
          user.referrer_earned + payment.amount * (affiliatePercent / 100),
      },
    });
  }
}
