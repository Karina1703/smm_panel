"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Head from "next/head";
import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@lib/cn";
import Meta from "@components/Meta";
import { Inter } from "next/font/google";
import AnimatedStickerRocket from "@public/assets/lottie/start.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"));

const inter = Inter({ subsets: ["latin"] });

const SignIn = () => {
  const { data: session } = useSession();
  const t = useTranslations("SignIn");
  const { theme, setTheme } = useTheme();
  const [email, setEmail] = useState();
  const [buttonEnabled, setButtonEnabled] = useState(true);

  if (session) {
    redirect("/dashboard/orders/all");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regex = /^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z]{2,6})$/;
    const valid = regex.test(email);

    if (valid) {
      setButtonEnabled(false);
      const res = await signIn("email", {
        email,
        redirect: true,
        callbackUrl: "/dashboard/orders/all",
      });
    }
  };

  return (
    <>
      <Meta title={t("Seo.title")} description={t("Seo.description")} siteName={t("Seo.siteName")} url={t("Seo.url")} />
      <div className="isolate flex min-h-full bg-gray-900 flex-col justify-center py-12 sm:px-6 lg:px-8">
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
          <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t("Get Started")}
          </h2>
          <p className="mt-4 text-center text-gray-400 px-4">{t("We will send a magic link to your inbox")}</p>
        </div>
        <div className="mt-4 mx-auto w-full max-w-md">
          <div className="py-3 px-4 sm:py-8 sm:px-10 rounded-lg">
            <form className="space-y-3" name={"sign-in"}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="block w-full appearance-none rounded-md border bg-gray-800 border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleSubmit}
                  className={cn(
                    !buttonEnabled
                      ? "bg-indigo-800"
                      : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2",
                    "flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm"
                  )}
                  disabled={!buttonEnabled}
                >
                  {!buttonEnabled ? (
                    <span className={"text-white flex flex-row items-center text-sm font-medium"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1.2em"
                        viewBox="0 0 512 512"
                        className={"animate-spin mr-2 text-white"}
                      >
                        <path
                          fill={"#ffffff"}
                          d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
                        />
                      </svg>{" "}
                      {t("Sign In")}{" "}
                    </span>
                  ) : (
                    t("Sign In")
                  )}
                </button>
              </div>
            </form>

            <div className="mt-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800" />
                </div>
                <div className="relative flex justify-center text-sm">OR</div>
              </div>

              <div className="mt-3 grid grid-rows-1 gap-3">
                <div>
                  <button
                    onClick={() => {
                      signIn("google");
                    }}
                    className="inline-flex w-full items-center justify-center rounded-md bg-gray-800 py-2 px-4 text-sm font-medium shadow-sm hover:bg-gray-700"
                  >
                    <Image
                      src={"https://authjs.dev/img/providers/google.svg"}
                      alt={"Google Auth Button"}
                      width={24}
                      height={24}
                      className={"w-5 h-5 mr-2"}
                    ></Image>
                    <span className={"text-base font-medium"}>{t("Continue with Google")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
