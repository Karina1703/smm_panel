"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { cn } from "@lib/cn";
import { ArrowRightIcon, ChevronRightIcon } from "@node_modules/@heroicons/react/20/solid";

const SignInButton = ({ type }) => {
  const t = useTranslations("Navbar");
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <Link
          href={"/dashboard/orders/all"}
          className={cn(
            type === "desktop" ? "" : "w-full",
            "inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 dark:bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-700"
          )}
          prefetch={false}
        >
          {t("Dashboard")} <ArrowRightIcon className={"mt-0.5 w-4 h-4 ml-1"} />
        </Link>
      ) : (
        <Link
          href={"/signin"}
          className={cn(
            type === "desktop" ? "" : "w-full",
            "inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 dark:bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-700"
          )}
          prefetch={false}
        >
          {t("Sign In")} <ArrowRightIcon className={"mt-0.5 w-4 h-4 ml-1"} />
        </Link>
      )}
    </>
  );
};

export default SignInButton;
