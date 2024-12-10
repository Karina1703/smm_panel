"use client";

import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

const Faqs = () => {
  const t = useTranslations("Faqs");

  const faqs = [
    {
      question: t("What is SMMSTATS?"),
      answer: t("SMMSTATSCOM is a platform that provides a convenient"),
    },
    {
      question: t("Where should I start?"),
      answer: t("1) Create an account - Make sure to start"),
    },
    {
      question: t("What makes people look for SMM platforms?"),
      answer: t("SMM (Social Media Marketing) panels are online platforms"),
    },
    {
      question: t("What SMM services can I buy here?"),
      answer: t("There are different types of SMM services we offer"),
    },
    {
      question: t("Are SMM services on SMMSTATS platform safe to buy?"),
      answer: t("Absolutely! Our SMM services are 100% safe"),
    },
    {
      question: t("Can I make multiple orders at the same time?"),
      answer: t("Yes, with us you can simultaneously order an unlimited"),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pb-32 lg:pb-40 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10 dark:divide-white/10">
          <h2 className="text-3xl capitalize font-bold leading-10 tracking-tight">{t("Frequently asked questions")}</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10 dark:divide-white/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
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
  );
};

export default Faqs;
