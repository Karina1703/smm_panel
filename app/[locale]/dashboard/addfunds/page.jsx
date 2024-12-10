import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AddFundsClient from "@app/[locale]/dashboard/addfunds/AddFundsClient";
import {cookies} from "@node_modules/next/headers";
import {getCurrencyRate} from "@lib/getCurrencyRate";

const AddFundsPage = async () => {
  const cookieStore = cookies();
  const currencyCookie = cookieStore.get("user_currency");
  const currency = currencyCookie?.value || process.env.NEXT_PUBLIC_DEFAULT_CURRENCY;
  const currencyRate = await getCurrencyRate(currency);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user.email;

  if (!session) {
    redirect("/signin?callbackUrl=/dashboard/addfunds");
  }

  return (
    <>
      <AddFundsClient email={userEmail} currency={currency} currencyRate={currencyRate} />
    </>
  );
};

export default AddFundsPage;
