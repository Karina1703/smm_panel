"use client";

import { useEffect, useMemo, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import loading from "@app/[locale]/dashboard/loading";
import { cn } from "@lib/cn";
import { useConstants } from "@constants";
import handlePaymentSubmit from "@app/[locale]/dashboard/addfunds/handlers/handlePaymentSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import Meta from "@components/Meta";

const AddFundsClient = ({ currency, email }) => {
  const t = useTranslations("AddFunds");
  const [mounted, setMounted] = useState(false);
  const userEmail = email;
  const { addFundsPaymentGateways } = useConstants();
  const [amount, setAmount] = useState("");
  const [alertWindow, setAlertWindow] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const paymentGatewayMemo = useMemo(() => {
    return addFundsPaymentGateways.map((paymentGateway) => ({
      ...paymentGateway,
      icons: paymentGateway.icons
        ? Object.values(paymentGateway.icons).map((icon) => ({
            icon,
            key: Math.random(),
          }))
        : [],
    }));
  }, []);
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState(paymentGatewayMemo[0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return loading();
  }

  return (
    <>
      <Meta title={t("Add Funds")} />
      <div className={"min-h-full h-full"}>
        <div className={"bg-white dark:bg-gray-900 min-h-full"}>
          <div className="flex flex-1 flex-col md:pl-64">
            <main className="flex-1">
              <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-8">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{t("Add Funds")}</h1>
                  <p className={"text-gray-400 text-sm mt-2"}>
                    {t("Top up your balance and pay for orders instantly")}
                  </p>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  <div className="py-4">
                    {/* Alert --START-- */}

                    {alertWindow && (
                      <div className={"bg-red-100 dark:bg-red-800 dark:bg-opacity-50 rounded-md p-4 mb-6"}>
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                          </div>
                          <div className="ml-3">
                            <h3 className={"text-red-800 dark:text-red-400 text-sm font-medium"}>{alertTitle}</h3>
                            <div className={"text-red-700 dark:text-red-600 mt-2 text-sm"}>
                              <p className={"break-all"}>{alertMessage}</p>
                            </div>
                          </div>
                          <div className="ml-auto pl-3">
                            <div className="-mx-1.5 -my-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setAlertWindow(false);
                                }}
                                className={
                                  "bg-red-50 dark:bg-red-800/50 text-red-500 hover:bg-red-100 inline-flex rounded-md p-1.5 focus:outline-none"
                                }
                              >
                                <span className="sr-only">Dismiss</span>
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Alert --END-- */}
                    <div className={"flex"}>
                      <div className="h-fit w-full rounded-lg bg-gray-200/50 dark:bg-gray-950/50 px-4 py-8 sm:px-8 sm:py-8 shadow ring-1 ring-black ring-opacity-5">
                        <div className={"-mt-4 mb-4"}>
                          <label htmlFor="price" className="text-base font-medium text-gray-900 dark:text-white pt-4">
                            {t("Amount")}
                          </label>
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                                {currency === "RUB" ? "₽" : "$"}
                              </span>
                            </div>
                            <input
                              type="number"
                              inputMode={"numeric"}
                              className="block w-full rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="0"
                              aria-describedby="amount-currency"
                              value={amount}
                              onChange={(e) =>
                                setAmount(
                                  currency !== "RUB"
                                    ? e.target.value > 15000
                                      ? 15000
                                      : e.target.value
                                    : e.target.value > 500000
                                    ? 500000
                                    : e.target.value
                                )
                              }
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                              <span className="text-gray-500 dark:text-gray-400 sm:text-sm" id="price-currency">
                                {currency === "RUB" ? "RUB" : "USD"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <RadioGroup
                          value={selectedPaymentGateway}
                          onChange={(value) => {
                            setSelectedPaymentGateway(value);
                            setIsLoading(false);
                          }}
                        >
                          <RadioGroup.Label className="text-base font-medium text-gray-900 dark:text-white">
                            {t("Payment Method")}
                          </RadioGroup.Label>

                          <div className="mt-4 grid grid-cols-1 gap-y-4 lg:grid-cols-2 xl:grid-cols-3 sm:gap-x-4">
                            {paymentGatewayMemo.map((paymentGateway) => (
                              <RadioGroup.Option
                                key={paymentGateway.title}
                                value={paymentGateway}
                                className={({ checked, active }) =>
                                  cn(
                                    checked ? "border-transparent" : "border-gray-300 dark:border-gray-800",
                                    active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                                    "relative flex cursor-pointer rounded-lg border bg-white dark:bg-gray-900 p-4 shadow-sm focus:outline-none"
                                  )
                                }
                              >
                                {({ checked, active }) => (
                                  <>
                                    <span className="flex flex-1">
                                      <span className="flex flex-col">
                                        <RadioGroup.Label
                                          as="span"
                                          className="block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                          {paymentGateway.title}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description
                                          as="span"
                                          className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400"
                                        >
                                          {paymentGateway.icons.map(({ icon, key }) => (
                                            <Image
                                              key={key}
                                              src={icon}
                                              quality={100}
                                              alt="Payment Method"
                                              width={24}
                                              height={"auto"}
                                              className="mr-1 pointer-events-none"
                                              priority={true}
                                            />
                                          ))}
                                        </RadioGroup.Description>
                                      </span>
                                    </span>
                                    <CheckCircleIcon
                                      className={cn(!checked ? "invisible" : "", "h-5 w-5 text-indigo-600")}
                                      aria-hidden="true"
                                    />
                                    <span
                                      className={cn(
                                        active ? "border" : "border-2",
                                        checked ? "border-indigo-500" : "border-transparent",
                                        "pointer-events-none absolute -inset-px rounded-lg"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                        <button
                          className={cn(
                            isLoading ? "bg-indigo-800 opacity-60" : "bg-indigo-600 hover:bg-indigo-700",
                            "mt-6 text-white flex flex-row items-center focus:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm"
                          )}
                          disabled={isLoading}
                          onClick={() =>
                            handlePaymentSubmit(
                              t,
                              amount,
                              currency,
                              userEmail,
                              alertWindow,
                              setAlertWindow,
                              selectedPaymentGateway,
                              setAlertTitle,
                              setAlertMessage,
                              setIsLoading
                            )
                          }
                        >
                          {isLoading ? (
                            <>
                              <FontAwesomeIcon icon={fa.faSpinner} className={"w-4 h-4 animate-spin mr-2"} />
                              {t("Proceed to payment")}
                            </>
                          ) : (
                            t("Pay")
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFundsClient;
