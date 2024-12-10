"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@node_modules/@fortawesome/free-solid-svg-icons";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <div className="isolate bg-white dark:bg-gray-900">
      <div className="absolute pointer-events-none inset-x-0 top-[5rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[0rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0077ff" />
              <stop offset={0.8} stopColor="#d722ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/*Hero Content*/}
      <div className="px-3 lg:px-8 -mb-10 z-10">
        <div className="mx-auto max-w-5xl pt-24 sm:pt-40">
          <div className="text-center">
            <h1
              className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl"
              data-aos="fade-down"
            >
              {t("Boost your business")}{" "}
              <span
                className={
                  "animate-text bg-gradient-to-r from-blue-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent"
                }
              >
                {t("Elite SMM Services")}
              </span>
            </h1>
            <div className={"mt-6 max-w-xl mx-auto text-base sm:text-lg leading-8 text-gray-600 dark:text-gray-300"}>
              <p>{t("We aim to help our customers")}</p>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <Link
                href={"/#new-order"}
                className="rounded-md shadow-indigo-button bg-indigo-600 px-4 py-2 text-base leading-7 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 shine animate-shine"
              >
                {t("Get Started")} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className={"flex flex-col gap-y-0.5 mx-auto w-fit mt-6 items-center"}>
              <div className={"flex items-center gap-x-0.5"}>
                <FontAwesomeIcon icon={faStar} className={"w-5 h-5 text-energy-yellow-400"} />
                <FontAwesomeIcon icon={faStar} className={"w-5 h-5 text-energy-yellow-400"} />
                <FontAwesomeIcon icon={faStar} className={"w-5 h-5 text-energy-yellow-400"} />
                <FontAwesomeIcon icon={faStar} className={"w-5 h-5 text-energy-yellow-400"} />
                <FontAwesomeIcon icon={faStarHalfAlt} className={"w-5 h-5 text-energy-yellow-400"} />
                <span className={"ml-1"}>
                  <b>4,89 / 5</b>
                </span>
              </div>
              <div className={"flex items-center mt-1"}>
                <span className={"text-sm"}>
                  <span className={"text-energy-yellow-300"}>95,000+</span> {t("happy customers")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute pointer-events-none inset-x-0 top-[calc(100%-130rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative -z-10 left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
