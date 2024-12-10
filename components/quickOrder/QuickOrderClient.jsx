"use client";

import { useLocale, useTranslations } from "next-intl";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Listbox, Transition, Disclosure, RadioGroup } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  LockClosedIcon,
  PhoneIcon,
  GiftIcon,
  BoltIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import loading from "@app/[locale]/loading";
import { getCookie } from "cookies-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons";
import { useConstants } from "@constants";
import handleQuickOrderSubmit from "./handlers/handleQuickOrderSubmit";
import { cn } from "@lib/cn";
import QuantitySelector from "@components/quickOrder/QuantitySelector";
import Input from "@components/ui/Input";
import SelectList from "@components/ui/SelectList";
import ServiceInfoModal from "@components/modal/ServiceInfoModal";
import Mrr from "@components/quickOrder/Mrr";
import PriorityProcessing from "@components/quickOrder/PriorityProcessing";
import { faCircle, faWallet } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import API_URL from "@lib/apiUrl";
import { formatCurrency } from "@lib/formatPrice";

const QuickOrderClient = ({ allServices, currencyRate, currency }) => {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const locale = useLocale();
  const [balance, setBalance] = useState(null);
  const [paymentGateways, setPaymentGateways] = useState([]);
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState(paymentGateways[0]);
  const t = useTranslations("Order");
  const { categories, paymentGatewaysList, packageOptionsList } = useConstants();
  const categoriesMemo = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      image: category.image,
    }));
  }, []);
  const [selectedCategory, setSelectedCategory] = useState(categoriesMemo[0]);
  const packageOptions = useMemo(() => {
    return packageOptionsList.map((option) => ({
      ...option,
    }));
  }, []);
  const [selectedPackageOption, setSelectedPackageOption] = useState(packageOptions[0]);
  const [services, setServices] = useState();
  const [selectedService, setSelectedService] = useState(null);
  const [types, setTypes] = useState(Object.values(selectedCategory.subCategories));
  const [selectedType, setSelectedType] = useState(types[0]);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(getCookie("user_email") || "");
  const [linkInputError, setLinkInputError] = useState(false);
  const [quantityInputError, setQuantityInputError] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);
  const [mrrType, setMrrType] = useState(process.env.NEXT_PUBLIC_RECURRING_DEFAULT);
  const [priorityProcessing, setPriorityProcessing] = useState(false);
  const priorityPrice = priorityProcessing ? 200 : 0;
  const [liveCheckout, setLiveCheckout] = useState(150);

  // USE EFFECTS

  useEffect(() => {
    const updatedGateways = [...paymentGatewaysList];

    if (session) {
      setEmail(session?.user.email);
      async function getUserBalance() {
        const res = await fetch(`${API_URL}/api/user/balance?email=${session.user.email}`, {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setBalance(await res.json());
      }

      getUserBalance();

      updatedGateways.push({
        id: 5,
        title: t("quickOrder.Wallet balance"),
        apiName: "balance",
        titleIcon: faWallet,
        disabled: false,
      });
    }

    setPaymentGateways(updatedGateways);
    setSelectedPaymentGateway(updatedGateways[0]);
  }, [session]);

  useEffect(() => {
    async function filterServices() {
      const filtered = allServices?.filter((service) => {
        // Проверка, соответствует ли элемент выбранной категории и типу
        const isCategoryMatch = service.category === selectedCategory.name;
        const isTypeMatch = service.subCategory === selectedType.tag;

        return isCategoryMatch && isTypeMatch;
      });

      // Устанавливаем отфильтрованные данные в состояние
      setServices(filtered);
      setSelectedService(filtered[0]);
      const defaultQuantity = 1000 > filtered[0].max ? filtered[0].min : filtered[0].category === "Instagram" && filtered[0].subCategory === "Комментарии" ? 100 : 1000;
      setQuantity(defaultQuantity);
      setPrice(filtered[0].rate * defaultQuantity * selectedPackageOption.rate + priorityPrice);
    }

    filterServices();
  }, [selectedCategory, selectedType]);

  useEffect(() => {
    const fetchLiveUsers = async () => {
      // Моделирование логики обновления на стороне клиента
      const currentValue = liveCheckout;
      const increment = Math.random() < 0.5 ? -1 * Math.random() * 5 : Math.random() * 5;
      const newValue = Math.max(90, Math.min(180, currentValue + increment));
      const newOnlineUsers = Math.round(newValue);

      // Обновление состояния
      setLiveCheckout(newOnlineUsers);
    };

    // Устанавливаем интервал обновления каждые 3 секунды
    const intervalId = setInterval(fetchLiveUsers, 3000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [liveCheckout]);

  // HANDLERS

  const onChangeCategory = (value) => {
    setSelectedCategory(value);
    setTypes(Object.values(value.subCategories));
    setSelectedType(Object.values(value.subCategories)[0]);
    const price = quantity * selectedService.rate;
  };

  const onChangeType = (value) => {
    setSelectedType(value);
  };

  const onChangeService = (value) => {
    setSelectedService(value);
    const defaultQuantity = 1000 > value.max ? value.min : 1000;
    setQuantity(defaultQuantity);
    setPrice(value.rate * defaultQuantity * selectedPackageOption.rate + priorityPrice);
  };

  const handleIncrement = () => {
    const newQuantity = Math.min(Number(quantity) + selectedService.min * 10, selectedService.max);

    setQuantity(Number(newQuantity));
    const newPrice = newQuantity * selectedService.rate * selectedPackageOption.rate + priorityPrice;
    setPrice(newPrice);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(Number(quantity) - selectedService.min * 10, selectedService.min);

    setQuantity(Number(newQuantity));
    const newPrice = newQuantity * selectedService.rate * selectedPackageOption.rate + priorityPrice;
    setPrice(newPrice);
  };

  const onChangeQuantity = (event) => {
    setQuantityInputError(false);
    let newQuantity = Number(event.target.value);

    if (newQuantity < selectedService.min) {
      setQuantity(newQuantity);
    } else if (newQuantity > selectedService.max) {
      setQuantity(selectedService.max);
      newQuantity = selectedService.max;
    } else {
      setQuantity(newQuantity);
    }

    const newPrice = newQuantity * selectedService.rate * selectedPackageOption.rate + priorityPrice;
    setPrice(newPrice);
  };

  const handleChangePackage = (value) => {
    setSelectedPackageOption(value);
    setPrice(selectedService.rate * quantity * value.rate + priorityPrice);
  };

  const handeBuyNowButton = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // Пример регулярного выражения для проверки email
    const isEmailValid = emailRegex.test(email);

    const isQuantityValid = quantity >= selectedService.min && Number.isInteger(Number(quantity));
    const isLinkValid = link.length >= 5;

    if (!isQuantityValid) {
      setQuantityInputError(true);
    } else if (!isLinkValid) {
      setLinkInputError(true);
    } else if (!isEmailValid) {
      setEmailInputError(true);
    } else {
      setIsLoading(true);
      handleQuickOrderSubmit(
        t,
        selectedService,
        link,
        quantity,
        price,
        email,
        selectedPaymentGateway,
        setIsLoading,
        mrrType,
        selectedType,
        balance,
        currency
      );
    }
  };

  const handleOneTimeOrder = (value) => {
    setMrrType(value);

    if (value === "one-time") {
      const updatedPaymentGateways = paymentGateways.map((gateway) => {
        if (gateway.id !== 1) {
          // Проверяем, что это объект "Cryptocurrency"
          return {
            ...gateway,
            disabled: false, // Добавляем поле disabled со значением true
          };
        }
        return gateway;
      });
      setPaymentGateways(updatedPaymentGateways);
    } else {
      setSelectedPaymentGateway(paymentGateways[0]);
      const updatedPaymentGateways = paymentGateways.map((gateway) => {
        if (gateway.id !== 1) {
          // Проверяем, что это объект "Cryptocurrency"
          return {
            ...gateway,
            disabled: true, // Добавляем поле disabled со значением true
          };
        }
        return gateway;
      });
      setPaymentGateways(updatedPaymentGateways);
    }
  };

  const handleSwitchPriorityProcessing = (value) => {
    if (value) {
      setPriorityProcessing(value);
      setPrice(price + 200);
    } else {
      setPriorityProcessing(value);
      setPrice(price - 200);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted && !services && !selectedService) {
    return loading();
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-900 pt-24 pb-24 sm:pt-32 sm:pb-12" id={"new-order"}>
        <div className="mx-auto max-w-7xl">
          <div className={"isolate min-h-full"}>
            <div className="flex flex-1 flex-col">
              <main className="flex-1">
                <div className="">
                  <div className="mx-auto">
                    {/* Replace with your content */}
                    <div className="">
                      <div className={"grid grid-cols-1 gap-6"}>
                        <div
                        // className="rounded-lg p-[1px]"
                        // style={{
                        //   ...gradientStyle,
                        // }}
                        >
                          <div className="h-fit sm:bg-white sm:dark:bg-gray-900 rounded-md sm:px-8 sm:py-8 ring-0 sm:ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5">
                            <div
                              name={"category-n-type"}
                              className={"flex flex-col -mt-2 gap-x-2.5 gap-y-2.5 items-center"}
                            >
                              <div name={"category"} className={"w-full"}>
                                <SelectList
                                  label={t("quickOrder.Choose Social Media")}
                                  value={selectedCategory}
                                  onChange={onChangeCategory}
                                  items={categoriesMemo}
                                  image={"image"}
                                />
                              </div>
                              <div name={"type"} className={"w-full"}>
                                <SelectList
                                  label={t("quickOrder.Choose Service")}
                                  value={selectedType}
                                  onChange={onChangeType}
                                  items={types}
                                  image={"icon"}
                                />
                              </div>
                            </div>

                            {/*<div name={"choose-plan"}>*/}
                            {/*  <RadioGroup value={selectedPackageOption} onChange={handleChangePackage}>*/}
                            {/*    <RadioGroup.Label className={"block mt-2.5 pb-2 text-sm font-semibold"}>*/}
                            {/*      {t("quickOrder.Choose Package")}*/}
                            {/*    </RadioGroup.Label>*/}
                            {/*    <div className="grid gap-y-4 grid-cols-3 gap-x-2">*/}
                            {/*      {packageOptions.map((option, index) => (*/}
                            {/*        <RadioGroup.Option*/}
                            {/*          key={index}*/}
                            {/*          value={option}*/}
                            {/*          className={({ checked, active }) =>*/}
                            {/*            cn(*/}
                            {/*              checked ? "border-transparent" : "border-gray-300 dark:border-gray-700",*/}
                            {/*              active ? "border-indigo-500 ring-2 ring-indigo-500" : "",*/}
                            {/*              "relative flex cursor-pointer border rounded-md bg-gray-100 dark:bg-gray-800 py-2 px-1 sm:p-4 shadow-sm"*/}
                            {/*            )*/}
                            {/*          }*/}
                            {/*        >*/}
                            {/*          {({ checked, active }) => (*/}
                            {/*            <>*/}
                            {/*              {option.best ? (*/}
                            {/*                <p className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 uppercase rounded-full bg-indigo-600 dark:bg-indigo-500 py-0 px-2 sm:px-4 min-w-max text-[8px] sm:text-[10px] text-white">*/}
                            {/*                  {t("quickOrder.Best selling")}*/}
                            {/*                </p>*/}
                            {/*              ) : null}*/}
                            {/*              <span className="flex relative">*/}
                            {/*                <span className="flex flex-col">*/}
                            {/*                  <RadioGroup.Label*/}
                            {/*                    as="span"*/}
                            {/*                    className="block text-xs font-medium text-center sm:text-start"*/}
                            {/*                  >*/}
                            {/*                    {option.title}*/}
                            {/*                  </RadioGroup.Label>*/}
                            {/*                  {option.description.map((description, index) => (*/}
                            {/*                    <RadioGroup.Description*/}
                            {/*                      as="span"*/}
                            {/*                      className={cn(*/}
                            {/*                        checked*/}
                            {/*                          ? "text-indigo-600 dark:text-indigo-500"*/}
                            {/*                          : "text-gray-500 dark:text-gray-400",*/}
                            {/*                        "mt-2 flex items-center sm:text-xs text-[10px] font-normal leading-[12px]"*/}
                            {/*                      )}*/}
                            {/*                      key={index}*/}
                            {/*                    >*/}
                            {/*                      <description.icon*/}
                            {/*                        className={*/}
                            {/*                          "min-w-[12px] min-h-[12px] w-[12px] h-[12px] sm:min-w-[16px] sm:min-h-[16px] sm:w-[16px] sm:h-[16px] mr-1"*/}
                            {/*                        }*/}
                            {/*                      />{" "}*/}
                            {/*                      <span>*/}
                            {/*                        <span className={"font-bold"}>{description.bold}</span>{" "}*/}
                            {/*                        {description.string}*/}
                            {/*                      </span>*/}
                            {/*                    </RadioGroup.Description>*/}
                            {/*                  ))}*/}
                            {/*                </span>*/}
                            {/*              </span>*/}
                            {/*              <CheckCircleIcon*/}
                            {/*                className={cn(*/}
                            {/*                  !checked ? "invisible" : "",*/}
                            {/*                  "absolute bottom-1 right-1 h-3 w-3 sm:top-2 sm:right-2 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-500"*/}
                            {/*                )}*/}
                            {/*                aria-hidden="true"*/}
                            {/*              />*/}
                            {/*              <span*/}
                            {/*                className={cn(*/}
                            {/*                  active ? "border" : "border-2",*/}
                            {/*                  checked ? "border-indigo-500" : "border-transparent",*/}
                            {/*                  "pointer-events-none absolute -inset-px rounded-md"*/}
                            {/*                )}*/}
                            {/*                aria-hidden="true"*/}
                            {/*              />*/}
                            {/*            </>*/}
                            {/*          )}*/}
                            {/*        </RadioGroup.Option>*/}
                            {/*      ))}*/}
                            {/*    </div>*/}
                            {/*  </RadioGroup>*/}
                            {/*</div>*/}

                            <div name={"pro-mode"} className={"z-50"}>
                              <Disclosure>
                                {({ open }) => (
                                  /* Use the `open` state to conditionally change the direction of an icon. */
                                  <>
                                    <div
                                      className={"mt-4 flex flex-row w-full gap-x-4 justify-between items-center z-50"}
                                    >
                                      <Disclosure.Button
                                        className={
                                          "flex pl-4 pr-2 w-full h-[42px] mx-auto py-2 text-sm rounded-md justify-between items-center"
                                        }
                                      >
                                        {t("quickOrder.Pro Mode Hype")}
                                        <ChevronDownIcon
                                          className={`${
                                            open ? "rotate-180" : ""
                                          } h-5 w-5 text-gray-400 dark:text-gray-400 transform transition`}
                                        />
                                      </Disclosure.Button>
                                    </div>
                                    <Transition
                                      show={open}
                                      enter="transition ease-out duration-150"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-150"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Disclosure.Panel>
                                        <div name={"service"}>
                                          <Listbox value={selectedService} onChange={onChangeService}>
                                            {({ open }) => (
                                              <>
                                                <Listbox.Label className="mt-2.5 pb-2 flex flex-row items-center text-sm font-semibold">
                                                  Choose Package
                                                  <span className="ml-auto">
                                                    <FontAwesomeIcon
                                                      icon={fa.faCircleQuestion}
                                                      className={
                                                        "w-3 h-3 text-gray-400 dark:text-gray-700 hover:text-gray-700 dark:hover:text-gray-300 opacity-75"
                                                      }
                                                      onClick={() => setInfoModalOpen(true)}
                                                    />
                                                  </span>
                                                </Listbox.Label>
                                                <div className="relative">
                                                  <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm">
                                                    <span className="flex items-center h-6">
                                                      <span className="block truncate">
                                                        <span
                                                          className={
                                                            "inline-flex px-2 bg-indigo-600 dark:bg-indigo-500 rounded-md mr-2 text-white"
                                                          }
                                                        >
                                                          ID {selectedService.serviceId}
                                                        </span>
                                                        {selectedService.name}
                                                      </span>
                                                    </span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                      <ChevronDownIcon
                                                        className={cn(
                                                          open ? "rotate-180" : "",
                                                          "h-5 w-5 text-gray-400 transform transition"
                                                        )}
                                                        aria-hidden="true"
                                                      />
                                                    </span>
                                                  </Listbox.Button>

                                                  <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                  >
                                                    <Listbox.Options className="relative z-50 mt-1 max-h-64 w-full overflow-auto rounded-md bg-gray-100 dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5 focus:outline-none text-sm">
                                                      {services.map((service) => (
                                                        <Listbox.Option
                                                          key={service.serviceId}
                                                          className={({ active }) =>
                                                            cn(
                                                              active ? "text-white bg-indigo-600" : "",
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
                                                                    "ml-3 block"
                                                                  )}
                                                                >
                                                                  <span
                                                                    className={
                                                                      "text-white bg-indigo-500 inline-flex px-2 rounded-md mr-2"
                                                                    }
                                                                  >
                                                                    ID {service.serviceId}
                                                                  </span>
                                                                  {service.name}
                                                                </span>
                                                              </div>

                                                              {selected ? (
                                                                <span
                                                                  className={cn(
                                                                    active ? "text-white" : "text-indigo-500",
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
                                      </Disclosure.Panel>
                                    </Transition>
                                  </>
                                )}
                              </Disclosure>
                            </div>

                            {selectedService?.category === "Discord" &&
                            selectedService?.subCategory === "Участники на сервер" ? (
                              <div
                                name={"description"}
                                className={
                                  "mt-4 border border-gray-300 dark:border-gray-700 relative flex cursor-pointer rounded-md bg-gray-100 dark:bg-gray-800 p-2 sm:p-4 text-sm sm:text-base shadow-sm"
                                }
                              >
                                <p className={"break-words whitespace-pre-line"}>
                                  {locale !== "ru" ? selectedService.description_en : selectedService.description}
                                </p>
                              </div>
                            ) : null}

                            <hr className={"mt-4 h-px border-t-0 bg-gray-300 dark:bg-gray-700 opacity-100"} />

                            <div
                              name={"quantity-n-link"}
                              className={"flex flex-col sm:flex-row sm:gap-x-2 items-center"}
                            >
                              <div name={"quantity"} className={"w-full sm:w-1/3"}>
                                <QuantitySelector
                                  label={t("Quantity")}
                                  quantity={quantity}
                                  selectedService={selectedService}
                                  quantityInputError={quantityInputError}
                                  onChangeQuantity={(event) => onChangeQuantity(event)}
                                  onIncrement={handleIncrement}
                                  onDecrement={handleDecrement}
                                />
                              </div>
                              <div name={"link"} className={"w-full sm:w-2/3"}>
                                <Input
                                  label={t("Link")}
                                  inputError={linkInputError}
                                  selectedService={selectedService}
                                  onChange={(event) => {
                                    setLinkInputError(false);
                                    setLink(event.target.value);
                                  }}
                                  placeholder={selectedService?.linkExample || "Enter the link"}
                                />
                              </div>
                            </div>

                            {!session?.user.email ? (
                              <div name={"email"}>
                                <label className="mt-2.5 pb-2 block text-sm font-semibold">Email</label>
                                <div className="">
                                  <input
                                    type={"text"}
                                    className={cn(
                                      emailInputError
                                        ? "border-red-300 dark:border-red-500 text-red-900 dark:text-red-500 placeholder-red-300 dark:placeholder-red-500 focus:border-red-500 focus:ring-red-500"
                                        : "border border-gray-300 dark:border-gray-700",
                                      "block w-full h-[42px] rounded-md bg-gray-100 dark:bg-gray-800 shadow-sm focus:ring-1 dark:focus:border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                    )}
                                    value={email}
                                    disabled={session?.user.email}
                                    placeholder={"example@gmail.com"}
                                    onChange={(event) => {
                                      setEmailInputError(false);
                                      setEmail(event.target.value.toLowerCase());
                                    }}
                                  />
                                </div>
                              </div>
                            ) : null}

                            {process.env.NEXT_PUBLIC_RECURRING_ENABLED === "true" ? (
                              <>
                                <hr className={"mt-4 h-px border-t-0 bg-gray-300 dark:bg-gray-700 opacity-100"} />

                                <Mrr setOneTime={handleOneTimeOrder} />
                              </>
                            ) : null}

                            <hr className={"my-4 h-px border-t-0 bg-gray-300 dark:bg-gray-700 opacity-100"} />

                            <PriorityProcessing
                              handleSwitch={handleSwitchPriorityProcessing}
                              value={priorityProcessing}
                            />

                            <hr className={"my-4 h-px border-t-0 bg-gray-300 dark:bg-gray-700 opacity-100"} />

                            <RadioGroup
                              value={selectedPaymentGateway}
                              onChange={(value) => {
                                setSelectedPaymentGateway(value);
                                setIsLoading(false);
                              }}
                            >
                              <RadioGroup.Label className={"block mt-4 text-sm font-semibold"}>
                                {t("quickOrder.Choose Payment Method")}
                              </RadioGroup.Label>
                              <div className="mt-2 grid grid-cols-1 gap-y-2.5 md:grid-cols-2 sm:gap-x-4">
                                {paymentGateways.map((paymentGateway, index) => (
                                  <RadioGroup.Option
                                    key={index}
                                    value={paymentGateway}
                                    disabled={paymentGateway.disabled}
                                    className={({ checked, active }) =>
                                      cn(
                                        paymentGateway.disabled ? "opacity-50" : null,
                                        checked ? "border-transparent" : "border-gray-300 dark:border-gray-700",
                                        active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                                        "relative flex cursor-pointer rounded-lg border bg-gray-100 dark:bg-gray-800 py-2 px-2 sm:p-4 shadow-sm focus:outline-none"
                                      )
                                    }
                                  >
                                    {({ checked, active }) => (
                                      <>
                                        <span className="flex flex-1">
                                          <span className="flex flex-col">
                                            <RadioGroup.Label
                                              as="span"
                                              className="text-sm font-semibold flex gap-x-2.5 items-center"
                                            >
                                              <FontAwesomeIcon icon={paymentGateway.titleIcon} className={"w-6 h-6"} />
                                              {paymentGateway.title}{" "}
                                              {paymentGateway.apiName === "balance" ? (
                                                <span
                                                  className={
                                                    "px-2 py-1 bg-spring-green-700 text-spring-green-200 rounded-full"
                                                  }
                                                >
                                                  {formatCurrency(currency, balance, currencyRate)}
                                                </span>
                                              ) : null}
                                            </RadioGroup.Label>
                                          </span>
                                        </span>
                                        <CheckCircleIcon
                                          className={cn(
                                            !checked ? "invisible" : "",
                                            "h-5 w-5 text-indigo-600 dark:text-indigo-500"
                                          )}
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

                            <div name={"button"} className={"mt-4"}>
                              <button
                                onClick={() => handeBuyNowButton()}
                                className={cn(
                                  isLoading ? "opacity-50" : "shine-green animate-shine hover:bg-spring-green-950",
                                  "flex items-center w-full justify-between rounded-full py-2 px-2 sm:px-4 shadow-buy-button sm:font-medium text-spring-green-300 border border-spring-green-300 bg-spring-green-900 mt-2 sm:text-2xl focus:ring-green-500 focus:outline-none"
                                )}
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <>
                                    <span className={"flex items-center uppercase"}>
                                      <FontAwesomeIcon icon={fa.faSpinner} className={"w-6 h-6 animate-spin mr-2"} />
                                      {t("quickOrder.Secure Checkout")}
                                    </span>
                                    <span className={"text-white flex items-center text-lg sm:text-2xl font-bold"}>
                                      <span
                                        className={
                                          "line-through opacity-30 text-[12px] sm:text-base font-normal mr-1.5"
                                        }
                                      >
                                        {formatCurrency(currency, price, currencyRate, true)}
                                      </span>{" "}
                                      {formatCurrency(currency, price, currencyRate)}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className={"flex items-center uppercase"}>
                                      <LockClosedIcon className={"w-6 h-6 mr-2"} />
                                      {t("quickOrder.Secure Checkout")}
                                    </span>
                                    <span className={"text-white flex items-center text-lg sm:text-2xl font-bold"}>
                                      <span
                                        className={
                                          "line-through opacity-30 text-[12px] sm:text-base font-normal mr-1.5"
                                        }
                                      >
                                        {formatCurrency(currency, price, currencyRate, true)}
                                      </span>{" "}
                                      {formatCurrency(currency, price, currencyRate)}
                                    </span>
                                  </>
                                )}
                              </button>
                            </div>

                            <div name={"live-checkout"}>
                              <div className={"flex items-center mt-2 -mb-4 w-fit mx-auto"}>
                                <FontAwesomeIcon icon={faCircle} className={"w-4 h-4 text-[#63F297] animate-pulse"} />
                                <span className={"ml-2 hover:text-indigo-500"}>
                                  {liveCheckout} {t("quickOrder.Live checkout")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Service specification block */}
                      </div>
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal Window */}
      {infoModalOpen && <ServiceInfoModal isOpen={infoModalOpen} onClose={() => setInfoModalOpen(false)} t={t} />}
    </>
  );
};

export default QuickOrderClient;
