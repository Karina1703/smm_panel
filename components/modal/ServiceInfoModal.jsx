import { Fragment, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  HashtagIcon,
  ShieldCheckIcon,
  TrophyIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

const ServiceInfoModal = ({ isOpen, onClose, t }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);

  const handleClose = () => {
    setModalOpen(false);
    onClose();
  };

  return (
    <>
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={handleClose}>
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
                                  <HashtagIcon
                                    className={
                                      "h-5 w-5 mr-3 text-indigo-600 dark:text-indigo-500"
                                    }
                                  />
                                  {t("info-modal.disclosure-name.service")}
                                </span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p
                                  className={
                                    "text-gray-900 dark:text-white pb-2"
                                  }
                                >
                                  {t("info-modal.service-id-1")}
                                </p>
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
                                  <ShieldCheckIcon
                                    className={
                                      "h-5 w-5 mr-3 text-indigo-600 dark:text-indigo-500"
                                    }
                                  />
                                  {t("info-modal.disclosure-name.refill")}
                                </span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"pb-2"}>
                                  {t("info-modal.refill-1")}
                                </p>
                                <p className="pb-2">
                                  {t("info-modal.refill-2")}
                                </p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                                <span className={"flex flex-row items-center"}>
                                  <TrophyIcon
                                    className={
                                      "h-5 w-5 mr-3 text-indigo-600 dark:text-indigo-500"
                                    }
                                  />
                                  {t("info-modal.disclosure-name.quality")}
                                </span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"pb-2"}>
                                  {t("info-modal.quality-1")}
                                </p>
                                <p className={"pb-2"}>
                                  {t("info-modal.quality-2")}
                                </p>
                                <p className={"pb-2"}>
                                  {t("info-modal.quality-3")}
                                </p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                                <span className={"flex flex-row items-center"}>
                                  <TruckIcon
                                    className={
                                      "h-5 w-5 mr-3 text-indigo-600 dark:text-indigo-500"
                                    }
                                  />
                                  {t("info-modal.disclosure-name.est-speed")}
                                </span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"pb-2"}>
                                  {t("info-modal.est-1")}
                                </p>
                                <p className={"pb-2"}>
                                  {t("info-modal.est-2")}
                                </p>
                                <p className={"pb-2"}>
                                  {t("info-modal.est-3")}
                                </p>
                                <p className={"pb-2"}>
                                  {t("info-modal.est-4")}
                                </p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                                <span className={"flex flex-row items-center"}>
                                  <XCircleIcon
                                    className={
                                      "h-5 w-5 mr-3 text-indigo-600 dark:text-indigo-500"
                                    }
                                  />
                                  {t("info-modal.disclosure-name.cancellation")}
                                </span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"pb-2"}>
                                  {t("info-modal.cancel-1")}
                                </p>
                                <p className={"pb-2"}>
                                  {t("info-modal.cancel-2")}
                                </p>
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

export default ServiceInfoModal;
