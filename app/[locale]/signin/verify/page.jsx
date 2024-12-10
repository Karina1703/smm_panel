"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { cn } from "@lib/cn";
import AnimatedStickerRocket from "@public/assets/lottie/start.json";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

const Lottie = dynamic(() => import("lottie-react"));

const inter = Inter({ subsets: ["latin"] });

const VerifyRequest = () => {
  const { data: session } = useSession();
  const t = useTranslations("Verify");

  if (session) {
    redirect("/dashboard/orders/all");
  }

  return (
    <>
      <div className="isolate flex min-h-full bg-gray-50 dark:bg-gray-900 flex-col justify-center py-12 sm:px-6 lg:px-8">
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

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href={"/"} className="flex justify-center mx-auto mb-4">
            <Lottie animationData={AnimatedStickerRocket} className={"w-20 h-20 mx-1"} />
          </Link>
          <h2 className=" text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t("Check your email")}
          </h2>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="py-8 rounded-lg px-10 mx-4">
            <p className={"text-center text-gray-400"}>{t("A sign in link has been sent")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyRequest;
