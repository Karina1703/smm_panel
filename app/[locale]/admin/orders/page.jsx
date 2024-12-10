import { getCurrencyRate } from "@lib/getCurrencyRate";
import Link from "next/link";
import { formattedDateTime } from "@lib/formattedDateTime";
import PaginationControls from "@components/PaginationControls";
import { getOrders } from "@lib/admin/getOrders";
import { formatCurrency } from "@lib/formatPrice";
import { cn } from "@lib/cn";
import { cookies } from "@node_modules/next/headers";

const AdminOrdersPage = async ({ searchParams }) => {
  const cookieStore = cookies();
  const currencyCookie = cookieStore.get("user_currency");
  const currency = currencyCookie?.value || process.env.NEXT_PUBLIC_DEFAULT_CURRENCY;

  const page = searchParams["page"] ?? "1";
  const perPage = searchParams["perPage"] ?? "25";

  const start = (Number(page) - 1) * Number(perPage); // 0, 5, 10 ...
  const end = start + Number(perPage); // 5, 10, 15 ...

  const ordersData = await getOrders(perPage, page);
  const totalPages = Math.ceil(ordersData.itemCount / perPage);

  const currencyRate = await getCurrencyRate(currency);

  return (
    <div className={"min-h-full h-full"}>
      <div className={"bg-white dark:bg-gray-900 min-h-full"}>
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-8">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Orders</h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <hr className={"my-4 h-px border-t-0 bg-gray-300 dark:bg-gray-800 opacity-100"} />
                {/* ORDERS TABLE START */}
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-800 overflow-auto">
                          <thead className="bg-gray-50 dark:bg-gray-950/50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white sm:pl-6"
                              >
                                <span className="group inline-flex">ID</span>
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                <span className="group inline-flex">Price</span>
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                <span className="group inline-flex">Link</span>
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                <span className="group inline-flex">Service</span>
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                <span className="group inline-flex">Progress</span>
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                <span className="group inline-flex">Created</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-950/50 dark:divide-gray-800">
                            {ordersData.items.map((order) => (
                              <tr key={order.orderId}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                                  <span
                                    className={cn(
                                      order.status === "Не оплачен" ? "text-red-400" : "text-green-400",
                                      "px-1.5 py-1 bg-gray-800 rounded-xl mr-2 font-light text-xs min-w-fit"
                                    )}
                                  >
                                    {order.orderId}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-light dark:text-white">
                                  {formatCurrency(currency, order.price, currencyRate)}
                                </td>
                                <td className="px-3 py-4 text-sm text-indigo-600 dark:text-indigo-400 break-all whitespace-pre-wrap">
                                  <Link target={"_blank"} href={`https://anon.ws/?to=${order.link}`}>
                                    {order.link}
                                  </Link>
                                  <div className={"text-white"}>{order.userEmail}</div>
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  <div className={"flex flex-row items-center"}>
                                    <span
                                      className={"px-1.5 bg-gray-800 rounded-xl mr-2 text-gray-400 text-xs min-w-fit"}
                                    >
                                      {order.serviceId}
                                    </span>
                                    <span
                                      className={
                                        "break-words whitespace-pre-wrap font-light line-clamp-2 max-w-[265px]"
                                      }
                                    >
                                      {order.name}
                                    </span>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  <div className={"flex flex-col items-center justify-center justify-items-center"}>
                                    <span className={"text-gray-400 text-xs max-w-fit"}>
                                      {order.status === "В ожидании" ? (
                                        <p className={"text-indigo-500 dark:text-indigo-400"}>Pending</p>
                                      ) : order.status === "Выполняется" ? (
                                        <p className={"text-lime-500 dark:text-lime-400"}>In progress</p>
                                      ) : order.status === "Выполнен" ? (
                                        <p className={"text-green-500 dark:text-green-400"}>Completed</p>
                                      ) : order.status === "Частично выполнен" ? (
                                        <p className={"text-orange-500 dark:text-orange-400"}>Partial</p>
                                      ) : order.status === "Обрабатывается" ? (
                                        <p className={"text-cyan-500 dark:text-cyan-400"}>Processing</p>
                                      ) : order.status === "Отменен" ? (
                                        <p className={"text-red-500 dark:text-red-400"}>Canceled</p>
                                      ) : order.status === "Не оплачен" ? (
                                        <p className={"text-red-500 dark:text-red-400"}>Unpaid</p>
                                      ) : (
                                        <p className={"text-indigo-500 dark:text-indigo-400"}>Processing</p>
                                      )}
                                    </span>
                                    <span
                                      className={"px-1.5 mt-1 bg-gray-800 rounded-xl text-gray-400 text-xs max-w-fit"}
                                    >
                                      {`${order.quantity - order.remains} / ${order.quantity}`}
                                    </span>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  {formattedDateTime(order.createdAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <PaginationControls
                          totalItems={ordersData.itemCount}
                          totalPages={totalPages}
                          hasNextPage={end < ordersData.itemCount}
                          hasPrevPage={start > 0}
                          start={start + 1}
                          end={ordersData.itemCount < end ? ordersData.itemCount : end}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* ORDERS TABLE END */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
