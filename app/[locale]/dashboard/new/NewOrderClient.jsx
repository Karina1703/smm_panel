"use client";

import { useLocale, useTranslations } from "next-intl";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Listbox, Transition, Dialog, Disclosure } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
  ClockIcon,
  TruckIcon,
  TrophyIcon,
  GlobeAltIcon,
  HashtagIcon,
  XCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import loading from "@app/[locale]/dashboard/loading";
import { getCookie } from "cookies-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons";
import { useConstants } from "@constants";
import onSubmitOrder from "./handlers/onSubmitOrder";
import Image from "next/image";
import { cn } from "@lib/cn";
import Meta from "@components/Meta";
import API_URL from "@lib/apiUrl";

const NewOrderClient = ({ email }) => {
  const t = useTranslations("Order");
  const { categories } = useConstants();
  const [balance, setBalance] = useState(null);
  const categoriesMemo = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      image: category.image,
    }));
  }, []);
  const [selectedCategory, setSelectedCategory] = useState(categoriesMemo[0]);
  const [services, setServices] = useState();
  const [selectedService, setSelectedService] = useState(null);
  const [types, setTypes] = useState(Object.values(selectedCategory.subCategories));
  const [selectedType, setSelectedType] = useState(types[0]);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [currency, setCurrency] = useState(getCookie("user_currency") || process.env.NEXT_PUBLIC_DEFAULT_CURRENCY);
  const formatLocale =
    currency === "RUB" ? "ru-RU" : currency === "USD" ? "en-US" : currency === "EUR" ? "de-DE" : "en-US";
  const [currencyRate, setCurrencyRate] = useState(null);
  const [updateBalance, setUpdateBalance] = useState(false);
  const locale = useLocale();
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [alertWindow, setAlertWindow] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const userEmail = email;
  const [isLoading, setIsLoading] = useState(false);
  const [newOrderButtonDisabled, setNewOrderButtonDisabled] = useState(false);
  const [customComments, setCustomComments] = useState("");
  const [mentionsHashtag, setMentionsHashtag] = useState("");
  const [mentionsWithHashtags, setMentionsWithHashtags] = useState("");
  const [mentionsWithHashtagsUsernames, setMentionsWithHashtagsUsernames] = useState("");
  const [mentionsCustomList, setMentionsCustomList] = useState("");
  const [mentionsUserFollowers, setMentionsUserFollowers] = useState("");
  const [customCommentsPackage, setCustomCommentsPackage] = useState("");

  // USE EFFECTS

  useEffect(() => {
    async function fetchServices() {
      const res = await fetch(`${API_URL}/api/services?category=${selectedCategory.name}&type=${selectedType.tag}`, {
        next: { revalidate: 60 },
        headers: {
          "Content-Type": "application/json",
        },
      });

      const servicesData = await res.json();

      setServices(servicesData);
      setSelectedService(servicesData[0]);
    }
    fetchServices();
  }, [selectedCategory, selectedType]);

  useEffect(() => {
    async function getCurrencyRate() {
      if (currency !== "RUB") {
        const res = await fetch(`${API_URL}/api/currencies/rate?currency=${currency}`, {
          next: { revalidate: 60 },
          headers: {
            "Content-Type": "application/json",
          },
        });
        setCurrencyRate(await res.json());
      }
    }
    getCurrencyRate();
  }, []);

  useEffect(() => {
    async function getBalance() {
      const res = await fetch(`${API_URL}/api/user/balance?email=${userEmail}`, {
        cache: "no-store",
        next: { revalidate: 5 },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBalance(await res.json());
    }

    getBalance();
  }, [updateBalance]);

  // HANDLERS

  const onChangeCategory = (value) => {
    setSelectedCategory(value);
    setTypes(Object.values(value.subCategories));
    setSelectedType(Object.values(value.subCategories)[0]);
    const price = quantity * selectedService.rate;
    setQuantity("");
    setPrice("");
    setLink("");
  };

  const onChangeType = (value) => {
    setSelectedType(value);
    setQuantity("");
    setPrice("");
    setLink("");
  };

  const onChangeService = (value) => {
    setSelectedService(value);
    setPrice(
      value.type === "Package"
        ? value.rate1K * quantity
        : value.type === "Custom Comments Package"
        ? value.rate1K * 1
        : value.rate * quantity
    );
    setCustomComments("");
    setMentionsHashtag("");
    setMentionsCustomList("");
    setMentionsUserFollowers("");
    setCustomCommentsPackage("");
  };

  const onChangeQuantity = (event) => {
    let newQuantity = event.target.value;
    if (newQuantity < selectedService.min) {
      setQuantity(newQuantity);
    } else if (newQuantity > selectedService.max) {
      newQuantity = selectedService.max;
      setQuantity(selectedService.max);
    } else {
      setQuantity(newQuantity);
    }
    const newPrice =
      selectedService.type === "Package" ? newQuantity * selectedService.rate1K : newQuantity * selectedService.rate;
    setPrice(newPrice);
  };

  const onChangeCustomList = (event) => {
    const textareaValue = event.target.value;
    if (selectedService.type === "Custom Comments") {
      setCustomComments(textareaValue);
    } else if (selectedService.type === "Mentions Custom List") {
      setMentionsCustomList(textareaValue);
    }

    // Разбиваем значение textarea на строки
    const lines = textareaValue.split("\n");

    // Фильтруем строки, оставляя только непустые строки
    const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

    // Устанавливаем количество непустых строк
    setQuantity(nonEmptyLines.length);
    setPrice(nonEmptyLines.length * selectedService.rate);
  };

  if (!services && !selectedService) {
    return loading();
  }

  return (
    <>
      <Meta title={t("New Order")} />
      <div className={"bg-white dark:bg-gray-900 min-h-full"}>
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-8">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{t("New Order")}</h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  {/* Alert --START-- */}

                  {alertWindow && (
                    <div
                      className={cn(
                        alertError
                          ? "bg-red-100 dark:bg-red-800 dark:bg-opacity-50"
                          : "bg-green-100 dark:bg-green-800 dark:bg-opacity-50",
                        "rounded-md p-4 mb-6"
                      )}
                    >
                      <div className="flex">
                        <div className="flex-shrink-0">
                          {alertError ? (
                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                          ) : (
                            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                          )}
                        </div>
                        <div className="ml-3">
                          <h3
                            className={cn(
                              alertError ? "text-red-800 dark:text-red-400" : "text-green-800 dark:text-green-400",
                              "text-sm font-medium text-green-800 dark:text-green-400"
                            )}
                          >
                            {alertTitle}
                          </h3>
                          <div
                            className={cn(
                              alertError ? "text-red-700 dark:text-red-600" : "text-green-700 dark:text-green-600",
                              "mt-2 text-sm"
                            )}
                          >
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
                              className={cn(
                                alertError
                                  ? "bg-red-50 dark:bg-red-800/50 text-red-500 hover:bg-red-100"
                                  : "bg-green-50 dark:bg-green-800/50 text-green-500 hover:bg-green-100",
                                "inline-flex rounded-md p-1.5 focus:outline-none"
                              )}
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

                  {/*<div className="h-96 rounded-lg border-4 border-dashed border-gray-950/50" />*/}
                  <div className={"grid grid-cols-1 lg:grid-cols-2 gap-6"}>
                    <div className="h-fit rounded-lg bg-gray-200/50 dark:bg-gray-950/50 px-4 py-6 sm:px-8 sm:py-8 shadow ring-1 ring-black ring-opacity-5">
                      <div name={"category"}>
                        <Listbox value={selectedCategory} onChange={onChangeCategory}>
                          {({ open }) => (
                            <>
                              <Listbox.Label className="pb-2 mt-[-8px] block text-sm font-semibold text-gray-700 dark:text-gray-100">
                                {t("Category")}
                              </Listbox.Label>
                              <div className="relative">
                                <Listbox.Button className="relative w-full cursor-default rounded-md text-gray-900 dark:text-white border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                  <span className="flex items-center h-6">
                                    <Image
                                      priority={true}
                                      src={selectedCategory.image}
                                      alt={selectedCategory.name}
                                      width={128}
                                      height={128}
                                      quality={100}
                                      className={"h-6 w-6"}
                                    />
                                    <span className="ml-3 block truncate">{selectedCategory.name}</span>
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {categoriesMemo.map((category) => (
                                      <Listbox.Option
                                        key={category.id}
                                        className={({ active }) =>
                                          cn(
                                            active ? "text-white bg-indigo-600" : "text-gray-900 dark:text-white",
                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={category}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <div className="flex items-center">
                                              <Image
                                                src={category.image}
                                                alt={category.name}
                                                width={128}
                                                height={128}
                                                quality={100}
                                                className={"h-6 w-6"}
                                              />
                                              <span
                                                className={cn(
                                                  selected ? "font-semibold" : "font-normal",
                                                  "ml-3 block truncate"
                                                )}
                                              >
                                                {category.name}
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
                      <div name={"type"}>
                        <Listbox value={selectedType} onChange={onChangeType}>
                          {({ open }) => (
                            <>
                              <Listbox.Label className="py-2 block text-sm font-semibold text-gray-700 dark:text-gray-100">
                                {t("Type")}
                              </Listbox.Label>
                              <div className="relative">
                                <Listbox.Button className="relative w-full cursor-default rounded-md text-gray-900 dark:text-white border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                  <span className="flex items-center h-6">
                                    <FontAwesomeIcon icon={selectedType.icon} className="h-5 w-5 flex-shrink-0" />
                                    <span className="ml-3 block truncate ">{selectedType.name}</span>
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {types.map((type) => (
                                      <Listbox.Option
                                        key={type.name}
                                        className={({ active }) =>
                                          cn(
                                            active ? "text-white bg-indigo-600" : "text-gray-900 dark:text-white",
                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={type}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <div className="flex items-center">
                                              <FontAwesomeIcon icon={type.icon} className="h-5 w-5 flex-shrink-0" />
                                              <span
                                                className={cn(
                                                  selected ? "font-semibold" : "font-normal",
                                                  "ml-3 block truncate"
                                                )}
                                              >
                                                {type.name}
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
                      <div name={"service"}>
                        <Listbox value={selectedService} onChange={onChangeService}>
                          {({ open }) => (
                            <>
                              <Listbox.Label className="py-2 flex flex-row items-center text-sm font-semibold text-gray-700 dark:text-gray-100">
                                {t("Service")}
                                <span className="ml-auto">
                                  <FontAwesomeIcon
                                    icon={fa.faCircleQuestion}
                                    className={
                                      "w-3 h-3 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 opacity-75"
                                    }
                                    onClick={() => setInfoModalOpen(true)}
                                  />
                                </span>
                              </Listbox.Label>
                              <div className="relative">
                                <Listbox.Button className="relative w-full cursor-default rounded-md text-gray-900 dark:text-white border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                  <span className="flex items-center h-6">
                                    <span className="block truncate">
                                      <span className={"inline-flex px-2 bg-indigo-500 rounded-md mr-2 text-white"}>
                                        ID {selectedService.serviceId}
                                      </span>
                                      {locale === "ru" ? `${selectedService.name}` : `${selectedService.name_en}`}
                                      {currency === "USD"
                                        ? ` - ${new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 2,
                                          }).format(selectedService.rate1K / currencyRate)}`
                                        : currency === "EUR"
                                        ? ` - ${new Intl.NumberFormat("de-DE", {
                                            style: "currency",
                                            currency: "EUR",
                                            maximumFractionDigits: 2,
                                          }).format(selectedService.rate1K / currencyRate)}`
                                        : ` - ${new Intl.NumberFormat("ru-RU", {
                                            style: "currency",
                                            currency: "RUB",
                                            maximumFractionDigits: 2,
                                          }).format(selectedService.rate1K)}`}
                                    </span>
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {services.map((service) => (
                                      <Listbox.Option
                                        key={service.serviceId}
                                        className={({ active }) =>
                                          cn(
                                            active ? "text-white bg-indigo-600" : "text-gray-900 dark:text-white",
                                            "relative cursor-default select-none py-2 pr-9"
                                          )
                                        }
                                        value={service}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <div className="flex items-center">
                                              <span
                                                className={cn(
                                                  selected ? "font-semibold" : "font-normal",
                                                  "ml-3 block text-overflow"
                                                )}
                                              >
                                                <span
                                                  className={
                                                    "inline-flex px-2 bg-indigo-500 rounded-md mr-2 text-white"
                                                  }
                                                >
                                                  ID {service.serviceId}
                                                </span>
                                                {locale === "ru" ? `${service.name}` : `${service.name_en}`}
                                                {currency === "USD"
                                                  ? ` - ${new Intl.NumberFormat("en-US", {
                                                      style: "currency",
                                                      currency: "USD",
                                                      maximumFractionDigits: 2,
                                                    }).format(service.rate1K / currencyRate)}`
                                                  : currency === "EUR"
                                                  ? ` - ${new Intl.NumberFormat("de-DE", {
                                                      style: "currency",
                                                      currency: "EUR",
                                                      maximumFractionDigits: 2,
                                                    }).format(service.rate1K / currencyRate)}`
                                                  : ` - ${new Intl.NumberFormat("ru-RU", {
                                                      style: "currency",
                                                      currency: "RUB",
                                                      maximumFractionDigits: 2,
                                                    }).format(service.rate1K)}`}
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
                      <hr className={"mt-6 mb-2 h-px border-t-0 bg-gray-300 dark:bg-gray-700 opacity-100 w-full"} />
                      <div name={"link"}>
                        <label className="py-2 block text-sm font-semibold text-gray-700 dark:text-gray-100">
                          {t("Link")}
                        </label>
                        <div className="">
                          <input
                            type={"text"}
                            className="block w-full h-[42px] rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder={selectedService.linkExample || "Enter the link"}
                            onChange={(event) => {
                              setLink(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div name={"quantity"}>
                        {selectedService.type !== "Custom Comments Package" ? (
                          <>
                            <label className="py-2 block text-sm font-semibold text-gray-700 dark:text-gray-100">
                              {t("Quantity")}
                            </label>
                            <div className="">
                              <input
                                type={"number"}
                                inputMode={"numeric"}
                                name="quantity"
                                value={quantity}
                                className="block w-full h-[42px] rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                onChange={(event) => onChangeQuantity(event)}
                                placeholder={`${t("From")} ${selectedService.min} ${t("to")} ${selectedService.max}`}
                                min={selectedService ? selectedService.min : 1}
                                max={selectedService ? selectedService.max : 100}
                                disabled={
                                  selectedService.type === "Custom Comments" ||
                                  selectedService.type === "Mentions Custom List"
                                }
                              />
                            </div>
                          </>
                        ) : null}
                      </div>
                      {selectedService.type === "Custom Comments" ? (
                        <div name={"custom-comments"}>
                          <label className="py-2 block text-sm font-semibold text-gray-700 dark:text-gray-100">
                            Comments (1 per line)
                          </label>
                          <div className="">
                            <textarea
                              rows={4}
                              name="comment"
                              id="comment"
                              className="block w-full min-h-[42px] rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              value={customComments}
                              onChange={(event) => onChangeCustomList(event)}
                            />
                          </div>
                        </div>
                      ) : selectedService.type === "Mentions Hashtag" ? (
                        <div name={"mentions-hashtag"}>
                          <label className="py-2 block text-sm font-semibold text-gray-700 dark:text-gray-100">
                            Hashtag
                          </label>
                          <div className="">
                            <input
                              type={"text"}
                              className="block w-full h-[42px] rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder={""}
                              value={mentionsHashtag}
                              onChange={(event) => setMentionsHashtag(event.target.value)}
                            />
                          </div>
                        </div>
                      ) : selectedService.type === "Mentions with Hashtags" ? (
                        <>
                          <div name={"mentions-with-hashtags-usernames"}>
                            <label className="py-2 block text-sm font-semibold text-gray-700 dark:text-gray-100">
                              Usernames (1 per line)
                            </label>
                            <div className="">
                              <textarea
                                rows={4}
                                name="usernames"
                                id="usernames"
                                className="block w-full min-h-[42px] rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={mentionsWithHashtagsUsernames}
                                onChange={(event) => setMentionsWithHashtagsUsernames(event.target.value)}
                              />
                            </div>
                          </div>
                          <div name={"mentions-with-hashtags"}>
                            <label className="py-2 block text-sm font-semibold text-gray-700 dark:text-gray-100">
                              Hashtags (1 per line)
                            </label>
                            <div className="">
                              <textarea
                                rows={4}
                                name="hashtags"
                                id="hashtags"
                                className="block w-full min-h-[42px] rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={mentionsWithHashtags}
                                onChange={(event) => setMentionsWithHashtags(event.target.value)}
                              />
                            </div>
                          </div>
                        </>
                      ) : selectedService.type === "Mentions Custom List" ? (
                        <div name={"mentions-custom-list-usernames"}>
                          <label className="py-2 block text-sm font-semibold text-gray-700 dark:text-gray-100">
                            Usernames (1 per line)
                          </label>
                          <div className="">
                            <textarea
                              rows={4}
                              name="usernames-custom"
                              id="usernames-custom"
                              className="block w-full min-h-[42px] rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              value={mentionsCustomList}
                              onChange={(event) => onChangeCustomList(event)}
                            />
                          </div>
                        </div>
                      ) : selectedService.type === "Mentions User Followers" ? (
                        <div name={"mentions-user-followers"}>
                          <label className="py-2 block text-sm font-semibold text-gray-700 dark:text-gray-100">
                            Username
                          </label>
                          <div className="">
                            <input
                              type={"text"}
                              className="block w-full h-[42px] rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder={""}
                              value={mentionsUserFollowers}
                              onChange={(event) => setMentionsUserFollowers(event.target.value)}
                            />
                          </div>
                        </div>
                      ) : selectedService.type === "Custom Comments Package" ? (
                        <div name={"custom-comments-package"}>
                          <label className="py-2 block text-sm font-semibold text-gray-700 dark:text-gray-100">
                            Comments (1 per line)
                          </label>
                          <div className="">
                            <textarea
                              rows={4}
                              name="custom-comments-package"
                              id="custom-comments-package"
                              className="block w-full min-h-[42px] rounded-md text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              value={customCommentsPackage}
                              onChange={(event) => setCustomCommentsPackage(event.target.value)}
                            />
                          </div>
                        </div>
                      ) : null}
                      <hr className={"my-4 h-px border-t-0 bg-gray-300 dark:bg-gray-700 opacity-100"} />
                      <div name="price" className={"flex flex-row items-center mb-4 text-gray-900 dark:text-white"}>
                        <span>
                          {t("Amount")} – {quantity}
                        </span>
                        <span className={"ml-auto"}>
                          {currency === "USD"
                            ? `${new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 2,
                              }).format(price / currencyRate)}`
                            : currency === "EUR"
                            ? `${new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                                maximumFractionDigits: 2,
                              }).format(price / currencyRate)}`
                            : `${new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                maximumFractionDigits: 2,
                              }).format(price)}`}
                        </span>
                      </div>
                      <div name={"button"}>
                        <button
                          onClick={(event) =>
                            onSubmitOrder(
                              event,
                              t,
                              email,
                              price,
                              balance,
                              quantity,
                              link,
                              customComments,
                              mentionsHashtag,
                              mentionsWithHashtags,
                              mentionsWithHashtagsUsernames,
                              mentionsCustomList,
                              mentionsUserFollowers,
                              customCommentsPackage,
                              selectedService,
                              currency,
                              currencyRate,
                              setQuantity,
                              setPrice,
                              setCustomComments,
                              setMentionsHashtag,
                              setMentionsWithHashtags,
                              setMentionsWithHashtagsUsernames,
                              setMentionsCustomList,
                              setMentionsUserFollowers,
                              setCustomCommentsPackage,
                              setAlertWindow,
                              setAlertError,
                              setAlertTitle,
                              setAlertMessage,
                              setIsLoading,
                              setNewOrderButtonDisabled,
                              setUpdateBalance,
                              updateBalance,
                              formatLocale
                            )
                          }
                          className={cn(
                            balance < price || newOrderButtonDisabled
                              ? "bg-indigo-900 text-white text-opacity-50"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white",
                            "flex flex-row items-center focus:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm"
                          )}
                          disabled={balance < price || newOrderButtonDisabled}
                        >
                          {isLoading ? (
                            <>
                              <FontAwesomeIcon icon={fa.faSpinner} className={"w-4 h-4 animate-spin mr-2"} />
                              {t("Creating order")}
                            </>
                          ) : (
                            <>
                              {balance < price
                                ? `${t("Insufficient")} ${(currency !== "RUB"
                                    ? price / currencyRate - balance / currencyRate
                                    : price - balance
                                  ).toLocaleString(formatLocale, {
                                    style: "currency",
                                    currency: currency,
                                    maximumFractionDigits: 2,
                                  })}`
                                : t("Create order")}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="h-fit rounded-lg bg-gray-200/50 dark:bg-gray-950/50 px-4 py-6 sm:px-8 sm:py-8 shadow ring-1 ring-black ring-opacity-5">
                      <span className={"block text-gray-900 dark:text-white font-medium text-lg mt-[-0.5rem] mb-2"}>
                        {t("Service specifications")}
                      </span>
                      <div className="flex flex-row mb-2 w-full text-gray-900 dark:text-white">
                        <span className={"text-md font-light"}>{t("Service ID")}</span>
                        <span className={"ml-auto"}>{selectedService ? selectedService.serviceId : "--"}</span>
                      </div>
                      <div className="flex flex-row mb-4 w-full text-gray-900 dark:text-white">
                        <span className={"text-md font-light"}>
                          {selectedService.type === "Package" || selectedService.type === "Custom Comments Package"
                            ? t("Price for Package")
                            : t("Price for 1000")}
                        </span>
                        <span className={"ml-auto"}>
                          {selectedService.type === "Package" || selectedService.type === "Custom Comments Package"
                            ? currency === "USD"
                              ? `${new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  maximumFractionDigits: 2,
                                }).format(selectedService.rate1K / currencyRate)}`
                              : currency === "EUR"
                              ? `${new Intl.NumberFormat("de-DE", {
                                  style: "currency",
                                  currency: "EUR",
                                  maximumFractionDigits: 2,
                                }).format(selectedService.rate1K / currencyRate)}`
                              : `${new Intl.NumberFormat("ru-RU", {
                                  style: "currency",
                                  currency: "RUB",
                                  maximumFractionDigits: 2,
                                }).format(selectedService.rate1K)}`
                            : currency === "USD"
                            ? `${new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 2,
                              }).format(selectedService.rate1K / currencyRate)}`
                            : currency === "EUR"
                            ? `${new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                                maximumFractionDigits: 2,
                              }).format(selectedService.rate1K / currencyRate)}`
                            : `${new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                maximumFractionDigits: 2,
                              }).format(selectedService.rate1K)}`}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-gray-900 dark:text-white">
                        <div name={"refill"} className={"col-span-2"}>
                          <div
                            className="bg-gray-300/50 dark:bg-gray-950/50 rounded-lg py-2 px-4 flex flex-row relative group hover:cursor-pointer"
                            onClick={() => setInfoModalOpen(true)}
                          >
                            <span className="absolute top-[-2px] right-[5px]">
                              <FontAwesomeIcon
                                icon={fa.faCircleQuestion}
                                className={
                                  "w-3 h-3 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 opacity-75"
                                }
                              />
                            </span>
                            {/*<Lottie*/}
                            {/*  animationData={AnimatedStickerRefill}*/}
                            {/*  className={"h-6 w-6"}*/}
                            {/*/>*/}
                            <ShieldCheckIcon className={"h-6 w-6 text-indigo-600 dark:text-indigo-500"} />
                            <span className="ml-4 uppercase font-light">{t("Refill")}</span>
                            <span className="mx-auto">
                              {selectedService
                                ? locale !== "ru"
                                  ? selectedService.refill_en
                                  : selectedService.refill
                                : "--"}
                            </span>
                          </div>
                        </div>
                        <div name={"start"}>
                          <div
                            className="bg-gray-300/50 dark:bg-gray-950/50 rounded-lg py-3 flex flex-col items-center relative group hover:cursor-pointer"
                            onClick={() => setInfoModalOpen(true)}
                          >
                            <span className="absolute top-[-2px] right-[5px]">
                              <FontAwesomeIcon
                                icon={fa.faCircleQuestion}
                                className={
                                  "w-3 h-3 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 opacity-75"
                                }
                              />
                            </span>
                            {/*<Lottie*/}
                            {/*  animationData={AnimatedStickerStart}*/}
                            {/*  className={"h-7 w-7"}*/}
                            {/*/>*/}
                            <ClockIcon className={"h-6 w-6 text-indigo-600 dark:text-indigo-500"} />
                            <span className="uppercase font-light mt-2">{t("Start")}</span>
                            <span className="mx-auto">
                              {selectedService
                                ? locale !== "ru"
                                  ? selectedService.est_en
                                  : selectedService.est
                                : "--"}
                            </span>
                          </div>
                        </div>
                        <div name={"speed"}>
                          <div
                            className="bg-gray-300/50 dark:bg-gray-950/50 rounded-lg py-3 flex flex-col items-center relative group hover:cursor-pointer"
                            onClick={() => setInfoModalOpen(true)}
                          >
                            <span className="absolute top-[-2px] right-[5px]">
                              <FontAwesomeIcon
                                icon={fa.faCircleQuestion}
                                className={
                                  "w-3 h-3 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 opacity-75"
                                }
                              />
                            </span>
                            {/*<Lottie*/}
                            {/*  animationData={AnimatedStickerSpeed}*/}
                            {/*  className={"h-7 w-7"}*/}
                            {/*/>*/}
                            <TruckIcon className={"h-6 w-6 text-indigo-600 dark:text-indigo-500"} />
                            <span className="uppercase font-light mt-2">{t("Speed")}</span>
                            <span className="mx-auto">
                              {selectedService
                                ? locale !== "ru"
                                  ? selectedService.speed_en
                                  : selectedService.speed
                                : "--"}
                            </span>
                          </div>
                        </div>
                        <div name={"quality"}>
                          <div
                            className="bg-gray-300/50 dark:bg-gray-950/50 rounded-lg py-3 flex flex-col items-center relative group hover:cursor-pointer"
                            onClick={() => setInfoModalOpen(true)}
                          >
                            <span className="absolute top-[-2px] right-[5px]">
                              <FontAwesomeIcon
                                icon={fa.faCircleQuestion}
                                className={
                                  "w-3 h-3 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 opacity-75"
                                }
                              />
                            </span>
                            {/*<Lottie*/}
                            {/*  animationData={AnimatedStickerQuality}*/}
                            {/*  className={"h-7 w-7"}*/}
                            {/*/>*/}
                            <TrophyIcon className={"h-6 w-6 text-indigo-600 dark:text-indigo-500"} />
                            <span className="uppercase font-light mt-2">{t("Quality")}</span>
                            <span className="mx-auto">
                              {selectedService
                                ? locale !== "ru"
                                  ? selectedService.quality_en
                                  : selectedService.quality
                                : "--"}
                            </span>
                          </div>
                        </div>
                        <div name={"geography"}>
                          <div
                            className="bg-gray-300/50 dark:bg-gray-950/50 rounded-lg py-3 flex flex-col items-center relative group hover:cursor-pointer"
                            onClick={() => setInfoModalOpen(true)}
                          >
                            <span className="absolute top-[-2px] right-[5px]">
                              <FontAwesomeIcon
                                icon={fa.faCircleQuestion}
                                className={
                                  "w-3 h-3 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 opacity-75"
                                }
                              />
                            </span>
                            {/*<Lottie*/}
                            {/*  animationData={AnimatedStickerGeo}*/}
                            {/*  className={"h-7 w-7"}*/}
                            {/*/>*/}
                            <GlobeAltIcon className={"h-6 w-6 text-indigo-600 dark:text-indigo-500"} />
                            <span className="uppercase font-light mt-2">{t("Geography")}</span>
                            <span className="mx-auto">
                              {selectedService
                                ? locale !== "ru"
                                  ? selectedService.geo_en
                                  : selectedService.geo
                                : "--"}
                            </span>
                          </div>
                        </div>
                        {selectedService.description || selectedService.description_en ? (
                          <>
                            <span className={"block font-medium text-lg col-span-2"}>{t("Service description")}</span>
                            <div name={"description"} className={"col-span-2"}>
                              <div className="bg-gray-300/50 dark:bg-gray-950/50 rounded-lg py-2 px-4">
                                {locale !== "ru" ? (
                                  <p className={"break-words whitespace-pre-line"}>{selectedService.description_en}</p>
                                ) : (
                                  <p className={"break-words whitespace-pre-line"}>{selectedService.description}</p>
                                )}
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Info Modal Window */}
      <Transition.Root show={infoModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={setInfoModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75 transition-opacity" />
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 p-6 text-left shadow-xl transition-all my-8 w-full max-w-sm sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 dark:text-white pb-2"
                      >
                        {t("info-modal.modal-name")}
                      </Dialog.Title>
                      <div className="mt-2 pb-2">
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                                <span className={"flex flex-row items-center"}>
                                  <HashtagIcon className={"h-5 w-5 mr-3 text-indigo-600 dark:text-indigo-500"} />
                                  {t("info-modal.disclosure-name.service")}
                                </span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"text-gray-900 dark:text-white pb-2"}>{t("info-modal.service-id-1")}</p>
                                <p>{t("info-modal.service-id-2")}</p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                                <span className={"flex flex-row items-center"}>
                                  <ShieldCheckIcon className={"h-5 w-5 mr-3 text-indigo-600 dark:text-indigo-500"} />
                                  {t("info-modal.disclosure-name.refill")}
                                </span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"pb-2"}>{t("info-modal.refill-1")}</p>
                                <p className="pb-2">{t("info-modal.refill-2")}</p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                                <span className={"flex flex-row items-center"}>
                                  <TrophyIcon className={"h-5 w-5 mr-3 text-indigo-600 dark:text-indigo-500"} />
                                  {t("info-modal.disclosure-name.quality")}
                                </span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"pb-2"}>{t("info-modal.quality-1")}</p>
                                <p className={"pb-2"}>{t("info-modal.quality-2")}</p>
                                <p className={"pb-2"}>{t("info-modal.quality-3")}</p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                                <span className={"flex flex-row items-center"}>
                                  <TruckIcon className={"h-5 w-5 mr-3 text-indigo-600 dark:text-indigo-500"} />
                                  {t("info-modal.disclosure-name.est-speed")}
                                </span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"pb-2"}>{t("info-modal.est-1")}</p>
                                <p className={"pb-2"}>{t("info-modal.est-2")}</p>
                                <p className={"pb-2"}>{t("info-modal.est-3")}</p>
                                <p className={"pb-2"}>{t("info-modal.est-4")}</p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                                <span className={"flex flex-row items-center"}>
                                  <XCircleIcon className={"h-5 w-5 mr-3 text-indigo-600 dark:text-indigo-500"} />
                                  {t("info-modal.disclosure-name.cancellation")}
                                </span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"pb-2"}>{t("info-modal.cancel-1")}</p>
                                <p className={"pb-2"}>{t("info-modal.cancel-2")}</p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
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

export default NewOrderClient;
