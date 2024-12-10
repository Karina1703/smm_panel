"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const Stats = () => {
  const t = useTranslations("Stats");

  const metrics = [
    {
      id: 1,
      stat: "10K+",
      emphasis: t("Satisfied Clients"),
      rest: t("Over the years, we've helped over"),
    },
    {
      id: 2,
      stat: "180K+",
      emphasis: t("Orders Completed"),
      rest: t("Our experienced team has completed over"),
    },
    {
      id: 3,
      stat: "200M+",
      emphasis: t("Audience Reached"),
      rest: t("We've helped our clients reach over"),
    },
    {
      id: 4,
      stat: "75%+",
      emphasis: t("Brand Awareness Increase"),
      rest: t("Our social media marketing campaigns have"),
    },
  ];

  return (
    <div className="relative bg-white dark:bg-gray-900">
      <div className="absolute bottom-0 h-80 w-full xl:inset-0 xl:h-full">
        <div className="h-full w-full xl:grid xl:grid-cols-2">
          <div className="h-full xl:relative xl:col-start-2">
            <img
              className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
              src="/assets/images/photo-stats.avif"
              alt="SMMSTATS Team"
              width={1415}
              height="auto"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white dark:from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-x-8">
        <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
          <h2 className="text-base uppercase font-semibold text-indigo-600 dark:text-indigo-300">
            {t("Valuable Metrics")}
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t("Our impressive stats speak for themselves")}
          </p>
          <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
            {t("We're proud of the results we've achieved")}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            {metrics.map((item) => (
              <p key={item.id}>
                <span className="block text-2xl font-bold text-gray-900 dark:text-white">{item.stat}</span>
                <span className="mt-1 block text-base text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">{item.emphasis}</span>
                  <br />
                  {item.rest}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
