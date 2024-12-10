"use client";

import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import SignInButton from "@components/ui/SignInButton";
import { useConstants } from "@constants";
import { useTranslations } from "next-intl";
import { cn } from "@lib/cn";
import CurrencySwitcher from "@components/ui/CurrencySwitcher";
import LocaleSwitcher from "@components/ui/LocaleSwitcher";
import { Inter } from "next/font/google";
import AnimatedStickerRocket from "@public/assets/lottie/start.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"));

const inter = Inter({ subsets: ["latin"] });

const Navbar = () => {
  const [mounted, setMounted] = useState();
  const t = useTranslations("Constants.sidebar.modal");
  const { solutions, callsToAction, resources, recentPosts, navLinks } = useConstants();

  return (
    <>
      <Popover className="z-10 fixed w-full top-0 left-0 right-0 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between py-6 lg:justify-start lg:space-x-10">
            <Link href={"/"} className="flex justify-start lg:w-0 lg:flex-1 z-20">
              <span className={cn("font-black text-2xl", inter.className)}>{process.env.NEXT_PUBLIC_FIRST_WORD}</span>
              <Lottie animationData={AnimatedStickerRocket} className={"w-8 h-8 mx-1"} />
              <span className={cn("font-black text-2xl", inter.className)}>{process.env.NEXT_PUBLIC_SECOND_WORD}</span>
            </Link>
            <div className="-my-2 -mr-2 lg:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-900 p-2 text-gray-400 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 lg:flex">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={cn(
                        open ? "text-gray-900 dark:text-indigo-200" : "text-gray-500 dark:text-white",
                        "group inline-flex items-center rounded-xl text-base font-medium hover:text-gray-900 dark:hover:text-indigo-200 focus:outline-none px-3 py-2 transition hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-indigo-500"
                      )}
                    >
                      <span>{navLinks[0].name}</span>
                      <ChevronDownIcon
                        className={cn(
                          open ? "rotate-180" : null,
                          "text-gray-900 dark:text-indigo-200 ml-2 h-5 w-5 transform transition"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterhref="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leavehref="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-lg transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-5">
                          <div className="relative grid grid-rows-4 grid-flow-col gap-6 bg-white dark:bg-gray-900 px-5 py-6 sm:gap-8 sm:p-8">
                            {solutions.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                              >
                                <img src={item.icon} alt="" className={"h-6 w-6 flex-shrink-0 text-indigo-600"} />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900 dark:text-white">{item.name}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Link
                href={"/affiliates"}
                className="text-base font-medium rounded-xl text-gray-500 dark:text-white hover:text-gray-900 dark:hover:text-indigo-200 px-3 py-2 transition hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-indigo-500"
              >
                {navLinks[1].name}
              </Link>
              <Link
                href={"/discounts"}
                className="text-base font-medium rounded-xl text-gray-500 dark:text-white hover:text-gray-900 dark:hover:text-indigo-200 px-3 py-2 transition hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-indigo-500"
              >
                {navLinks[2].name}
              </Link>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={cn(
                        open ? "text-gray-900 dark:text-indigo-200" : "text-gray-500 dark:text-white",
                        "group inline-flex items-center rounded-xl text-base font-medium hover:text-gray-900 dark:hover:text-indigo-200 focus:outline-none px-3 py-2 transition hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-indigo-500"
                      )}
                    >
                      <span>{navLinks[3].name}</span>
                      <ChevronDownIcon
                        className={cn(
                          open ? "rotate-180" : null,
                          "text-gray-900 dark:text-indigo-200 ml-2 h-5 w-5 transform transition"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterhref="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leavehref="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-5">
                          <div className="relative grid gap-6 bg-white dark:bg-gray-900 px-5 py-6 sm:gap-8 sm:p-8">
                            {resources.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                              >
                                <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900 dark:text-white">{item.name}</p>
                                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </Popover.Group>
            <div className="hidden items-center justify-end lg:flex lg:flex-1 gap-x-6">
              <CurrencySwitcher />
              <LocaleSwitcher />
              <SignInButton type={"desktop"} />
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterhref="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leavehref="opacity-0 scale-95"
        >
          <Popover.Panel className="absolute inset-x-0 top-0 origin-top transform transition lg:hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-b-lg bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black ring-opacity-5 dark:ring-gray-700 dark:ring-opacity-100">
              <div className="px-4 py-6">
                <div className="flex items-center justify-end">
                  <div className="flex items-center">
                    {/*<div className={"flex gap-x-2.5 mr-2 items-center"}>*/}
                    {/*  <CurrencySwitcher*/}
                    {/*    className={*/}
                    {/*      "w-4 h-4 text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-400"*/}
                    {/*    }*/}
                    {/*  />*/}
                    {/*  <ThemeSwitcher*/}
                    {/*    className={*/}
                    {/*      "w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-400"*/}
                    {/*    }*/}
                    {/*  />*/}
                    {/*  <LocaleSwitcher*/}
                    {/*    className={*/}
                    {/*      "w-5 h-5 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-400"*/}
                    {/*    }*/}
                    {/*  />*/}
                    {/*</div>*/}
                    <Popover.Button className="-my-1 -mr-2 inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-900 p-2 text-gray-400 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>

                <div className="mt-6">
                  <nav className="grid grid-rows-6 grid-flow-col gap-6">
                    {solutions.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <img src={item.icon} alt="" className={"h-6 w-6 flex-shrink-0 text-indigo-600"} />
                        <span className="ml-3 text-base font-medium text-gray-900 dark:text-white">{item.name}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>

              <div className="space-y-6 py-6 px-4">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <Link
                    href={"/"}
                    className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {navLinks[0].name}
                  </Link>

                  <Link
                    href={"/affiliates"}
                    className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {navLinks[1].name}
                  </Link>

                  {resources.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className={"w-full"}>{<SignInButton type={"mobile"} />}</div>
              </div>

              <div className={""}>
                <div className={"flex divide-x divide-gray-700"}>
                  <div className={"flex items-center justify-center py-4 w-full mx-auto bg-gray-900 rounded-bl-lg"}>
                    {/*USD $ <ChevronDownIcon className={"w-5 h-5 text-gray-600"} />*/}
                    <CurrencySwitcher openDirection={"up"} />
                  </div>
                  <div className={"flex items-center justify-center py-4 w-full mx-auto bg-gray-900 rounded-br-lg"}>
                    {/*English <ChevronDownIcon className={"w-5 h-5 text-gray-600"} />*/}
                    <LocaleSwitcher openDirection={"up"} />
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default Navbar;
