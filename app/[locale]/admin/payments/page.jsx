import { getPayments } from "@lib/admin/getPayments";
import { formattedDateTime } from "@lib/formattedDateTime";
import PaginationControls from "@components/PaginationControls";
import { formatCurrency } from "@lib/formatPrice";
import { cookies } from "next/headers";
import { getCurrencyRate } from "@lib/getCurrencyRate";

const AdminPaymentsPage = async ({ searchParams }) => {
  const cookieStore = cookies();
  const currencyCookie = cookieStore.get("user_currency");
  const currency = currencyCookie?.value || process.env.NEXT_PUBLIC_DEFAULT_CURRENCY;
  const currencyRate = await getCurrencyRate(currency);

  const page = searchParams["page"] ?? "1";
  const perPage = searchParams["perPage"] ?? "25";

  const start = (Number(page) - 1) * Number(perPage); // 0, 5, 10 ...
  const end = start + Number(perPage); // 5, 10, 15 ...

  const paymentsData = await getPayments(perPage, page);
  const totalPages = Math.ceil(paymentsData.itemCount / perPage);

  return (
    <div className={"min-h-full h-full"}>
      <div className={"bg-white dark:bg-gray-900 min-h-full"}>
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-8">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Payments</h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <hr className={"my-4 h-px border-t-0 bg-gray-300 dark:bg-gray-800 opacity-100"} />
                {/* PAYMENTS TABLE START */}
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-800">
                          <thead className="bg-gray-50 dark:bg-gray-950/50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white sm:pl-6"
                              >
                                <span className="group inline-flex">Payment</span>
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                <span className="group inline-flex">Email</span>
                              </th>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                <span className="group inline-flex">Order ID</span>
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                <span className="group inline-flex">Gateway</span>
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                <span className="group inline-flex">Amount</span>
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                <span className="group inline-flex">Status</span>
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                <span className="group inline-flex">Date</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-950/50 dark:divide-gray-800">
                            {paymentsData.items.map((payment) => (
                              <tr key={payment.paymentId}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                                  <span
                                    className={
                                      "px-1.5 py-1 bg-gray-800 rounded-xl mr-2 text-gray-400 text-xs min-w-fit"
                                    }
                                  >
                                    {payment.paymentId}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-indigo-600 dark:text-indigo-400">
                                  {payment.email}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  <span
                                    className={
                                      "px-1.5 py-1 bg-gray-800 rounded-xl mr-2 text-gray-400 text-xs min-w-fit"
                                    }
                                  >
                                    {payment.orderId}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  {payment.gateway}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  {formatCurrency("USD", payment.amount, 1)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  {payment.status === 0 ? (
                                    <p className={"text-red-500 dark:text-red-400"}>Unpaid</p>
                                  ) : (
                                    <p className={"text-green-500 dark:text-green-400"}>Paid</p>
                                  )}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  {formattedDateTime(payment.createdAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <PaginationControls
                          totalItems={paymentsData.itemCount}
                          totalPages={totalPages}
                          hasNextPage={end < paymentsData.itemCount}
                          hasPrevPage={start > 0}
                          start={start + 1}
                          end={paymentsData.itemCount < end ? paymentsData.itemCount : end}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* PAYMENTS TABLE END */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentsPage;
