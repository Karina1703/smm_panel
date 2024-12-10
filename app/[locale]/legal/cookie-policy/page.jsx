"use client";

import { useTranslations } from "next-intl";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Meta from "@components/Meta";

const CookiePolicy = () => {
  const t = useTranslations("CookiePolicy");

  return (
    <>
      <Meta title={t("Cookie Policy")} />
      <Navbar />

      <div className="relative overflow-hidden bg-white dark:bg-gray-900 pt-48 py-16">
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
                {t("Cookie Policy")}
              </span>
            </h1>
          </div>
          <div className="prose prose-lg prose-yellow mx-auto mt-8 text-gray-500 dark:text-gray-200">
            <p>{t("This is the Cookie Policy for SMMSTATS")}</p>
            <p>
              <b>{t("What Are Cookies")}</b>
            </p>
            <p>{t("As is common practice with almost")}</p>
            <p>
              <b>{t("How We Use Cookies")}</b>
            </p>
            <p>{t("We use cookies for a variety of reasons")}</p>
            <p>
              <b>{t("Disabling Cookies")}</b>
            </p>
            <p>{t("You can prevent the setting of cookies")}</p>
            <p>
              <b>{t("The Cookies We Set")}</b>
            </p>
            <p>{t("Account related cookies: If you create")}</p>
            <p>{t("Login related cookies: We use cookies")}</p>
            <p>
              <b>{t("Third Party Cookies")}</b>
            </p>
            <p>{t("In some special cases")}</p>
            <p>{t("Google Analytics: This site uses")}</p>
            <p>
              <b>{t("More Information")}</b>
            </p>
            <p>{t("Hopefully, this policy has helped")}</p>
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
                <a href={"/legal/refund-policy"} className={"text-indigo-600 dark:text-indigo-300"}>
                  {t("Refund Policy")}
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

export default CookiePolicy;
