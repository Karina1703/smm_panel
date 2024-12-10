"use client";

import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { ArchiveBoxIcon, BanknotesIcon, UsersIcon } from "@heroicons/react/24/outline";
import { cn } from "@lib/cn";
import { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@lib/formatPrice";

function filterDataAndSum(data, selectedInterval, type, currencyRate) {
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.createdAt);

    switch (selectedInterval) {
      case "today":
        return itemDate >= today;
      case "yesterday":
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);
        return itemDate >= yesterday && itemDate < today;
      case "7days":
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);
        return itemDate >= sevenDaysAgo;
      case "14days":
        const twoWeeksAgo = new Date(now);
        twoWeeksAgo.setDate(now.getDate() - 14);
        twoWeeksAgo.setHours(0, 0, 0, 0);
        return itemDate >= twoWeeksAgo;
      case "30days":
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);
        thirtyDaysAgo.setHours(0, 0, 0, 0);
        return itemDate >= thirtyDaysAgo;
      case "90days":
        const ninetyDaysAgo = new Date(now);
        ninetyDaysAgo.setDate(now.getDate() - 90);
        ninetyDaysAgo.setHours(0, 0, 0, 0);
        return itemDate >= ninetyDaysAgo;
      case "180days":
        const halfYearAgo = new Date(now);
        halfYearAgo.setDate(now.getDate() - 180);
        halfYearAgo.setHours(0, 0, 0, 0);
        return itemDate >= halfYearAgo;
      case "365days":
        const oneYearAgo = new Date(now);
        oneYearAgo.setDate(now.getDate() - 365);
        oneYearAgo.setHours(0, 0, 0, 0);
        return itemDate >= oneYearAgo;
      default:
        return true; // Весь период или другие значения
    }
  });

  // Сортировка по дате создания (createdAt)
  filteredData.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (type === "count") {
    // Возвращаем количество отфильтрованных элементов
    return filteredData.length;
  } else if (type === "sum") {
    // Вычисляем сумму платежей
    const sum = filteredData.reduce((total, item) => {
      return total + (item.amount || 0);
    }, 0);

    return sum.toFixed(2);
  } else if (type === "balance") {
    const totalBalance = filteredData.reduce((total, item) => {
      return total + (item.balance / currencyRate || 0);
    }, 0);

    return totalBalance.toFixed(2);
  } else if (type === "ARPPU") {
    const totalRevenue = filteredData.reduce((total, item) => total + (item.amount || 0), 0);
    const payingUserCount = new Set(filteredData.map((item) => item.email)).size;

    if (payingUserCount === 0) {
      return 0;
    }
    return (totalRevenue / payingUserCount).toFixed(2);
  }
}

const AdminDashboardClient = ({ users, orders, payments, currencyRate, currency }) => {
  const [selectedInterval, setSelectedInterval] = useState("today"); // Изначально выбран "Сегодня"
  const userCount = filterDataAndSum(users, selectedInterval, "count");
  const orderCount = filterDataAndSum(orders, selectedInterval, "count");
  const paymentSum = filterDataAndSum(payments, selectedInterval, "sum");
  const averageRevenue = paymentSum / userCount;
  const averagePayingUserRevenue = filterDataAndSum(payments, selectedInterval, "ARPPU");
  const userBalance = filterDataAndSum(users, selectedInterval, "balance", currencyRate);

  const stats = [
    {
      id: 1,
      name: "Users",
      stat: userCount,
      icon: UsersIcon,
      change: "122",
      changeType: "increase",
      href: "/admin/users",
    },
    {
      id: 2,
      name: "Orders",
      stat: orderCount,
      icon: ArchiveBoxIcon,
      change: "5.4%",
      changeType: "increase",
      href: "/admin/orders",
    },
    {
      id: 3,
      name: "Total revenue",
      stat: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(paymentSum),
      icon: BanknotesIcon,
      change: "3.2%",
      changeType: "decrease",
      href: "/admin/payments",
    },
    {
      id: 4,
      name: "ARPU",
      stat: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(averageRevenue),
      icon: BanknotesIcon,
      change: "3.2%",
      changeType: "decrease",
    },
    {
      id: 5,
      name: "ARPPU",
      stat: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(averagePayingUserRevenue),
      icon: BanknotesIcon,
      change: "3.2%",
      changeType: "decrease",
    },
    {
      id: 6,
      name: "User wallets",
      stat: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(userBalance),
      icon: BanknotesIcon,
      change: "3.2%",
      changeType: "decrease",
    },
  ];

  return (
    <div className={"min-h-full h-full"}>
      <div className={"bg-white dark:bg-gray-900 min-h-full"}>
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-8">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <hr className={"my-4 h-px border-t-0 bg-gray-300 dark:bg-gray-800 opacity-100"} />
                <div name="smmstats-website" className={"pb-4"}>
                  <div className={"flex flex-row items-center justify-between"}>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Website statistics</h3>

                    {/* Выбор интервала */}
                    <div className="w-56 order-last">
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <select
                          className="block appearance-none w-full py-2 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md leading-tight focus:outline-none"
                          value={selectedInterval}
                          onChange={(event) => setSelectedInterval(event.target.value)}
                        >
                          <option value="all">All time</option>
                          <option value="today">Today</option>
                          <option value="yesterday">Yesterday</option>
                          <option value="7days">Last 7 days</option>
                          <option value="14days">Last 14 days</option>
                          <option value="30days">Last 30 days</option>
                          <option value="90days">Last 90 days</option>
                          <option value="180days">Last 180 days</option>
                          <option value="365days">Last 365 days</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          item.href ? "pb-12" : "pb-0",
                          "relative overflow-hidden rounded-lg bg-white dark:bg-gray-950/50 px-4 pt-5 shadow sm:px-6 sm:pt-6"
                        )}
                      >
                        <dt>
                          <div className="absolute rounded-md bg-indigo-500 dark:bg-indigo-600 p-3">
                            <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                          <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-white">
                            {item.name}
                          </p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{item.stat}</p>
                          {/*<p*/}
                          {/*  className={cn(*/}
                          {/*    item.changeType === "increase"*/}
                          {/*      ? "text-green-600"*/}
                          {/*      : "text-red-600",*/}
                          {/*    "ml-2 flex items-baseline text-sm font-semibold"*/}
                          {/*  )}*/}
                          {/*>*/}
                          {/*  {item.changeType === "increase" ? (*/}
                          {/*    <ArrowUpIcon*/}
                          {/*      className="h-5 w-5 flex-shrink-0 self-center text-green-500"*/}
                          {/*      aria-hidden="true"*/}
                          {/*    />*/}
                          {/*  ) : (*/}
                          {/*    <ArrowDownIcon*/}
                          {/*      className="h-5 w-5 flex-shrink-0 self-center text-red-500"*/}
                          {/*      aria-hidden="true"*/}
                          {/*    />*/}
                          {/*  )}*/}

                          {/*  <span className="sr-only">*/}
                          {/*    {" "}*/}
                          {/*    {item.changeType === "increase"*/}
                          {/*      ? "Increased"*/}
                          {/*      : "Decreased"}{" "}*/}
                          {/*    by{" "}*/}
                          {/*  </span>*/}
                          {/*  {item.change}*/}
                          {/*</p>*/}
                          {item.href ? (
                            <div className="absolute inset-x-0 bottom-0 bg-gray-50 dark:bg-gray-950/30 px-4 py-4 sm:px-6">
                              <div className="text-sm">
                                <Link href={item.href} className="font-medium text-indigo-600 hover:text-indigo-500">
                                  {" "}
                                  Посмотреть все
                                  <span className="sr-only"> {item.name} stats</span>
                                </Link>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardClient;
