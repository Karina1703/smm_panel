"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Meta from "@components/Meta";
import AnimatedStickerCompass from "@public/assets/lottie/compass.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCopy } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import API_URL from "@lib/apiUrl";

const Lottie = dynamic(() => import("lottie-react"));

const ServiceListJsonCode = `[
    {
      "serviceId": 1,
      "category": "Instagram",
      "subCategory": "Подписчики",
      "name": "👤 Подписчики",
      "type": "Default",
      "rate1K": 296,
      "rate": 0.296,
      "min": 10,
      "max": 500000,
      "est": "0-1 час",
      "speed": "50K/день",
      "geo": "Весь мир",
      "refill": "30 дней",
      "quality": "Высокое",
      "linkExample": "https://www.instagram.com/username",
      "description": "Укажите ссылку в формате https://www.instagram.com/username/ или имя аккаунта, например @username или username. \\nВажно, чтобы аккаунт был общедоступным.",
      "name_en": "👤 Followers",
      "enabled": true,
      "description_en": "Please provide a link in the format https://www.instagram.com/username/ or the account username, for example @username or username.\\nIt is important that the account is public.",
      "est_en": "0-1 hour",
      "geo_en": "Worldwide",
      "quality_en": "High",
      "refill_en": "30 days",
      "speed_en": "50K/day"
    }
  ]`;

const AddOrderJsonCode = `  {
    "order": 1234
  }
`;

const OrderStatusJsonCode = `  {
    "charge": "2.5995",
    "start_count": null,
    "status": "Pending",
    "remains": "100",
    "currency": "RUB"
  }
`;

const MultipleOrdersStatusJsonCode = `  {
    "1234": {
    "charge": "193.85",
    "start_count": 100,
    "status": "In progress",
    "remains": "870",
    "currency": "RUB"
    },
    "1235": {
    "charge": "22.5995",
    "start_count": null,
    "status": "Pending",
    "remains": "100",
    "currency": "RUB"
    }
  }
`;

const UserBalanceJsonCode = `  {
    "balance": 99.80,
    "currency": "RUB"
  }
`;

function generateNewApiKey() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const apiKeyLength = 32;
  let apiKey = "";
  for (let i = 0; i < apiKeyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    apiKey += characters[randomIndex];
  }
  return apiKey;
}

const ApiClient = () => {
  const t = useTranslations("ApiPage");
  const [isCopied, setIsCopied] = useState(false);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    async function getApiKey() {
      const res = await fetch(`${API_URL}/api/user/key`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setApiKey(await res.json());
    }

    getApiKey();
  }, []);

  const onClickCopy = (event) => {
    navigator.clipboard.writeText(apiKey);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const onChangeApiKey = async () => {
    const newApiKey = generateNewApiKey();
    await fetch(`${API_URL}/api/user/key/update`, {
      method: "POST",
      body: JSON.stringify({ api_key: newApiKey }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setApiKey(newApiKey);
  };

  return (
    <>
      <Meta title={t("API for partners")} />
      <div className={"bg-white dark:bg-gray-900 min-h-full"}>
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-8">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{t("API for partners")}</h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <div className="py-4 bg-gray-200/50 dark:bg-gray-950/50 text-gray-900 dark:text-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <div className="flex flex-row w-full">
                      <div className={"px-5 w-[500px] text-sm sm:text-md"}>
                        <p>{t("Description-1")}</p>
                        <p className={"mt-2"}>{t("Description-2")}</p>
                      </div>
                      {/*<div className="ml-auto mr-10 h-52 w-auto bg-red-300"></div>*/}
                      <Lottie
                        animationData={AnimatedStickerCompass}
                        className={"-mt-4 ml-auto mr-6 h-20 sm:h-52 w-auto mb-8"}
                      />
                    </div>
                    <div className={"px-5 mt-10 sm:-mt-24"}>
                      <label
                        htmlFor="api_key"
                        className="block text-sm sm:text-md font-medium text-gray-900 dark:text-white"
                      >
                        {t("API Key")}
                      </label>
                      <div className="mt-1 relative flex flex-row">
                        {isCopied ? (
                          <div className="absolute inset-x-0 -top-6 flex justify-center items-center text-sm bg-gray-200 dark:bg-gray-800 border-[0.5px] border-gray-300 dark:border-gray-700 rounded-md">
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className={"h-3 w-3 mr-2 text-green-400 dark:text-green-400"}
                            />
                            {t("Key successfully copied")}
                          </div>
                        ) : null}
                        <input
                          type="url"
                          className="block w-full rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 focus:border-indigo-500 focus:ring-indigo-500 text-sm text-green-400 dark:text-green-300"
                          value={apiKey}
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
                      <div className={"mt-4"}>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={onChangeApiKey}
                        >
                          {t("Change key")}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 my-4 bg-gray-200/50 dark:bg-gray-950/50 text-gray-900 dark:text-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <p className={"text-base md:text-2xl mb-2"}>Service list</p>
                    <p className={"font-normal text-sm"}>Use this method to get service list</p>
                    <div className="relative my-3">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300 dark:border-gray-800" />
                      </div>
                    </div>

                    <div className={"mt-3"}>
                      <label className="mt-3 text-sm sm:text-md font-medium text-gray-900 dark:text-white">
                        {t("Request sample")}
                      </label>
                      <div className="mt-1 relative flex flex-row">
                        <pre className="w-full whitespace-pre-wrap break-words text-xs rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 p-4 text-gray-400 dark:text-gray-300">
                          <code>https://smmstats.com/api/v2?key=YourKey&action=services</code>
                        </pre>
                      </div>
                    </div>
                    <div className={"mt-3"}>
                      <label className="mt-3 text-sm sm:text-md font-medium text-gray-900 dark:text-white">
                        {t("Response sample")}
                      </label>
                      <div className="mt-1 relative flex flex-row">
                        <pre className="w-full whitespace-pre-wrap text-xs rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 p-4 text-gray-400 dark:text-gray-300">
                          <code>{ServiceListJsonCode}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 my-4 bg-gray-200/50 dark:bg-gray-950/50 text-gray-900 dark:text-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <p className={"text-base md:text-2xl mb-2"}>Create order</p>
                    <p className={"font-normal text-sm"}>
                      Use this method for creating orders. In case of success it will return id of created order.
                    </p>
                    <div className="relative my-3">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300 dark:border-gray-800" />
                      </div>
                    </div>

                    <div className={"mt-3"}>
                      <label className="mt-3 text-sm sm:text-md font-medium text-gray-900 dark:text-white">
                        {t("Request sample")}
                      </label>
                      <div className="mt-1 relative flex flex-row">
                        <pre className="w-full whitespace-pre-wrap break-words text-xs rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 p-4 text-gray-400 dark:text-gray-300">
                          <code>
                            https://smmstats.com/api/v2?key=YourKey&action=add&service=1&link=example.com/example&quantity=100
                          </code>
                        </pre>
                      </div>
                    </div>
                    <div className={"mt-3"}>
                      <label className="mt-3 text-sm sm:text-md font-medium text-gray-900 dark:text-white">
                        {t("Response sample")}
                      </label>
                      <div className="mt-1 relative flex flex-row">
                        <pre className="w-full whitespace-pre-wrap text-xs rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 p-4 text-gray-400 dark:text-gray-300">
                          <code>{AddOrderJsonCode}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 my-4 bg-gray-200/50 dark:bg-gray-950/50 text-gray-900 dark:text-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <p className={"text-base md:text-2xl mb-2"}>Order status</p>
                    <p className={"font-normal text-sm"}>Use this method to get information about your order.</p>
                    <div className="relative my-3">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300 dark:border-gray-800" />
                      </div>
                    </div>

                    <div className={"mt-3"}>
                      <label className="mt-3 text-sm sm:text-md font-medium text-gray-900 dark:text-white">
                        {t("Request sample")}
                      </label>
                      <div className="mt-1 relative flex flex-row">
                        <pre className="w-full whitespace-pre-wrap break-words text-xs rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 p-4 text-gray-400 dark:text-gray-300">
                          <code>https://smmstats.com/api/v2?key=YourKey&action=status&order=1234</code>
                        </pre>
                      </div>
                    </div>
                    <div className={"mt-3"}>
                      <label className="mt-3 text-sm sm:text-md font-medium text-gray-900 dark:text-white">
                        {t("Response sample")}
                      </label>
                      <div className="mt-1 relative flex flex-row">
                        <pre className="w-full whitespace-pre-wrap text-xs rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 p-4 text-gray-400 dark:text-gray-300">
                          <code>{OrderStatusJsonCode}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 my-4 bg-gray-200/50 dark:bg-gray-950/50 text-gray-900 dark:text-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <p className={"text-base md:text-2xl mb-2"}>Multiple order status</p>
                    <p className={"font-normal text-sm"}>Use this method to get information about your orders.</p>
                    <div className="relative my-3">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300 dark:border-gray-800" />
                      </div>
                    </div>

                    <div className={"mt-3"}>
                      <label className="mt-3 text-sm sm:text-md font-medium text-gray-900 dark:text-white">
                        {t("Request sample")}
                      </label>
                      <div className="mt-1 relative flex flex-row">
                        <pre className="w-full whitespace-pre-wrap break-words text-xs rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 p-4 text-gray-400 dark:text-gray-300">
                          <code>https://smmstats.com/api/v2?key=YourKey&action=status&orders=1234,1235</code>
                        </pre>
                      </div>
                    </div>
                    <div className={"mt-3"}>
                      <label className="mt-3 text-sm sm:text-md font-medium text-gray-900 dark:text-white">
                        {t("Response sample")}
                      </label>
                      <div className="mt-1 relative flex flex-row">
                        <pre className="w-full whitespace-pre-wrap text-xs rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 p-4 text-gray-400 dark:text-gray-300">
                          <code>{MultipleOrdersStatusJsonCode}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 my-4 bg-gray-200/50 dark:bg-gray-950/50 text-gray-900 dark:text-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <p className={"text-base md:text-2xl mb-2"}>Account balance</p>
                    <p className={"font-normal text-sm"}>Use this method to retrieve your account balance.</p>
                    <div className="relative my-3">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300 dark:border-gray-800" />
                      </div>
                    </div>

                    <div className={"mt-3"}>
                      <label className="mt-3 text-sm sm:text-md font-medium text-gray-900 dark:text-white">
                        {t("Request sample")}
                      </label>
                      <div className="mt-1 relative flex flex-row">
                        <pre className="w-full whitespace-pre-wrap break-words text-xs rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 p-4 text-gray-400 dark:text-gray-300">
                          <code>https://smmstats.com/api/v2?key=YourKey&action=balance</code>
                        </pre>
                      </div>
                    </div>
                    <div className={"mt-3"}>
                      <label className="mt-3 text-sm sm:text-md font-medium text-gray-900 dark:text-white">
                        {t("Response sample")}
                      </label>
                      <div className="mt-1 relative flex flex-row">
                        <pre className="w-full whitespace-pre-wrap text-xs rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 p-4 text-gray-400 dark:text-gray-300">
                          <code>{UserBalanceJsonCode}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ApiClient;
