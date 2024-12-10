"use client";

import { useTranslations } from "next-intl";
import { FingerPrintIcon, HandThumbUpIcon, CreditCardIcon, ReceiptPercentIcon } from "@heroicons/react/24/outline";

const Features = () => {
  const t = useTranslations("Features");

  const features = [
    {
      name: t("Exceptional Quality"),
      description: t("We take pride in delivering SMM services"),
      icon: HandThumbUpIcon,
    },
    {
      name: t("Flexible Payment Options"),
      description: t("We offer multiple payment methods"),
      icon: CreditCardIcon,
    },
    {
      name: t("Affordable Services"),
      description: t("All of the SMM services offered on our platform"),
      icon: ReceiptPercentIcon,
    },
    {
      name: t("Quick and Automated Services"),
      description: t("Our platform offers quick and automated SMM services"),
      icon: FingerPrintIcon,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base uppercase font-semibold tracking-wider text-indigo-600 dark:text-indigo-300">
            {t("Make Online Presence Noticeable")}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t("Reasons why you should try our services")}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">{t("Our mission is to help")}</p>
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
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
