"use client";

import { useState, useEffect, Fragment } from "react";
import AnimatedStickerFlyingDollar from "@public/assets/lottie/flying-dollar.json";
import AnimatedStickerSearch from "@public/assets/lottie/search.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCopy } from "@fortawesome/free-solid-svg-icons";
import loading from "@app/[locale]/dashboard/loading";
import { useLocale, useTranslations } from "next-intl";
import Meta from "@components/Meta";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import AnimatedStickerWallet from "@public/assets/lottie/wallet.json";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@lib/cn";
import { useConstants } from "@constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { payeer, perfectmoney, qiwi, smmstats, webmoney } from "@components/ui/PaymentIcons";
import dynamic from "next/dynamic";
import API_URL from "@lib/apiUrl";

const Lottie = dynamic(() => import("lottie-react"));

const AffiliatesClient = ({ email }) => {
  const { payoutMethods } = useConstants();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const t = useTranslations("AffiliateDashboard");
  const [affiliate, setAffiliate] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState("");
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState(payoutMethods[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [updateAffiliateData, setUpdateAffiliateData] = useState(false);

  useEffect(() => {
    async function getAffiliateData() {
      const res = await fetch(`${API_URL}/api/affiliates`, {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const affiliate = await res.json();
      setAffiliate(affiliate);
      setAffiliateLink(`${process.env.NEXT_PUBLIC_URL}/ref/${affiliate.data.code}`);
      setAmount(affiliate.data.balance);
    }

    getAffiliateData();
  }, [updateAffiliateData]);

  const onClickCopy = (event) => {
    navigator.clipboard.writeText(affiliateLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handlePayoutMethodChange = (value) => {
    setSelectedPayoutMethod(value);
  };

  const handleCreatePayoutRequest = () => {
    async function sendPayoutRequest(payoutData) {
      const res = await fetch(`${API_URL}/api/affiliates/payout`, {
        method: "POST",
        body: JSON.stringify(payoutData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await res.json();
      if (response) {
        setIsLoading(false);
        setPayoutModalOpen(false);
        setUpdateAffiliateData(!updateAffiliateData);
      }
    }

    if (amount >= 10 && amount <= affiliate.data.balance) {
      setIsLoading(true);
      const payoutData = {
        amount: amount,
        payoutMethod: selectedPayoutMethod.title,
        wallet: wallet,
        email: email,
      };
      sendPayoutRequest(payoutData);
    }
  };

  if (!affiliate) {
    return loading();
  }

  return (
    <>
      <Meta title={t("Affiliate Dashboard")} />
      <div className={"min-h-full h-full"}>
        <div className={"bg-white dark:bg-gray-900 min-h-full"}>
          <div className="flex flex-1 flex-col md:pl-64">
            <main className="flex-1">
              <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-8">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{t("Affiliate Dashboard")}</h1>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  <div className="py-4">
                    <div className="py-4 bg-gray-200/50 dark:bg-gray-950/50 text-gray-900 dark:text-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                      <div className="flex flex-row w-full">
                        <div>
                          <p className={"px-5 w-80 text-sm sm:text-md md:text-base"}>
                            {t.rich("Description", {
                              span: (chunks) => <span className={"text-green-400 font-semibold"}>{chunks}</span>,
                            })}
                          </p>
                        </div>
                        {/*<div className="ml-auto mr-10 h-52 w-auto bg-red-300"></div>*/}
                        <Lottie
                          animationData={AnimatedStickerFlyingDollar}
                          className={"-mt-4 ml-auto mr-6 h-20 sm:h-52 w-auto mb-8"}
                        />
                      </div>
                      <div className={"w-80 px-5 sm:-mt-20"}>
                        <label
                          htmlFor="afiliate_link"
                          className="block text-sm sm:text-md font-medium text-gray-900 dark:text-white"
                        >
                          {t("Affiliate Link")}
                        </label>
                        <div className="mt-1 relative">
                          {isCopied ? (
                            <div className="absolute inset-x-0 -top-6 flex justify-center items-center text-sm bg-gray-200 dark:bg-gray-800 border-[0.5px] border-gray-300 dark:border-gray-700 rounded-md">
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                className={"h-3 w-3 mr-2 text-green-400 dark:text-green-400"}
                              />
                              {t("Link copied")}
                            </div>
                          ) : null}
                          <input
                            type="url"
                            className="block w-full rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 focus:border-indigo-500 focus:ring-indigo-500 text-sm dark:text-gray-400"
                            value={affiliateLink}
                            readOnly
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <FontAwesomeIcon
                              icon={faCopy}
                              className={
                                "h-5 w-5 text-gray-300 dark:text-gray-500 hover:text-gray-400 dark:hover:text-gray-400"
                              }
                              onClick={onClickCopy}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-3 gap gap-4 mt-4">
                      <div className="p-4 bg-gray-200/50 dark:bg-gray-950/50 text-gray-900 dark:text-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                        <div className="flex flex-col">
                          <p className={"text-3xl mb-1"}>{affiliate.data.visits}</p>
                          <p className={"font-light text-sm"}>{t("Visits")}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-200/50 dark:bg-gray-950/50 text-gray-900 dark:text-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                        <div className="flex flex-col">
                          <p className={"text-3xl mb-1"}>{affiliate.data.referrals}</p>
                          <p className={"font-light text-sm"}>{t("Registrations")}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-200/50 dark:bg-gray-950/50 text-gray-900 dark:text-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                        <div className="flex flex-col">
                          <p className={"text-3xl mb-1"}>
                            {(affiliate.data.earned || 0).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              maximumFractionDigits: 2,
                            })}
                          </p>
                          <p className={"font-light text-sm"}>{t("Earned")}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-gray-200/50 dark:bg-gray-950/50 text-gray-900 dark:text-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                      <div className="flex flex-row text-sm items-center">
                        <span>
                          {t("Available for withdrawal")}:{" "}
                          {affiliate.data.balance.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        {affiliate.data.balance < 10 ? (
                          <span className={"ml-auto text-md"}>{t("Minimum withdrawal amount")} $10.00</span>
                        ) : (
                          <button
                            className={
                              "ml-auto bg-indigo-600 hover:bg-indigo-700 text-white flex flex-row items-center focus:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 justify-center rounded-md border border-transparent py-2 px-1 sm:py-2 sm:px-4 text-sm font-medium shadow-sm"
                            }
                            onClick={(e) => setPayoutModalOpen(true)}
                          >
                            {t("Payout")}
                          </button>
                        )}
                      </div>
                    </div>
                    {/* Affiliate PAYOUTS table -- START*/}
                    {affiliate?.payouts.length > 0 ? (
                      <div className="mt-4 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 mx-0 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-800">
                          <thead className="bg-gray-50 dark:bg-gray-950/50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:pl-6"
                              >
                                {t("Amount")}
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                {t("Payment system")}
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                {t("Wallet")}
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                {t("Created at")}
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                {t("Status")}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-950/50 dark:divide-gray-800">
                            {affiliate.payouts
                              .map((payout) => {
                                const dateString = payout.createdAt;
                                const date = new Date(dateString);
                                const formattedDate = date.toLocaleDateString(
                                  locale === "en" ? "en-US" : locale === "uk" ? "ru-RU" : "ru-RU",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                );
                                return (
                                  <tr key={payout.payoutId}>
                                    <td className="py-4 pl-4 pr-3 text-xs sm:text-sm font-medium text-gray-900 dark:text-white sm:w-auto sm:max-w-none sm:pl-6">
                                      {payout.amount.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                        maximumFractionDigits: 2,
                                      })}
                                    </td>
                                    <td className="px-3 py-4 flex flex-row items-center text-xs sm:text-sm text-gray-500 dark:text-white">
                                      <Image
                                        src={
                                          payout.payoutMethod === "QIWI"
                                            ? qiwi
                                            : payout.payoutMethod === "Payeer"
                                            ? payeer
                                            : payout.payoutMethod === "Prefect Money"
                                            ? perfectmoney
                                            : payout.payoutMethod === "SMMSTATS.COM"
                                            ? smmstats
                                            : payout.payoutMethod === "WebMoney (WMZ)"
                                            ? webmoney
                                            : smmstats
                                        }
                                        alt={"Payout Method"}
                                        width={64}
                                        height={64}
                                        className={"mr-2 w-6 h-6"}
                                        quality={100}
                                      />
                                      {payout.payoutMethod}
                                    </td>
                                    <td className="px-3 py-4 text-xs sm:text-sm text-gray-500 dark:text-white">
                                      {payout.wallet}
                                    </td>
                                    <td className="px-3 py-4 text-xs sm:text-sm text-gray-500 dark:text-white">
                                      {formattedDate}
                                    </td>
                                    <td className="px-3 py-4 text-xs sm:text-sm text-gray-500 dark:text-white">
                                      {payout.status === 0 ? (
                                        <p className={"text-indigo-400"}>{t("Waiting")}</p>
                                      ) : payout.status === 1 ? (
                                        <p className={"text-green-400"}>{t("Paid")}</p>
                                      ) : payout.status === 2 ? (
                                        <p className={"text-red-400"}>{t("Canceled")}</p>
                                      ) : (
                                        <p className={"text-indigo-400"}>{t("Waiting")}</p>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })
                              .reverse()}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                    {/* Affiliate PAYOUTS table -- END*/}

                    {/* Affiliate REFERRALS table -- START*/}
                    {affiliate?.referrals.length > 0 ? (
                      <div className="mt-4 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 mx-0 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-800">
                          <thead className="bg-gray-50 dark:bg-gray-950/50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:pl-6"
                              >
                                {t("User")}
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                {t("Joined")}
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                {t("Profit")}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-950/50 dark:divide-gray-800">
                            {affiliate.referrals
                              .map((referral) => {
                                const dateString = referral.createdAt;
                                const date = new Date(dateString);
                                const formattedDate = date.toLocaleDateString(
                                  locale === "en" ? "en-US" : locale === "uk" ? "ru-RU" : "ru-RU",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                );
                                return (
                                  <tr key={referral.email}>
                                    <td className="py-4 pl-4 pr-3 text-xs sm:text-sm font-medium text-gray-900 dark:text-white sm:w-auto sm:max-w-none sm:pl-6">
                                      {referral.email}
                                    </td>
                                    <td className="px-3 py-4 text-xs sm:text-sm text-gray-500 dark:text-white">
                                      {formattedDate}
                                    </td>
                                    <td className="px-3 py-4 text-xs sm:text-sm text-gray-500 dark:text-white">
                                      {referral.referrer_earned.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                        maximumFractionDigits: 2,
                                      })}
                                    </td>
                                  </tr>
                                );
                              })
                              .reverse()}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="mt-4 py-12 text-center bg-gray-200 dark:bg-gray-950/50 shadow ring-1 ring-black ring-opacity-5 mx-0 rounded-lg">
                        <Lottie animationData={AnimatedStickerSearch} className="mx-auto h-32 w-32" />
                        <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">{t("No referrals")}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {t("Get started by promoting your affiliate link")}
                        </p>
                      </div>
                    )}
                    {/* Affiliate REFERRALS table -- END*/}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Payout modal window */}
      <Transition.Root show={payoutModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setPayoutModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform rounded-lg bg-white dark:bg-gray-900 p-6 my-8 w-full text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-200/50 dark:bg-gray-900/30">
                      <Lottie animationData={AnimatedStickerWallet} loop={true} />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        {t("Withdraw affiliate system balance")}
                      </Dialog.Title>
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                          {t("Amount")}
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            className="block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <Listbox value={selectedPayoutMethod} onChange={(value) => handlePayoutMethodChange(value)}>
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                {t("Payment system")}
                              </Listbox.Label>
                              <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                  <span className="flex flex-row items-center w-full truncate">
                                    <span className={"w-5 h-5 mr-2"}>
                                      <Image
                                        className={"pointer-events-none"}
                                        src={selectedPayoutMethod.icon}
                                        alt="Payout Method"
                                        width={24}
                                        height={24}
                                      />
                                    </span>
                                    <span className="truncate">{selectedPayoutMethod.title}</span>
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-100 dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {payoutMethods.map((pMethod) => (
                                      <Listbox.Option
                                        key={pMethod.title}
                                        className={({ active }) =>
                                          cn(
                                            active ? "text-white bg-indigo-600" : "text-gray-900 dark:text-white",
                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={pMethod}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <div className="flex flex-row items-center">
                                              <span className={"w-5 h-5 mr-2"}>
                                                <Image
                                                  className={"pointer-events-none"}
                                                  src={pMethod.icon}
                                                  alt="Payout Method"
                                                  width={24}
                                                  height={24}
                                                />
                                              </span>

                                              <span
                                                className={cn(selected ? "font-semibold" : "font-normal", "truncate")}
                                              >
                                                {pMethod.title}
                                              </span>
                                            </div>

                                            {selected ? (
                                              <span
                                                className={cn(
                                                  active ? "text-white" : "text-indigo-600",
                                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                                )}
                                              >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                          {t("Wallet")}
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <input
                            type="text"
                            className="block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            onChange={(event) => setWallet(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="w-full border-t border-gray-300 dark:border-gray-800 my-4" />
                      <div>
                        <button
                          type="button"
                          className={cn(
                            isLoading ? "bg-indigo-800 opacity-60" : "bg-indigo-600 hover:bg-indigo-700",
                            "mt-6 text-white flex flex-row items-center focus:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm"
                          )}
                          disabled={isLoading}
                          onClick={() => handleCreatePayoutRequest()}
                        >
                          {t("Create request")}
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AffiliatesClient;
