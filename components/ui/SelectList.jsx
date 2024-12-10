import Image from "next/image";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { cn } from "@lib/cn";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome";

const SelectList = ({ value, onChange, label, items, image }) => {
  return (
    <>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <Listbox.Label
              className={"pb-2 block text-sm font-semibold text-black dark:text-white"}
            >
              {label}
            </Listbox.Label>
            <div className="relative">
              <Listbox.Button className="relative w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm">
                <span className="flex items-center h-6">
                  {image === "icon" ? (
                    <FontAwesomeIcon
                      icon={value.icon}
                      className="h-5 w-5 flex-shrink-0"
                    />
                  ) : (
                    <Image
                      src={value.image}
                      alt={value.name}
                      width={128}
                      height={128}
                      quality={100}
                      className={"h-6 w-6"}
                    />
                  )}
                  <span className="ml-3 block truncate">
                    {value.publicName || value.name}
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
                <Listbox.Options className="absolute z-[100] mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-100 dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5 focus:outline-none text-sm">
                  {items.map((item, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        cn(
                          active ? "text-white bg-indigo-600" : "",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            {image === "icon" ? (
                              <FontAwesomeIcon
                                icon={item.icon}
                                className={"h-5 w-5 flex-shrink-0"}
                              />
                            ) : (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={128}
                                height={128}
                                quality={100}
                                className={"h-6 w-6"}
                              />
                            )}

                            <span
                              className={cn(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {item.publicName || item.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={cn(
                                active ? "" : "text-indigo-500",
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
    </>
  );
};

export default SelectList;
