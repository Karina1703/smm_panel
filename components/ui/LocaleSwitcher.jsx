"use client";

import { Fragment, useState, useTransition } from "react";
import { Transition } from "@headlessui/react";
import { Dialog, Listbox } from "@node_modules/@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@lib/cn";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useConstants } from "@constants";

const Lottie = dynamic(() => import("lottie-react"));

const LocaleSwitcher = ({ openDirection }) => {
  const { languages } = useConstants();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const defaultLanguage = languages[process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[locale] || defaultLanguage);

  const handleLanguageChange = (value) => {
    startTransition(() => {
      router.replace(`/${value.code}${pathname}`);
      router.refresh();
    });

    // window.location.reload();
  };

  return (
    <>
      <Listbox value={selectedLanguage} onChange={(value) => handleLanguageChange(value)} disabled={isPending}>
        {({ open }) => (
          <>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-900 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <span className="flex flex-row items-center w-full truncate">
                  <span className={"w-5 h-5 mr-2"}>
                    <Lottie animationData={selectedLanguage.flag} autoplay={false} />
                  </span>
                  <span className="truncate">{selectedLanguage.name}</span>
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
                  {Object.values(languages).map((lang) => (
                    <Listbox.Option
                      key={lang.name}
                      className={({ active }) =>
                        cn(
                          active ? "text-white bg-indigo-600" : "text-gray-900 dark:text-white",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={lang}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex flex-row items-center">
                            <span className={"w-5 h-5 mr-2"}>
                              <Lottie animationData={lang.flag} autoplay={false} />
                            </span>

                            <span className={cn(selected ? "font-semibold" : "font-normal", "truncate")}>
                              {lang.name}
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

export default LocaleSwitcher;
