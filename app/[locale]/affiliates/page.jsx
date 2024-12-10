"use client";

import { useTranslations } from "next-intl";
import Head from "next/head";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Link from "next/link";
import {
  BoltIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  StarIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import Meta from "@components/Meta";

const Affiliates = () => {
  const t = useTranslations("Affiliates");

  const features = [
    {
      name: t("Lucrative Commissions"),
      description: t("Earn generous commissions"),
      icon: CircleStackIcon,
    },
    {
      name: t("High-Converting Products"),
      description: t("Promote our premium social"),
      icon: StarIcon,
    },
    {
      name: t("Trusted and Reliable"),
      description: t("SMMSTATS is a trusted name"),
      icon: ShieldCheckIcon,
    },
    {
      name: t("Real-Time Tracking and Reporting"),
      description: t("Monitor your performance"),
      icon: BoltIcon,
    },
  ];

  const faqs = [
    {
      question: t("How does the SMMSTATS"),
      answer: t("The process is simple"),
    },
    {
      question: t("How much can I earn"),
      answer: t("The earning potential"),
    },
    {
      question: t("How do I get paid"),
      answer: t("We provide multiple payout"),
    },
    {
      question: t("Can I promote SMMSTATS"),
      answer: t("Absolutely! You can promote"),
    },
    {
      question: t("Can I join if"),
      answer: t("Of course! Our program"),
    },
    {
      question: t("Is there a minimum payout"),
      answer: t("Yes, we have a minimum payout"),
    },
    {
      question: t("Can I refer customers"),
      answer: t("Absolutely! Our affiliates"),
    },
    {
      question: t("Can I track my affiliate"),
      answer: t("Yes, we provide our affiliates"),
    },
    {
      question: t("Can I use paid advertising"),
      answer: t("Yes, you can use paid advertising"),
    },
    {
      question: t("Can I refer myself or make purchases"),
      answer: t("No, self-referrals or purchases"),
    },
    {
      question: t("How can I contact the"),
      answer: t("Our affiliate support team is here"),
    },
  ];

  return (
    <>
      <Meta title={t("Seo.title")} description={t("Seo.description")} siteName={t("Seo.siteName")} url={t("Seo.url")} />
      <Navbar />
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl pt-48 pb-16 px-6 sm:pb-24 lg:px-8">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300">SMMSTATS.COM</h2>
            <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              {t("Affiliate Program")}
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-xl text-gray-500 dark:text-gray-400">
              {t("Join our affiliate program and start earning")}
            </p>
            <Link
              href="/signin"
              className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 sm:w-auto shine animate-shine"
            >
              {t("Become an Affiliate")}
            </Link>
          </div>
        </div>
      </div>

      {/*Features*/}
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="dark:bg-gray-950/20 py-24 ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {t("Why Join Our Affiliate Program?")}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                {t("As an affiliate, you'll have access")}
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                      <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/*FAQs*/}
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold leading-10 tracking-tight">{t("Frequently asked questions")}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400">
              {t("We hope these additional FAQs provide")}
            </p>
            <dl className="mt-10 space-y-4">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="rounded-lg bg-gray-100 dark:bg-gray-800">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left p-6">
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
                      <Disclosure.Panel as="dd" className="mt-2 pr-12 w-full">
                        <p className="text-base w-full leading-7 text-gray-600 dark:text-gray-400 px-6 pb-6">
                          {faq.answer}
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/*CTA*/}
      <div className="relative isolate overflow-hidden bg-gray-950">
        <div className="py-24 px-6 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-6xl font-bold tracking-tight text-white">
              {t("Become an")}{" "}
              <span className="animate-text bg-gradient-to-r from-blue-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                {t("Affiliate")}
              </span>{" "}
              {t("and")}
              <br />
              {t("Start Earning Today")}
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signin"
                className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t("Get Started")}
              </Link>
            </div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
          aria-hidden="true"
        >
          <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
          <defs>
            <radialGradient
              id="8d958450-c69f-4251-94bc-4e091a323369"
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

      <Footer />
    </>
  );
};

export default Affiliates;
