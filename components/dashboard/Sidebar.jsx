"use client";

import { Dialog, Listbox, Menu, Transition, Switch } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import { Fragment, useEffect, useState } from "react";
import { AdjustmentsHorizontalIcon, LanguageIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { Bars3Icon, CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useConstants } from "@constants";
import { setCookie, getCookie } from "cookies-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons";
import AnimatedStickerExchange from "@public/assets/lottie/exchange.json";
import AnimatedStickerFlagRussia from "@public/assets/lottie/flag-russia.json";
import AnimatedStickerFlagUsa from "@public/assets/lottie/flag-usa.json";
import AnimatedStickerFlagUkraine from "@public/assets/lottie/flag-ukraine.json";
import AnimatedStickerFlagSpain from "@public/assets/lottie/flag-spain.json";
import AnimatedStickerFlagGermany from "@public/assets/lottie/flag-germany.json";
import AnimatedStickerFlagFrance from "@public/assets/lottie/flag-france.json";
import AnimatedStickerFlagIndia from "@public/assets/lottie/flag-india.json";
import AnimatedStickerFlagChina from "@public/assets/lottie/flag-china.json";
import AnimatedStickerFlagJapan from "@public/assets/lottie/flag-japan.json";
import AnimatedStickerFlagKorea from "@public/assets/lottie/flag-korea.json";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@lib/cn";
import { faArrowRightFromBracket, faCircleHalfStroke, faCoins } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import API_URL from "@lib/apiUrl";
import AnimatedStickerRocket from "@public/assets/lottie/start.json";
import { Inter } from "next/font/google";
import LinkInfoModal from "@components/modal/LinkInfoModal";
import React from "@node_modules/react";
import LanguageSelectorModal from "@components/modal/LanguageSelectorModal";
import CurrencySelectorModal from "@components/modal/CurrencySelectorModal";
import { formatCurrency } from "@lib/formatPrice";
import { ArrowLeftIcon } from "@node_modules/@heroicons/react/24/outline";

const Lottie = dynamic(() => import("lottie-react"));

const inter = Inter({ subsets: ["latin"] });

const Sidebar = ({ userEmail, currency, currencyRate, isAdminSidebar }) => {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [currencyModalOpen, setCurrencyModalOpen] = useState(false);
  const [balance, setBalance] = useState(null);

  const { sidebarNavigation, adminSidebarNavigation, sidebarText } = useConstants();

  useEffect(() => {
    async function getUserBalance() {
      const res = await fetch(`${API_URL}/api/user/balance?email=${userEmail}`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBalance(await res.json());
    }

    getUserBalance();
  }, []);

  return (
    <>
      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-950 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 border-r">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-gray-900 dark:text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  <div className="flex flex-shrink-0 items-center pl-4">
                    <Link href={"/"} className="flex ">
                      <span className={cn("font-black text-2xl", inter.className)}>
                        {process.env.NEXT_PUBLIC_FIRST_WORD}
                      </span>
                      <Lottie animationData={AnimatedStickerRocket} className={"w-8 h-8 mx-1"} />
                      <span className={cn("font-black text-2xl", inter.className)}>
                        {process.env.NEXT_PUBLIC_SECOND_WORD}
                      </span>
                    </Link>
                  </div>
                  <nav className="mt-5 space-y-1 px-2">
                    {isAdminSidebar
                      ? adminSidebarNavigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                              item.current
                                ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                                : item.disabled
                                ? "hover:bg-none dark:hover:bg-none text-gray-300 dark:text-gray-600"
                                : "text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            )}
                            onClick={() => setSidebarOpen(false)}
                            aria-disabled={item.disabled}
                          >
                            <item.icon
                              className={cn(
                                item.current
                                  ? "text-gray-900 dark:text-white"
                                  : item.disabled
                                  ? "hover:bg-none dark:hover:bg-none text-gray-300 dark:text-gray-600"
                                  : "text-gray-600 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300",
                                "mr-4 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))
                      : sidebarNavigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                              item.current
                                ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                                : item.disabled
                                ? "hover:bg-none dark:hover:bg-none text-gray-300 dark:text-gray-600"
                                : "text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            )}
                            onClick={() => setSidebarOpen(false)}
                            aria-disabled={item.disabled}
                          >
                            <item.icon
                              className={cn(
                                item.current
                                  ? "text-gray-900 dark:text-white"
                                  : item.disabled
                                  ? "hover:bg-none dark:hover:bg-none text-gray-300 dark:text-gray-600"
                                  : "text-gray-600 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300",
                                "mr-4 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                    {isAdminSidebar ? (
                      <>
                        <hr className={"my-6 h-px border-t-0 bg-gray-300 dark:bg-gray-800 opacity-100"} />
                        <Link
                          key={"user-dashboard"}
                          href={"/dashboard/orders/all"}
                          className={
                            "text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          }
                        >
                          <ArrowLeftIcon
                            className={
                              "text-gray-600 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
                            }
                            aria-hidden="true"
                          />
                          Назад
                        </Link>
                      </>
                    ) : session?.user.role === "admin" && !isAdminSidebar ? (
                      <>
                        <hr className={"my-6 h-px border-t-0 bg-gray-300 dark:bg-gray-800 opacity-100"} />{" "}
                        <Link
                          key={"admin-dashboard"}
                          href={"/admin/dashboard"}
                          className={
                            "text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          }
                        >
                          <AdjustmentsHorizontalIcon
                            className={
                              "text-gray-600 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
                            }
                            aria-hidden="true"
                          />
                          Админ-панель
                        </Link>
                      </>
                    ) : (
                      ""
                    )}
                  </nav>
                </div>
                <div className="flex flex-shrink-0 bg-gray-200/50 dark:bg-gray-950/30 p-4">
                  <Menu>
                    <Menu.Button>
                      <span className="group block flex-shrink-0">
                        <div className="flex items-center">
                          <div className={"mb-[-6px]"}>
                            {session?.user.image ? (
                              <img className="inline-block h-10 w-10 rounded-full" src={session?.user.image} alt="" />
                            ) : (
                              <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                                <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              </span>
                            )}
                          </div>
                          <div className="ml-3 text-start">
                            <p className="text-base font-medium text-gray-900 dark:text-white">{session?.user.email}</p>
                            <p className="text-sm font-medium text-gray-600 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300">
                              {sidebarText[0].name}
                            </p>
                          </div>
                        </div>
                      </span>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute bottom-20 right-8 md:right-20 z-10 mt-2 w-56 md:w-48 origin-bottom rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              onClick={() => {
                                setSidebarOpen(false);
                                setCurrencyModalOpen(true);
                              }}
                              className={cn(
                                active ? "bg-gray-100 dark:bg-gray-900 dark:text-white" : "",
                                "flex items-center px-4 py-2 text-md md:text-sm text-gray-700 dark:text-gray-300"
                              )}
                            >
                              <FontAwesomeIcon icon={faCoins} className={"h-4 w-4 pr-2"} />
                              {sidebarText[1].name}
                            </span>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              onClick={() => {
                                setSidebarOpen(false);
                                setLanguageModalOpen(true);
                              }}
                              className={cn(
                                active ? "bg-gray-100 dark:bg-gray-900 dark:text-white" : "",
                                "flex items-center px-4 py-2 text-md md:text-sm text-gray-700 dark:text-gray-300"
                              )}
                            >
                              <LanguageIcon className={"h-5 w-auto pr-1"} />
                              {sidebarText[4].name}
                            </span>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={cn(
                                active ? "bg-gray-100 dark:bg-gray-900 dark:text-red-500" : "",
                                "flex items-center px-4 py-2 text-md md:text-sm text-red-300 dark:text-red-300"
                              )}
                              onClick={() => signOut()}
                            >
                              <FontAwesomeIcon icon={faArrowRightFromBracket} className={"h-4 w-4 pr-2"} />
                              {sidebarText[3].name}
                            </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col bg-gray-100/50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800 border-r">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center pl-4">
              <Link href={"/"} className="flex">
                <span className={cn("font-black text-2xl", inter.className)}>{process.env.NEXT_PUBLIC_FIRST_WORD}</span>
                <Lottie animationData={AnimatedStickerRocket} className={"w-8 h-8 mx-1"} />
                <span className={cn("font-black text-2xl", inter.className)}>
                  {process.env.NEXT_PUBLIC_SECOND_WORD}
                </span>
              </Link>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {isAdminSidebar
                ? adminSidebarNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        item.current
                          ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                          : item.disabled
                          ? "hover:bg-none dark:hover:bg-none text-gray-300 dark:text-gray-600"
                          : "text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                      aria-disabled={item.disabled}
                    >
                      <item.icon
                        className={cn(
                          item.current
                            ? "text-gray-900 dark:text-white"
                            : item.disabled
                            ? "hover:bg-none dark:hover:bg-none text-gray-300 dark:text-gray-600"
                            : "text-gray-600 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300",
                          "mr-3 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))
                : sidebarNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        item.current
                          ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                          : item.disabled
                          ? "hover:bg-none dark:hover:bg-none text-gray-300 dark:text-gray-600"
                          : "text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                      aria-disabled={item.disabled}
                    >
                      <item.icon
                        className={cn(
                          item.current
                            ? "text-gray-900 dark:text-white"
                            : item.disabled
                            ? "hover:bg-none dark:hover:bg-none text-gray-300 dark:text-gray-600"
                            : "text-gray-600 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300",
                          "mr-3 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
              {isAdminSidebar ? (
                <>
                  <hr className={"my-6 h-px border-t-0 bg-gray-300 dark:bg-gray-800 opacity-100"} />
                  <Link
                    key={"user-dashboard"}
                    href={"/dashboard/orders/all"}
                    className={
                      "text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    }
                  >
                    <ArrowLeftIcon
                      className={
                        "text-gray-600 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
                      }
                      aria-hidden="true"
                    />
                    Назад
                  </Link>
                </>
              ) : session?.user.role === "admin" && !isAdminSidebar ? (
                <>
                  <hr className={"my-6 h-px border-t-0 bg-gray-300 dark:bg-gray-800 opacity-100"} />{" "}
                  <Link
                    key={"admin-dashboard"}
                    href={"/admin/dashboard"}
                    className={
                      "text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    }
                  >
                    <AdjustmentsHorizontalIcon
                      className={
                        "text-gray-600 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
                      }
                      aria-hidden="true"
                    />
                    Админ-панель
                  </Link>
                </>
              ) : (
                ""
              )}
            </nav>
          </div>
          <Link
            href={"#"}
            className={
              "flex flex-row items-center rounded-full bg-gray-200 border-gray-400 dark:bg-gray-800 px-4 py-2 border-[0.5px] dark:border-gray-700 mx-auto mb-8 hover:brightness-110"
            }
          >
            <FontAwesomeIcon icon={fa.faWallet} className={"h-4 w-4 mr-2"} />
            <span>
              {!balance && typeof balance !== "number" ? (
                <>
                  <FontAwesomeIcon icon={fa.faSpinner} className={"w-4 h-4 animate-spin ml-2"} />
                </>
              ) : (
                formatCurrency(currency, balance, currencyRate)
              )}
            </span>
          </Link>
          <div className="flex flex-shrink-0 bg-gray-200/50 dark:bg-gray-950/30 p-4">
            <Menu>
              <Menu.Button className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                  <div className={"mb-[-6px]"}>
                    {session?.user.image ? (
                      <img className="inline-block h-10 w-10 rounded-full" src={session?.user.image} alt="" />
                    ) : (
                      <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                        <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="ml-3 text-start">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{session?.user.email}</p>
                    <p className="text-xs font-medium text-gray-600 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300">
                      {sidebarText[0].name}
                    </p>
                  </div>
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute bottom-20 right-2 z-10 mt-2 w-60 origin-bottom rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <span
                        onClick={() => setCurrencyModalOpen(true)}
                        className={cn(
                          active ? "bg-gray-100 dark:bg-gray-900 dark:text-white" : "",
                          "flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                        )}
                      >
                        <FontAwesomeIcon icon={faCoins} className={"h-4 w-4 pr-2"} />
                        {sidebarText[1].name}
                      </span>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <span
                        onClick={() => setLanguageModalOpen(true)}
                        className={cn(
                          active ? "bg-gray-100 dark:bg-gray-900 dark:text-white" : "",
                          "flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                        )}
                      >
                        <LanguageIcon className={"h-5 w-auto pr-1"} />
                        {sidebarText[4].name}
                      </span>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <span
                        className={cn(
                          active ? "bg-gray-100 dark:bg-gray-900 dark:text-red-500" : "",
                          "flex items-center px-4 py-2 text-sm text-red-300 dark:text-red-300"
                        )}
                        onClick={() => signOut()}
                      >
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className={"h-4 w-4 pr-2"} />
                        {sidebarText[3].name}
                      </span>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile Navbar Header with Bars icon */}
      <div className="sticky flex flex-row items-center top-0 z-10 bg-white dark:bg-gray-900 p-3 md:hidden border-b border-gray-200 dark:border-gray-800">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 dark:text-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <Link
          href={"#"}
          className={
            "flex flex-row items-center rounded-full bg-gray-200 border-gray-300 dark:bg-gray-800 px-4 py-2 border-[0.5px] dark:border-gray-700 ml-auto mr-2 hover:brightness-110"
          }
        >
          <FontAwesomeIcon icon={fa.faWallet} className={"h-4 w-4 mr-2 text-gray-700"} />
          <span>
            {!balance && typeof balance !== "number" ? (
              <>
                <FontAwesomeIcon icon={fa.faSpinner} className={"w-4 h-4 animate-spin mr-2"} />
              </>
            ) : (
              formatCurrency(currency, balance, currencyRate)
            )}
          </span>
        </Link>
        <Menu as="div" className="relative ml-3 h-10">
          <Menu.Button>
            <div>
              {session?.user.image ? (
                <img className="inline-block h-10 w-10 rounded-full" src={session?.user.image} alt="" />
              ) : (
                <span className="flex items-center align-middle h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                  <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              )}
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={() => {
                      setSidebarOpen(false);
                      setCurrencyModalOpen(true);
                    }}
                    className={cn(
                      active ? "bg-gray-100 dark:bg-gray-900 dark:text-white" : "",
                      "flex items-center px-4 py-2 text-md md:text-sm text-gray-700 dark:text-gray-300"
                    )}
                  >
                    <FontAwesomeIcon icon={faCoins} className={"h-4 w-4 pr-2"} />
                    {sidebarText[1].name}
                  </span>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={() => {
                      setSidebarOpen(false);
                      setLanguageModalOpen(true);
                    }}
                    className={cn(
                      active ? "bg-gray-100 dark:bg-gray-900 dark:text-white" : "",
                      "flex items-center px-4 py-2 text-md md:text-sm text-gray-700 dark:text-gray-300"
                    )}
                  >
                    <LanguageIcon className={"h-5 w-auto pr-1"} />
                    {sidebarText[4].name}
                  </span>
                )}
              </Menu.Item>
              {/*<Menu.Item>*/}
              {/*  {({ active }) => (*/}
              {/*    <div className={"flex flex-row items-center"}>*/}
              {/*      <span*/}
              {/*        className={*/}
              {/*          "flex items-center px-4 py-2 text-md md:text-sm text-gray-700 dark:text-gray-300"*/}
              {/*        }*/}
              {/*      >*/}
              {/*        <FontAwesomeIcon*/}
              {/*          icon={faCircleHalfStroke}*/}
              {/*          className={"h-4 w-4 pr-2"}*/}
              {/*        />*/}
              {/*        {sidebarText[2].name}*/}
              {/*      </span>*/}
              {/*      <Switch*/}
              {/*        checked={darkModeEnabled}*/}
              {/*        onChange={handleDarkModeSwitcher}*/}
              {/*        className={cn(*/}
              {/*          darkModeEnabled ? "bg-gray-900" : "bg-gray-200",*/}
              {/*          "relative ml-auto mr-2 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"*/}
              {/*        )}*/}
              {/*      >*/}
              {/*        <span className="sr-only">Enable Dark Mode</span>*/}
              {/*        <span*/}
              {/*          className={cn(*/}
              {/*            darkModeEnabled ? "translate-x-5" : "translate-x-0",*/}
              {/*            "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-800 shadow ring-0 transition duration-200 ease-in-out"*/}
              {/*          )}*/}
              {/*        >*/}
              {/*          <span*/}
              {/*            className={cn(*/}
              {/*              darkModeEnabled*/}
              {/*                ? "opacity-0 ease-out duration-100"*/}
              {/*                : "opacity-100 ease-in duration-200",*/}
              {/*              "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"*/}
              {/*            )}*/}
              {/*            aria-hidden="true"*/}
              {/*          >*/}
              {/*            <svg*/}
              {/*              xmlns="http://www.w3.org/2000/svg"*/}
              {/*              fill="none"*/}
              {/*              viewBox="0 0 24 24"*/}
              {/*              strokeWidth={2}*/}
              {/*              stroke="currentColor"*/}
              {/*              className="h-3 w-3 text-gray-400"*/}
              {/*            >*/}
              {/*              <path*/}
              {/*                strokeLinecap="round"*/}
              {/*                strokeLinejoin="round"*/}
              {/*                stroke="currentColor"*/}
              {/*                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"*/}
              {/*              />*/}
              {/*            </svg>*/}
              {/*          </span>*/}
              {/*          <span*/}
              {/*            className={cn(*/}
              {/*              darkModeEnabled*/}
              {/*                ? "opacity-100 ease-in duration-200"*/}
              {/*                : "opacity-0 ease-out duration-100",*/}
              {/*              "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"*/}
              {/*            )}*/}
              {/*            aria-hidden="true"*/}
              {/*          >*/}
              {/*            <svg*/}
              {/*              xmlns="http://www.w3.org/2000/svg"*/}
              {/*              fill="none"*/}
              {/*              viewBox="0 0 24 24"*/}
              {/*              strokeWidth={2}*/}
              {/*              stroke="currentColor"*/}
              {/*              className="h-3 w-3 text-indigo-600"*/}
              {/*            >*/}
              {/*              <path*/}
              {/*                strokeLinecap="round"*/}
              {/*                strokeLinejoin="round"*/}
              {/*                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"*/}
              {/*              />*/}
              {/*            </svg>*/}
              {/*          </span>*/}
              {/*        </span>*/}
              {/*      </Switch>*/}
              {/*    </div>*/}
              {/*  )}*/}
              {/*</Menu.Item>*/}
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={cn(
                      active ? "bg-gray-100 dark:bg-gray-900 dark:text-red-500" : "",
                      "flex items-center px-4 py-2 text-md md:text-sm text-red-300 dark:text-red-300"
                    )}
                    onClick={() => signOut()}
                  >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className={"h-4 w-4 pr-2"} />
                    {sidebarText[3].name}
                  </span>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Currency Modal Window */}
      {currencyModalOpen && (
        <CurrencySelectorModal isOpen={currencyModalOpen} onClose={() => setCurrencyModalOpen(false)} />
      )}
      {/* Language Modal Window */}
      {languageModalOpen && (
        <LanguageSelectorModal isOpen={languageModalOpen} onClose={() => setLanguageModalOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;
