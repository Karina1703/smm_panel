"use client";

import { useTranslations } from "next-intl";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Meta from "@components/Meta";
import Link from "next/link";
import AnimatedStickerCheckMark from "@public/assets/lottie/refill.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"));

const PaymentSuccess = () => {
  const t = useTranslations("Payments");

  return (
    <>
      {/*<Meta title={t("Terms of Service")} />*/}
      <Navbar />

      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl py-32 px-2 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 dark:bg-gray-950/50 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full -mt-6 mb-4">
              <Lottie animationData={AnimatedStickerCheckMark} loop={true} />
            </div>
            <h2 className="mx-auto max-w-5xl text-3xl sm:text-5xl font-bold tracking-tight text-spring-green-500">
              {t("Payment Successful")}
            </h2>
            <p className="mx-auto mt-6 sm:max-w-xl text-lg leading-8 text-gray-300 px-2">
              {t("Thank you for choosing SMMSTATS")}!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={"/"}
                className="text-spring-green-300 border border-spring-green-300 bg-spring-green-900 shine-green animate-shine hover:bg-spring-green-950 rounded-md px-3.5 py-1.5 text-base font-semibold leading-7 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t("New Order")}
              </Link>
              <a href={"/dashboard/orders/all"} className="text-base font-semibold leading-7 text-white">
                {t("My Orders")} <span aria-hidden="true">→</span>
              </a>
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
                  <stop stopColor="#42e67e" />
                  <stop offset={1} stopColor="#0faa48" stopOpacity={0} />
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

export default PaymentSuccess;
