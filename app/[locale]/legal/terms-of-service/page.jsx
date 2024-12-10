"use client";

import { useTranslations } from "next-intl";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Meta from "@components/Meta";

const TermsOfService = () => {
  const t = useTranslations("TermsOfService");

  return (
    <>
      <Meta title={t("Terms of Service")} />
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
                {t("Terms of Service")}
              </span>
            </h1>
          </div>
          <div className="prose prose-lg prose-yellow mx-auto mt-8 text-gray-500 dark:text-gray-200">
            <p>
              <b>{t("General")}</b>
            </p>
            <p>{t("By placing an order with SMMSTATS")}</p>
            <p>{t("We reserve the right to change")}</p>
            <p>{t("You will only use the SMMSTATS")}</p>
            <p>
              <b>{t("Service")}</b>
            </p>
            <p>{t("SMMSTATS will only be used to promote your")}</p>
            <p>{t("We DO NOT guarantee your new followers")}</p>
            <p>{t("We DO NOT guarantee 100")}</p>
            <p>{t("You will not upload anything into")}</p>
            <p>{t("Private accounts would not a get a refund")}</p>
            <p>
              <b>{t("Disclaimer")}:</b>
            </p>
            <p>{t("SMMSTATS will not be responsible for any damages")}</p>
            <p>
              <b>{t("Liabilities")}:</b>
            </p>
            <p>{t("SMMSTATS is in no way liable for any account suspension")}</p>
            <p>
              <b>{t("Additional terms")}</b>
            </p>
            <p>{t("The user is responsible for providing accurate")}</p>
            <p>{t("SMMSTATS reserves the right to refuse service to anyone")}</p>
            <p>{t("If the user violates any of the terms of service")}</p>
            <p>{t("The user agrees to indemnify and hold SMMSTATS")}</p>
            <p>{t("The user acknowledges that the services provided")}</p>
            <p>{t("By using SMMSTATS you agree to these terms of service")}</p>
            <p>
              <b>{t("Contact us")}</b>
            </p>
            <p>{t("If you have any questions or concerns")}</p>
            <p className="border-b-2 border-gray-200 dark:border-gray-800"></p>
            <ul role="list">
              <li>
                <a href={"/legal/refund-policy"} className={"text-indigo-600 dark:text-indigo-300"}>
                  {t("Refund Policy")}
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

export default TermsOfService;
