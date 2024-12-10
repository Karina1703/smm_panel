import User from "@models/user";
import { getCurrencyRate } from "@lib/getCurrencyRate";
import { checkUserReferrer } from "@lib/checkUserReferrer";

export async function creditUserBalance(payment) {
  await payment.updateOne({
    $set: {
      status: 1,
    },
  });

  const user = await User.findOne({ email: payment.email });
  const usdToRub = await getCurrencyRate("USD");
  const newBalance = payment.amount * usdToRub + user.balance;
  await user.updateOne({
    $set: {
      balance: newBalance,
    },
  });
  // Check if user has referrer
  await checkUserReferrer(user, payment);
}
