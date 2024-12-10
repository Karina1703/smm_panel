import AdminDashboardClient from "@app/[locale]/admin/dashboard/AdminDashboardClient";
import { getUsers } from "@lib/admin/getUsers";
import { getOrders } from "@lib/admin/getOrders";
import { getPayments } from "@lib/admin/getPayments";
import { getCurrencyRate } from "@lib/getCurrencyRate";
import { cookies } from "next/headers";

const AdminDashboardPage = async () => {
  const cookieStore = cookies();
  const currencyCookie = cookieStore.get("user_currency");
  const currency = currencyCookie?.value || process.env.NEXT_PUBLIC_DEFAULT_CURRENCY;
  const currencyRate = await getCurrencyRate(currency);

  const users = await getUsers();
  const orders = await getOrders("paid");
  const payments = await getPayments("paid");

  return (
    <>
      <AdminDashboardClient
        users={users}
        orders={orders}
        payments={payments}
        currencyRate={currencyRate}
        currency={currency}
      />
    </>
  );
};

export default AdminDashboardPage;
