"use client";

import { getCookie } from "cookies-next";
import loading from "@app/[locale]/dashboard/loading";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import AnimatedStickerSearch from "@public/assets/lottie/search.json";
import Meta from "@components/Meta";
import dynamic from "next/dynamic";
import { formatCurrency } from "@lib/formatPrice";
import PaginationControls from "@components/PaginationControls";
import { cn } from "@lib/cn";

const Lottie = dynamic(() => import("lottie-react"));

const OrdersClient = ({ email, orders, currency, currencyRate, totalPages, start, end }) => {
  const t = useTranslations("OrdersPage");
  const locale = useLocale();

  if (orders.length <= 0) {
    return (
      <>
        <Meta title={t("Orders")} />
        <div className={"bg-white dark:bg-gray-900 min-h-full"}>
          <div className="flex flex-1 flex-col md:pl-64">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{t("Orders")}</h1>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">{t("Description")}</p>
                </div>
              </div>
              <div className="mt-8 pb-32 pt-24 text-center bg-gray-200 dark:bg-gray-950/50 shadow ring-1 ring-black ring-opacity-5 mx-0 rounded-lg">
                <Lottie animationData={AnimatedStickerSearch} className="mx-auto h-32 w-32" />
                <h3 className="mt-8 text-sm font-medium text-gray-900 dark:text-white">{t("No orders")}</h3>
                <p className="mt-1 text-sm text-gray-500">{t("Get started by placing a new order")}.</p>
                <div className="mt-6">
                  <Link
                    href={"/"}
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    {t("New Order")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Meta title={t("Orders")} />
      <div className={"bg-white dark:bg-gray-900 min-h-full"}>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{t("Orders")}</h1>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">{t("Description")}</p>
              </div>
            </div>
            <div className=" mt-8 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 mx-0 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-950/50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:pl-6"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:table-cell"
                    >
                      {t("Price")}
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white lg:table-cell"
                    >
                      {t("Link")}
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white lg:table-cell"
                    >
                      {t("Service")}
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:table-cell"
                    >
                      {t("Progress")}
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white lg:table-cell"
                    >
                      {t("Date")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-950/50 dark:divide-gray-800">
                  {orders.map((order) => {
                    const dateString = order.createdAt;
                    const date = new Date(dateString);
                    const formattedDate = date.toLocaleDateString(
                      locale === "en" ? "en-US" : locale === "uk" ? "ru-RU" : "ru-RU",
                      {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      }
                    );
                    const formattedTime = date.toLocaleTimeString(
                      locale === "en" ? "en-US" : locale === "uk" ? "ru-RU" : "ru-RU",
                      {
                        hour: "numeric",
                        minute: "numeric",
                      }
                    );
                    const formattedDateTime = `${formattedDate} ${formattedTime}`;
                    return (
                      <tr key={order.orderId}>
                        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:w-auto sm:max-w-none sm:pl-6">
                          <span
                            className={cn(
                              order.status === "Не оплачен" ? "text-red-400" : "text-green-400",
                              "px-1.5 py-1 bg-gray-800 rounded-xl mr-2 font-light text-xs min-w-fit"
                            )}
                          >
                            {order.orderId}
                          </span>
                          <dl className="font-normal lg:hidden">
                            <dd className="mt-1 truncate text-gray-700 dark:text-white">
                              <div className={"flex flex-row items-center"}>
                                <span
                                  className={"break-words whitespace-pre-wrap font-light line-clamp-2 max-w-[265px]"}
                                >
                                  {order.name}
                                </span>
                              </div>
                            </dd>
                            <dd className="mt-1 max-w-xs truncate text-indigo-600 dark:text-indigo-400 lg:hidden">
                              <Link href={`https://anon.ws/?to=${order.link}`}>{order.link}</Link>
                            </dd>
                            <dd className="mt-1 truncate text-gray-500 sm:hidden">
                              <div className={"flex flex-col"}>
                                <span className={"text-gray-400 max-w-fit"}>
                                  {order.status === "В ожидании" ? (
                                    <p className={"text-indigo-500 dark:text-indigo-400"}>{t("status.Pending")}</p>
                                  ) : order.status === "Выполняется" ? (
                                    <p className={"text-lime-500 dark:text-lime-400"}>{t("status.In progress")}</p>
                                  ) : order.status === "Выполнен" ? (
                                    <p className={"text-green-500 dark:text-green-400"}>{t("status.Completed")}</p>
                                  ) : order.status === "Частично выполнен" ? (
                                    <p className={"text-orange-500 dark:text-orange-400"}>{t("status.Partial")}</p>
                                  ) : order.status === "Обрабатывается" ? (
                                    <p className={"text-cyan-500 dark:text-cyan-400"}>{t("status.Processing")}</p>
                                  ) : order.status === "Отменен" ? (
                                    <p className={"text-red-500 dark:text-red-400"}>{t("status.Canceled")}</p>
                                  ) : order.status === "Не оплачен" ? (
                                    <p className={"text-teal-500 dark:text-teal-400"}>{t("status.Unpaid")}</p>
                                  ) : (
                                    <p className={"text-indigo-500 dark:text-indigo-400"}>{t("status.Pending")}</p>
                                  )}
                                </span>
                                <span className={"px-1.5 mt-1 bg-gray-800 rounded-xl text-gray-400 max-w-fit"}>
                                  {`${order.quantity - order.remains} / ${order.quantity}`}
                                </span>
                              </div>
                            </dd>
                            <dd className="mt-1 truncate sm:hidden">
                              {formatCurrency(currency, order.price, currencyRate)}
                            </dd>
                            <dd className="mt-1 truncate sm:hidden">{formattedDateTime}</dd>
                          </dl>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 dark:text-white sm:table-cell">
                          {formatCurrency(currency, order.price, currencyRate)}
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-indigo-600 dark:text-indigo-400 lg:table-cell break-all max-w-xs truncate">
                          <Link href={`https://anon.ws/?to=${order.link}`}>{order.link}</Link>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 dark:text-white lg:table-cell">
                          <div className={"flex flex-row items-center"}>
                            <span className={"px-1.5 bg-gray-800 rounded-xl mr-2 text-gray-400 text-xs min-w-fit"}>
                              {order.serviceId}
                            </span>
                            <span className={"break-words whitespace-pre-wrap font-light line-clamp-2 max-w-[265px]"}>
                              {order.name}
                            </span>
                          </div>{" "}
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 dark:text-white sm:table-cell">
                          <div className={"flex flex-col max-w-fit items-center justify-center justify-items-center"}>
                            <span className={"text-gray-400 text-xs max-w-fit"}>
                              {order.status === "В ожидании" ? (
                                <p className={"text-indigo-500 dark:text-indigo-400"}>{t("status.Pending")}</p>
                              ) : order.status === "Выполняется" ? (
                                <p className={"text-lime-500 dark:text-lime-400"}>{t("status.In progress")}</p>
                              ) : order.status === "Выполнен" ? (
                                <p className={"text-green-500 dark:text-green-400"}>{t("status.Completed")}</p>
                              ) : order.status === "Частично выполнен" ? (
                                <p className={"text-orange-500 dark:text-orange-400"}>{t("status.Partial")}</p>
                              ) : order.status === "Обрабатывается" ? (
                                <p className={"text-cyan-500 dark:text-cyan-400"}>{t("status.Processing")}</p>
                              ) : order.status === "Отменен" ? (
                                <p className={"text-red-500 dark:text-red-400"}>{t("status.Canceled")}</p>
                              ) : order.status === "Не оплачен" ? (
                                <p className={"text-teal-500 dark:text-teal-400"}>{t("status.Unpaid")}</p>
                              ) : (
                                <p className={"text-indigo-500 dark:text-indigo-400"}>{t("status.Pending")}</p>
                              )}
                            </span>
                            <span className={"px-1.5 mt-1 bg-gray-800 rounded-xl text-gray-400 text-xs max-w-fit"}>
                              {`${order.quantity - order.remains} / ${order.quantity}`}
                            </span>
                          </div>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 dark:text-white lg:table-cell">
                          {formattedDateTime}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <PaginationControls
                totalItems={orders.length}
                totalPages={totalPages}
                hasNextPage={end < orders.length}
                hasPrevPage={start > 0}
                start={start + 1}
                end={orders.length < end ? orders.length : end}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersClient;
