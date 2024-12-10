"use client";

import { useTranslations } from "next-intl";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Meta from "@components/Meta";

const PrivacyPolicy = () => {
  const t = useTranslations("PrivacyPolicy");

  return (
    <>
      <Meta title={t("Privacy Policy")} />
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
                {t("Privacy Policy")}
              </span>
            </h1>
          </div>
          <div className="prose prose-lg prose-yellow mx-auto mt-8 text-gray-500 dark:text-gray-200">
            <p>{t("At SMMSTATS, we take your privacy seriously")}</p>
            <p>
              <b>{t("Information we collect")}</b>
            </p>
            <p>{t("When you visit our website")}</p>
            <p>{t("We may collect personal information")}</p>
            <p>
              <b>{t("How we use your information")}</b>
            </p>
            <p>{t("We use the information we collect")}</p>
            <p>{t("We may also use your information")}</p>
            <p>
              <b>{t("How we share your information")}</b>
            </p>
            <p>{t("We may share your information with third")}</p>
            <p>{t("We may also share your information as required")}</p>
            <p>
              <b>{t("Your choices and rights")}</b>
            </p>
            <p>{t("You have the right to access, update, and delete")}</p>
            <p>
              <b>{t("Security")}</b>
            </p>
            <p>{t("We take reasonable measures to protect your personal")}</p>
            <p>
              <b>{t("Changes to this policy")}</b>
            </p>
            <p>{t("We may update this Privacy Policy from")}</p>
            <p>
              <b>{t("Contact us")}</b>
            </p>
            <p>{t("If you have any questions or concerns about")}</p>
            <p className="border-b-2 border-gray-200 dark:border-gray-800"></p>
            <ul role="list">
              <li>
                <a href={"/legal/terms-of-service"} className={"text-indigo-600 dark:text-indigo-300"}>
                  {t("Terms of Service")}
                </a>
              </li>
              <li>
                <a href={"/legal/refund-policy"} className={"text-indigo-600 dark:text-indigo-300"}>
                  {t("Refund Policy")}
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

export default PrivacyPolicy;
