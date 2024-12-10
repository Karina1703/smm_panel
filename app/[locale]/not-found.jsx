"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Animated404Error from "@public/assets/lottie/404-error-cat-dark.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"));

const NotFound = () => {
  const t = useTranslations("NotFound");

  return (
    <>
      <main className="grid min-h-full place-items-center bg-white dark:bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <Lottie
            animationData={Animated404Error}
            className={"h-96 w-auto -mt-16"}
          />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {t("Page not found")}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-500">
            {t("Sorry we cant find the page")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={"/"}
              className="rounded-md bg-indigo-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {t("Go back home")}
            </Link>
            <Link
              href={"/contact-us"}
              className="text-sm font-semibold text-gray-900 dark:text-white"
            >
              {t("Contact support")} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
