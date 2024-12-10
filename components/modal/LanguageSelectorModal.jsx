import { Fragment, useState, useTransition } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cn } from "@lib/cn";
import dynamic from "next/dynamic";
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
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useConstants } from "@constants";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "@node_modules/next-intl";

const Lottie = dynamic(() => import("lottie-react"));

const LanguageSelectorModal = ({ isOpen, onClose }) => {
  const t = useTranslations("Constants.sidebar.modal");
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const locale = useLocale();
  const { languages } = useConstants();
  const defaultLanguage = languages[process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[locale] || defaultLanguage);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const handleClose = () => {
    setModalOpen(false);
    onClose();
  };

  const handleLanguageChange = (value) => {
    startTransition(() => {
      router.replace(`/${value.code}${pathname}`);
      router.refresh();
    });
  };

  return (
    <>
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                      <Lottie animationData={selectedLanguage.flag} loop={true} />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        {t("Change Language")}
                      </Dialog.Title>
                      <div className="mt-2">
                        <Listbox
                          value={selectedLanguage}
                          onChange={(value) => handleLanguageChange(value)}
                          disabled={isPending}
                        >
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                {t("Language")}
                              </Listbox.Label>
                              <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-gray-100  dark:border-gray-700 dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
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
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-100 dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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

                                              <span
                                                className={cn(selected ? "font-semibold" : "font-normal", "truncate")}
                                              >
                                                {lang.name}
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

export default LanguageSelectorModal;
