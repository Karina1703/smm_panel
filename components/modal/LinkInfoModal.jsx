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
import { useTranslations } from "next-intl";

const LinkInfoModal = ({ isOpen, onClose }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const t = useTranslations("Order");

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
                        Link Instructions
                      </Dialog.Title>
                      <p className={"text-green-400 pb-2 text-sm"}>Your channel, page OR profile must be public!</p>
                      <div className="mt-2 pb-2">
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                                <span className={"flex flex-row items-center"}>Instagram</span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"text-white font-semibold pb-2"}>· Followers, Live or Stories</p>
                                <p>Provide a link to the profile.</p>
                                <p className={"text-white font-semibold py-2"}>
                                  · Likes, Views, Comments or Statistics
                                </p>
                                <p>Provide a link to a specific post.</p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                                <span className={"flex flex-row items-center"}>TikTok</span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"text-white font-semibold pb-2"}>· Followers, Live</p>
                                <p>Provide a link to the profile.</p>
                                <p className={"text-white font-semibold py-2"}>· Likes, Views, Comments, Statistics</p>
                                <p>Provide a link to a specific post.</p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                                <span className={"flex flex-row items-center"}>Telegram</span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"text-white font-semibold pb-2"}>· Members, Auto Services</p>
                                <p>Provide a link to the channel.</p>
                                <p className={"text-white font-semibold py-2"}>· Views</p>
                                <p>Provide a link to the channel OR to a specific post.</p>
                                <p className={"text-white font-semibold py-2"}>· Reactions, Comments</p>
                                <p>Provide a link to a specific post.</p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                                <span className={"flex flex-row items-center"}>YouTube</span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"text-white font-semibold pb-2"}>· Subscribers, Watchtime</p>
                                <p>Provide a link to the channel.</p>
                                <p className={"text-white font-semibold py-2"}>· Views, Likes, Comments, Shorts</p>
                                <p>Provide a link to the video.</p>
                                <p className={"text-white font-semibold py-2"}>· Live Stream</p>
                                <p>Provide a link to the live video.</p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                                <span className={"flex flex-row items-center"}>Facebook</span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"text-white font-semibold pb-2"}>
                                  · Followers, Page Likes, Group Members
                                </p>
                                <p>Provide a link to the page OR profile.</p>
                                <p className={"text-white font-semibold py-2"}>· Post Likes, Comments, Views</p>
                                <p>Provide a link to a specific post.</p>
                                <p className={"text-white font-semibold py-2"}>· Live</p>
                                <p>Provide a link to the live video.</p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                                <span className={"flex flex-row items-center"}>Twitter</span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-400 dark:text-gray-600`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-start text-sm text-gray-500">
                                <p className={"text-white font-semibold pb-2"}>· Followers</p>
                                <p>Provide a link to the profile.</p>
                                <p className={"text-white font-semibold py-2"}>
                                  · Likes, Retweets, Comments, Statistics, Bookmarks
                                </p>
                                <p>Provide a link to a specific tweet.</p>
                                <p className={"text-white font-semibold py-2"}>· Space</p>
                                <p>Provide a link to the Space.</p>
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

export default LinkInfoModal;
