"use client";

import { useTranslations } from "next-intl";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Meta from "@components/Meta";

const RefundPolicy = () => {
  const t = useTranslations("RefundPolicy");

  return (
    <>
      <Meta title={t("Refund Policy")} />
      <Navbar />

      <div className="relative overflow-hidden bg-white dark:bg-gray-900 pt-48 pb-16">
        <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
          <div className="relative mx-auto h-full max-w-prose text-lg" aria-hidden="true"></div>
        </div>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="block text-center text-lg font-semibold text-indigo-600 dark:text-indigo-300">
                {t("Legal")}
              </span>
              <span className="mb-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {t("Refund Policy")}
              </span>
            </h1>
          </div>
          <div className="prose prose-lg prose-yellow mx-auto mt-8 text-gray-500 dark:text-gray-200">
            <p>{t("SMMSTATS strives to provide the highest")}</p>
            <p>{t("Refund requests must be submitted")}</p>
            <p>{t("We reserve the right to refund your purchase")}</p>
            <p>{t("If you violate our Terms of Service")}</p>
            <p>{t("Please note that we cannot issue refunds")}</p>
            <p>{t("In the event that your account is suspended")}</p>
            <p>{t("If you have any questions or concerns")}</p>
            <p className="border-b-2 border-gray-200 dark:border-gray-800"></p>
            <ul role="list">
              <li>
                <a href={"/legal/terms-of-service"} className={"text-indigo-600 dark:text-indigo-300"}>
                  {t("Terms of Service")}
                </a>
              </li>
              <li>
                <a href={"/legal/privacy-policy"} className={"text-indigo-600 dark:text-indigo-300"}>
                  {t("Privacy Policy")}
                </a>
              </li>
              <li>
                <a href={"/legal/cookie-policy"} className={"text-indigo-600 dark:text-indigo-300"}>
                  {t("Cookie Policy")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RefundPolicy;
