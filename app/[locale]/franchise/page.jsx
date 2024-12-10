"use client";

import { useTranslations } from "next-intl";
import Head from "next/head";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Link from "next/link";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon, ChatBubbleLeftRightIcon, CurrencyDollarIcon } from "@heroicons/react/20/solid";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { cn } from "@lib/cn";
import Meta from "@components/Meta";

const Franchise = () => {
  const t = useTranslations("Franchise");

  const features = [
    {
      name: t("Highly Profitable Business"),
      description: t("Partnering with us means you'll"),
      icon: BanknotesIcon,
    },
    {
      name: t("24/7 Live Support"),
      description: t("You don't have to worry about"),
      icon: ChatBubbleLeftRightIcon,
    },
    {
      name: t("Payment Systems"),
      description: t("With multiple payment systems"),
      icon: CurrencyDollarIcon,
    },
  ];
  const tiers = [
    {
      name: t("Hobby"),
      href: "/signin",
      priceMonthly: 49,
      description: t("Perfect for those who are just starting their business"),
      includedFeatures: [
        t("Service setup and installation on hosting"),
        t("Customization and improvements for an additional fee"),
        t("Free updates"),
      ],
      excludedFeatures: [
        t("Domain registration"),
        t("Technical support"),
        t("Personal Manager"),
        t("Additional Discounts on All our Services"),
        t("Help with Advertising"),
        t("Free Customization and Improvements"),
        t("Custom WebApp Telegram Bot"),
      ],
      mostPopular: false,
    },
    {
      name: t("Freelancer"),
      href: "/signin",
      priceMonthly: 89,
      description: t("Ideal for those who want to take their business to the next level"),
      includedFeatures: [
        t("Service setup and installation on hosting"),
        t("Customization and improvements for an additional fee"),
        t("Free updates"),
        t("Domain registration"),
        t("Technical support"),
      ],
      excludedFeatures: [
        t("Personal Manager"),
        t("Additional Discounts on All our Services"),
        t("Help with Advertising"),
        t("Free Customization and Improvements"),
        t("Custom WebApp Telegram Bot"),
      ],
      mostPopular: false,
    },
    {
      name: t("Startup"),
      href: "/signin",
      priceMonthly: 199,
      description: t("Designed for those who want a personalized touch in their business"),
      includedFeatures: [
        t("Service setup and installation on hosting"),
        t("Customization and improvements for an additional fee"),
        t("Free updates"),
        t("Domain registration"),
        t("Technical support"),
        t("Personal Manager"),
      ],
      excludedFeatures: [
        t("Additional Discounts on All our Services"),
        t("Help with Advertising"),
        t("Free Customization and Improvements"),
        t("Custom WebApp Telegram Bot"),
      ],
      mostPopular: true,
    },
    {
      name: t("Enterprise"),
      href: "/signin",
      priceMonthly: 499,
      description: t("Package for those who are serious about growing their SMM business"),
      includedFeatures: [
        t("Service setup and installation on hosting"),
        t("Customization and improvements for an additional fee"),
        t("Free updates"),
        t("Domain registration"),
        t("Technical support"),
        t("Personal Manager"),
        t("Additional Discounts on All our Services"),
        t("Help with Advertising"),
        t("Free Customization and Improvements"),
        t("Custom WebApp Telegram Bot"),
      ],
      excludedFeatures: [],
      mostPopular: false,
      // mostProfitable: true,
    },
  ];
  const faqs = [
    {
      question: t("How easy is it to resell SMMSTATS services?"),
      answer: t("You can get an SMM service franchise for any period of time"),
    },
    {
      question: t("How to set prices for services?"),
      answer: t("Prices can be set in two ways"),
    },
    {
      question: t("Can I link my domain?"),
      answer: t("Yes, you can use your own domain"),
    },
    {
      question: t("How will orders be processed?"),
      answer: t("All orders will be processed automatically"),
    },
    {
      question: t("Do I need to pay for hosting?"),
      answer: t("No, you don't need to pay for hosting"),
    },
    {
      question: t("Can I sell my services?"),
      answer: t("You will be able to add your"),
    },
    {
      question: t("Can I set prices not in rubles, but in dollars or euros?"),
      answer: t("Yes, it can be done"),
    },
    {
      question: t("How many orders can I place in my SMM platform?"),
      answer: t("Unlimited quantity The rental price"),
    },
    {
      question: t("Where will the money I earn go to?"),
      answer: t("The money replenished by your clients"),
    },
    {
      question: t("What happens if I forget to renew the panel?"),
      answer: t("For 1 month it will be frozen"),
    },
    {
      question: t("What payment methods can be added to the SMM service?"),
      answer: t("Any that you set in the settings"),
    },
    {
      question: t("Can you customize everything for me?"),
      answer: t("Yes, for an additional fee, we can help"),
    },
  ];

  return (
    <>
      <Meta title={t("Seo.title")} description={t("Seo.description")} siteName={t("Seo.siteName")} url={t("Seo.url")} />
      <Navbar />
      {/* Page Header Title Below */}

      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl pt-40 pb-16 px-6 sm:pb-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300">
              {t("Create Your Own Business")}
            </h2>
            <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              {t("Franchise")}
            </p>
            <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500 dark:text-gray-300">
              {t("If you're interested in starting your")}
            </p>
          </div>
        </div>
      </div>

      {/* Franchise Features */}

      <div className="relative isolate overflow-hidden bg-white dark:bg-gray-900 py-20 px-6 sm:py-24 sm:px-10 lg:py-24 xl:px-24">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0">
          <div className="lg:row-start-2 lg:max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t("Platform to operate")}
              <br />
              {t("your own SMM business")}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t("Great opportunity for entrepreneurs")}
            </p>
          </div>
          <img
            src="/assets/images/franchise-panel.png"
            alt="Product screenshot"
            className="relative -z-20 min-w-full max-w-xl rounded-xl shadow-xl ring-1 ring-white/10 lg:row-span-4 lg:w-[64rem] lg:max-w-none"
            width={2432}
            height={1442}
          />
          <div className="max-w-xl lg:row-start-3 lg:mt-10 lg:max-w-md lg:border-t lg:border-black/10 dark:lg:border-white/10 lg:pt-10">
            <dl className="max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-300 lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt className="ml-9 inline-block font-semibold text-gray-900 dark:text-white">
                    <feature.icon
                      className="absolute top-1 left-1 h-5 w-5 text-indigo-600 dark:text-indigo-300"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <svg
          className="pointer-events-none absolute top-1/2 left-12 -z-10 h-[42.375rem] -translate-y-1/2 transform-gpu blur-3xl lg:top-auto lg:bottom-[-12rem] lg:-translate-y-72"
          viewBox="0 0 1155 678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#c0458c57-1330-459f-9d5c-f0d75c210466)"
            fillOpacity=".25"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="c0458c57-1330-459f-9d5c-f0d75c210466"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0077ff" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Franchise Pricing Plan Tiers */}

      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl py-24 px-6 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-center">
              {t("Pricing Plans")}
            </h1>
            <p className="mt-5 text-xl text-gray-500 dark:text-gray-300 sm:text-center">
              {t("Looking for a franchise opportunity")}
            </p>
            <div className="relative mt-6 flex self-center rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5 sm:mt-8">
              <button
                type="button"
                className="relative w-1/2 whitespace-nowrap rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto sm:px-8"
              >
                {t("Monthly billing")}
              </button>
              <button
                type="button"
                className="relative ml-0.5 w-1/2 whitespace-nowrap rounded-md border border-transparent py-2 text-sm font-medium text-gray-700 dark:text-gray-300 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto sm:px-8"
              >
                {t("Yearly billing")}
              </button>
            </div>
          </div>
          <div className=" mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  tier.mostPopular
                    ? "border-indigo-600 divide-indigo-600 dark:divide-indigo-600"
                    : tier.mostProfitable
                    ? "border-indigo-600 divide-indigo-600 dark:divide-indigo-600"
                    : "border-gray-200 dark:border-gray-900 divide-gray-200 dark:divide-gray-900",
                  "relative divide-y bg-gray-50 dark:bg-gray-800 rounded-lg border shadow-sm"
                )}
              >
                <div className="p-6">
                  <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">{tier.name}</h2>
                  {tier.mostPopular ? (
                    <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-indigo-600 py-1.5 px-4 text-sm font-semibold text-white">
                      {t("Most popular")}
                    </p>
                  ) : null}
                  {tier.mostProfitable ? (
                    <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-indigo-600 py-1.5 px-4 text-sm font-semibold text-white">
                      {t("Most profitable")}
                    </p>
                  ) : null}
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">{tier.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                      ${tier.priceMonthly}
                    </span>{" "}
                    <span className="text-base font-medium text-gray-500 dark:text-gray-300">/{t("month")}</span>
                  </p>
                  <a
                    href={tier.href}
                    className={cn(
                      tier.mostPopular
                        ? "bg-indigo-600 dark:bg-indigo-600 border-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white dark:text-white hover:bg-indigo-500 dark:hover:bg-indigo-500 shine animate-shine"
                        : tier.mostProfitable
                        ? "bg-indigo-600 dark:bg-indigo-600 border-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white dark:text-white hover:bg-indigo-500 dark:hover:bg-indigo-500 amber"
                        : "border-gray-800 bg-gray-800 dark:border-gray-200 dark:bg-gray-200 hover:bg-gray-900 dark:hover:bg-gray-300 text-white dark:text-gray-900",
                      "mt-8 block w-full rounded-md border py-2 text-center text-sm font-semibold"
                    )}
                  >
                    {t("Buy")} {tier.name}
                  </a>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{t("What's included")}</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {tier.includedFeatures.map((feature) => (
                      <li key={feature} className="flex space-x-3">
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs Section */}

      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-24 lg:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white">
              {t("Frequently Asked Questions")}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300">
              {t("Have a different question and")}{" "}
              <Link
                href={"/contact-us"}
                className="font-semibold text-indigo-600 dark:text-indigo-300 hover:text-indigo-300"
              >
                {t("sending us an email")}
              </Link>{" "}
              {t("and we’ll get back to you")}
            </p>
            <dl className="mt-20 space-y-6 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:space-y-0 lg:gap-x-8">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="p-6 h-fit rounded-lg bg-gray-100 dark:bg-gray-800">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900 dark:text-white">
                          <span className="text-base font-semibold leading-7">{faq.question}</span>
                          <span className="ml-6 flex h-7 items-center">
                            {open ? (
                              <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                            ) : (
                              <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base leading-7 text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}

      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl py-8 sm:px-6 sm:py-16 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-950 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white">
              {t("Start your own SMM business")}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">{t("To get a franchise, you must")}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={"/signin"}
                className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t("Get Started")}
              </Link>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
              <defs>
                <radialGradient
                  id="827591b1-ce8c-4110-b064-7cb85a0b1217"
                  cx={0}
                  cy={0}
                  r={1}
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(512 512) rotate(90) scale(512)"
                >
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Franchise;
