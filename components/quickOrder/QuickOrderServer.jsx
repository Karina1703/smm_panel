import QuickOrderClient from "@components/quickOrder/QuickOrderClient";
import { fetchAllServices } from "@lib/fetchAllServices";
import { getCurrencyRate } from "@lib/getCurrencyRate";
import { cookies } from "next/headers";

const QuickOrderServer = async () => {
  const services = await fetchAllServices();
  const cookieStore = cookies();
  const currencyCookie = cookieStore.get("user_currency");
  const currency = currencyCookie?.value || process.env.NEXT_PUBLIC_DEFAULT_CURRENCY;
  const currencyRate = await getCurrencyRate(currency);

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <QuickOrderClient allServices={services.data} currencyRate={currencyRate} currency={currency} />
      </div>
    </div>
  );
};

export default QuickOrderServer;
