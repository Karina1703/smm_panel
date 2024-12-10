"use client";

import { useState, Fragment } from "react";
import { RadioGroup } from "@headlessui/react";
import { Disclosure, Transition } from "@headlessui/react";
import { cn } from "@lib/cn";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
} from "@node_modules/@heroicons/react/20/solid";
import { InformationCircleIcon } from "@node_modules/@heroicons/react/24/outline";

const Mrr = ({ setOneTime }) => {
  const [selectedOption, setSelectedOption] = useState("7-days");
  const [isMoreVariantsOpen, setMoreVariantsOpen] = useState(false);

  const mrrOptions = [
    {
      id: "7-days",
      title: "Every 7 days",
      description: [
        {
          icon: InformationCircleIcon,
          string: "Re-ordering with a +10% bonus every 7 days",
        },
      ],
    },
    {
      id: "30-days",
      title: "Every 30 days",
      description: [
        {
          icon: InformationCircleIcon,
          string: "Re-ordering with a +10% bonus every 30 days",
        },
      ],
      isHidden: true,
    },
    {
      id: "one-time",
      title: "One time order",
      isHidden: true,
    },
  ];

  const handleSelectOption = (value) => {
    setSelectedOption(value);
    setOneTime(value);
  };

  return (
    <>
      <RadioGroup value={selectedOption} onChange={handleSelectOption}>
        <RadioGroup.Label
          className={"block py-2 text-sm font-semibold"}
        ></RadioGroup.Label>
        <div className="space-y-2">
          {mrrOptions.slice(0, 1).map((option) => (
            <div key={option.id} className="flex items-center">
              <RadioGroup.Option
                value={option.id}
                className={({ checked, active }) =>
                  cn(
                    checked
                      ? "border-gray-300 dark:border-gray-700"
                      : "border-gray-300 dark:border-gray-700",
                    active ? "border-indigo-500 ring-1 ring-indigo-500" : "",
                    "z-0 relative w-full flex cursor-pointer rounded-lg border bg-gray-100 dark:bg-gray-800 py-2 px-2 sm:p-4 shadow-sm focus:outline-none"
                  )
                }
              >
                {({ checked, active }) => (
                  <>
                    <span className="flex relative">
                      <span className="flex flex-col">
                        <RadioGroup.Label
                          as="span"
                          className="block text-sm font-semibold"
                        >
                          {option.title}
                        </RadioGroup.Label>
                        {option.description.map((description) => (
                          <RadioGroup.Description
                            as="span"
                            className={cn(
                              checked
                                ? "text-indigo-600 dark:text-indigo-500"
                                : "text-gray-500 dark:text-gray-400",
                              "mt-2 flex text-xs leading-[12px] items-center"
                            )}
                            key={description}
                          >
                            <description.icon
                              className={
                                "min-w-[16px] min-h-[16px] w-[16px] h-[16px] mr-1"
                              }
                            />{" "}
                            {description.string}
                          </RadioGroup.Description>
                        ))}
                      </span>
                    </span>
                    <CheckCircleIcon
                      className={cn(
                        !checked ? "invisible" : "",
                        "absolute top-2 right-2 h-5 w-5 text-indigo-600 dark:text-indigo-500"
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
            </div>
          ))}
        </div>
      </RadioGroup>

      <Disclosure open={isMoreVariantsOpen} onChange={setMoreVariantsOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={
                "flex pl-4 pr-2 my-2 w-full h-[42px] mx-auto py-2 text-sm rounded-md justify-between items-center"
              }
            >
              Other options
              <ChevronDownIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-gray-400 dark:text-gray-400`}
              />
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Disclosure.Panel static>
                <div className="mt-2">
                  <RadioGroup
                    value={selectedOption}
                    onChange={handleSelectOption}
                    className={"flex flex-col gap-y-2 my-2"}
                  >
                    {mrrOptions.slice(1).map((option) => (
                      <div key={option.id} className="flex items-center">
                        <RadioGroup.Option
                          value={option.id}
                          className={({ checked, active }) =>
                            cn(
                              checked
                                ? "border-gray-300 dark:border-gray-700"
                                : "border-gray-300 dark:border-gray-700",
                              active
                                ? "border-indigo-500 ring-2 ring-indigo-500"
                                : "",
                              "relative w-full flex cursor-pointer rounded-lg border bg-gray-100 dark:bg-gray-800 py-2 px-2 sm:p-4 shadow-sm focus:outline-none"
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className="flex relative">
                                <span className="flex flex-col">
                                  <RadioGroup.Label
                                    as="span"
                                    className="block text-sm font-semibold"
                                  >
                                    {option.title}
                                  </RadioGroup.Label>
                                  {option.description?.map((description) => (
                                    <RadioGroup.Description
                                      as="span"
                                      className={cn(
                                        checked
                                          ? "text-indigo-600 dark:text-indigo-500"
                                          : "text-gray-500 dark:text-gray-400",
                                        "mt-2 flex text-xs leading-[12px] items-center"
                                      )}
                                      key={description}
                                    >
                                      <description.icon
                                        className={
                                          "min-w-[16px] min-h-[16px] w-[16px] h-[16px] mr-1"
                                        }
                                      />{" "}
                                      {description.string}
                                    </RadioGroup.Description>
                                  ))}
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={cn(
                                  !checked ? "invisible" : "",
                                  "absolute top-2 right-2 h-5 w-5 text-indigo-600 dark:text-indigo-500"
                                )}
                                aria-hidden="true"
                              />
                              <span
                                className={cn(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-indigo-500"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-lg"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Mrr;
