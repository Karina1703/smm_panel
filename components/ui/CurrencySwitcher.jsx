"use client";

import { setCookie, getCookie } from "cookies-next";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@lib/cn";
import { useConstants } from "@constants";

const CurrencySwitcher = ({ openDirection }) => {
  const { currencies } = useConstants();
  const currency = getCookie("user_currency") || process.env.NEXT_PUBLIC_DEFAULT_CURRENCY;
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[currency]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleCurrencySubmit = (value) => {
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 2);

    setCookie("user_currency", value.name, {
      expires: expirationDate,
    });

    window.location.reload();
  };

  if(!selectedCurrency) return

  return (
    <>
      <Listbox value={selectedCurrency} onChange={handleCurrencySubmit}>
        {({ open }) => (
          <>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-900 py-2 pl-3 pr-10 text-left focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <span className="inline-flex w-full truncate">
                  <span className="truncate">{selectedCurrency.name}</span>
                  <span className="ml-2 truncate text-gray-500">{selectedCurrency.symbol}</span>
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
                <Listbox.Options
                  className={cn(
                    openDirection === "up" ? "absolute -translate-y-full -top-1" : "absolute mt-1",
                    "z-10 max-h-60 w-full min-w-fit overflow-auto rounded-md bg-gray-900 py-1 text-base shadow-2xl ring-1 ring-gray-800 ring-opacity-100 focus:outline-none sm:text-sm"
                  )}
                >
                  {Object.values(currencies).map((currency) => (
                    <Listbox.Option
                      key={currency.name}
                      className={({ active }) =>
                        cn(
                          active ? "text-white bg-indigo-600" : "text-gray-900 dark:text-white",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={currency}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex">
                            <span className={cn(selected ? "font-semibold" : "font-normal", "truncate")}>
                              {currency.name}
                            </span>
                            <span className={cn(active ? "text-indigo-200" : "text-gray-500", "ml-2 truncate")}>
                              {currency.symbol}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={cn(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-2"
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
    </>
  );
};

export default CurrencySwitcher;
