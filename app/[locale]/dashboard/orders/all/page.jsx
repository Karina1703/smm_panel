import { redirect } from "next/navigation";
import OrdersClient from "@app/[locale]/dashboard/orders/OrdersClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getOrders } from "@lib/admin/getOrders";
import { getCurrencyRate } from "@lib/getCurrencyRate";
import { cookies } from "next/headers";

const AllOrders = async ({ searchParams }) => {
  const cookieStore = cookies();
  const currencyCookie = cookieStore.get("user_currency");
  const currency = currencyCookie?.value || process.env.NEXT_PUBLIC_DEFAULT_CURRENCY;
  const currencyRate = await getCurrencyRate(currency);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user.email;

  const page = searchParams["page"] ?? "1";
  const perPage = searchParams["perPage"] ?? "25";

  const start = (Number(page) - 1) * Number(perPage); // 0, 5, 10 ...
  const end = start + Number(perPage); // 5, 10, 15 ...

  const ordersData = await getOrders(perPage, page, userEmail);
  const totalPages = Math.ceil(ordersData.itemCount / perPage);

  if (!session) {
    redirect("/signin?callbackUrl=/dashboard/orders/all");
  }

  return (
    <>
      <OrdersClient
        email={userEmail}
        orders={ordersData.items}
        currency={currency}
        currencyRate={currencyRate}
        totalPages={totalPages}
        start={start}
        end={end}
      />
    </>
  );
};

export default AllOrders;
