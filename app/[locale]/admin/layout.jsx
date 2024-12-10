// TODO: Enable this variable on production
// export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrencyRate } from "@lib/getCurrencyRate";
import Sidebar from "@components/dashboard/Sidebar";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user.email;

  const cookieStore = cookies();
  const currencyCookie = cookieStore.get("user_currency");
  const currency = currencyCookie?.value || process.env.NEXT_PUBLIC_DEFAULT_CURRENCY;
  const currencyRate = await getCurrencyRate(currency);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <>
      <Sidebar userEmail={userEmail} currency={currency} currencyRate={currencyRate} isAdminSidebar={true} />
      {children}
    </>
  );
}
