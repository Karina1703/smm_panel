"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Head from "next/head";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { CheckIcon } from "@heroicons/react/24/outline";
import Meta from "@components/Meta";

const Discounts = () => {
  const t = useTranslations("Discounts");

  const tiers = [
    {
      id: "tier-level-1",
      name: t("Regular"),
      href: "#",
      priceMonthly: "0",
      description: t("Perfect for newcomers or testing services"),
      features: [t("Discount 1")],
    },
    {
      id: "tier-premium",
      name: t("Premium"),
      href: "#",
      priceMonthly: "3,500",
      description: t("Suitable for personal use and regular channels"),
      features: [t("Discount 6"), t("Extra Bonus 3")],
    },
    {
      id: "tier-boost",
      name: t("Boost"),
      href: "#",
      priceMonthly: "10,000",
      description: t("Ideal for digital marketers and big channel owners"),
      features: [t("Discount 10"), t("Extra Bonus 8")],
    },
    {
      id: "tier-elite",
      name: t("Elite"),
      href: "#",
      priceMonthly: "30,000",
      description: t("Honorary level for big spenders"),
      features: [t("Discount 15"), t("Extra Bonus 12")],
    },
  ];

  return (
    <>
      <Meta
        title={t("Seo.title")}
        description={t("Seo.description")}
        siteName={t("Seo.siteName")}
        url={t("Seo.url")}
      />
      <Navbar />

      {/* Discount Plan Tiers */}

      <div className="bg-gray-900">
        <div className="relative overflow-hidden pt-64 pb-96 lg:pt-64">
          <div>
            <img
              className="absolute bottom-0 left-1/2 w-[1440px] max-w-none -translate-x-1/2"
              src="https://tailwindui.com/img/component-images/grid-blur-purple-on-black.jpg"
              alt=""
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
              <h2 className="text-lg font-semibold leading-8 text-indigo-400">
                {t("Save up More")}
              </h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-white">
                {t("Accumulative Discount System")}
              </p>
              <p className="mt-6 text-lg leading-8 text-white/60">
                {t("We are pleased to offer our clients")}
              </p>
            </div>
          </div>
        </div>
        <div className="flow-root bg-white dark:bg-gray-900 pb-32 lg:pb-40">
          <div className="relative -mt-80">
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-7xl lg:grid-cols-4 lg:gap-8">
                {tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className="flex flex-col rounded-3xl bg-white dark:bg-gray-800 shadow-xl ring-1 dark:ring-0 ring-black/10"
                  >
                    <div className="p-8 sm:p-10">
                      <h3
                        className="text-xl font-semibold leading-8 tracking-tight text-indigo-600 dark:text-indigo-300"
                        id={tier.id}
                      >
                        {tier.name}
                      </h3>
                      <div
                        className={
                          "text-lg font-semibold leading-8 tracking-normal text-gray-500 dark:text-gray-200"
                        }
                      >
                        {t("Spent from")}
                      </div>
                      <div className="flex items-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        ${tier.priceMonthly}
                      </div>
                      <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                        {tier.description}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col p-2">
                      <div className="flex flex-1 flex-col justify-between rounded-2xl bg-gray-50 dark:bg-gray-900 p-6 sm:p-8">
                        <ul role="list" className="space-y-6">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <div className="flex-shrink-0">
                                <CheckIcon
                                  className="h-6 w-6 text-indigo-600 dark:text-indigo-300"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="ml-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                {feature}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative mx-auto mt-8 max-w-7xl px-6 pt-16 lg:px-8">
            <div className="mx-auto max-w-md lg:max-w-4xl">
              <div className="flex flex-col gap-6 rounded-3xl p-8 ring-1 dark:ring-0 ring-gray-900/10 dark:bg-gray-800 sm:p-10 lg:flex-row lg:items-center lg:gap-8">
                <div className="lg:min-w-0 lg:flex-1">
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600 dark:text-indigo-300">
                    {t("Switch to new tariff")}
                  </h3>
                  <div className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                    {t("As soon as you switch to a new tariff")}
                  </div>
                </div>
                <div>
                  <Link
                    href={"/signin"}
                    className="inline-block rounded-lg bg-indigo-50 dark:bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold leading-5 text-indigo-700 dark:text-indigo-50 hover:bg-indigo-100 dark:hover:bg-indigo-500"
                  >
                    {t("Get Discount")} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Discounts;
