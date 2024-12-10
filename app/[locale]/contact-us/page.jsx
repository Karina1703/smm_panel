"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Meta from "@components/Meta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@node_modules/@fortawesome/free-solid-svg-icons";
import API_URL from "@lib/apiUrl";
import { cn } from "@lib/cn";

const ContactUs = () => {
  const t = useTranslations("ContactUs");
  const [messageSent, setMessageSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Создаем новый экземпляр объекта FormData и передаем ему форму
    const formData = new FormData(e.target);

    // Создаем объект для хранения данных формы
    const formDataObject = {};

    // Преобразуем данные FormData в объект
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await fetch(`${API_URL}/api/send-message`, {
        method: "POST",
        body: JSON.stringify(formDataObject),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessageSent(true); // Устанавливаем состояние, что сообщение отправлено
    } catch (error) {
      console.error("Ошибка отправки сообщения через форму Contact-Us: ", error);
    }
  };

  return (
    <>
      <Meta title={t("Seo.title")} description={t("Seo.description")} siteName={t("Seo.siteName")} url={t("Seo.url")} />
      <Navbar />
      <div className="relative isolate bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl pt-24 md:pt-48 pb-16 px-6 lg:pb-24 lg:px-8">
          <div className="divide-y-2 divide-gray-200 dark:divide-gray-700">
            <div className="">
              <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {t("Our Contacts")}
                <p className={"mx-auto py-6 text-lg font-normal max-w-xl text-gray-900 dark:text-white"}>
                  {t("For any questions related")}
                </p>
              </h2>
              <div className="mt-8 lg:mt-0 text-center">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Email</h3>
                  <dl className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    <div>
                      <dd>{t("For questions on E-Mail")}:</dd>
                    </div>
                    <div className="mt-1">
                      <dd>
                        <a
                          className={
                            "text-indigo-600 text-xl font-semibold hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                          }
                          href={"mailto:support@smmstats.com"}
                          target={"_blank"}
                        >
                          support@smmstats.com
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Contact Form Divider*/}

      <div className="overflow-hidden bg-white dark:bg-gray-900 py-16 px-2 sm:px-6 lg:px-8 border-t-2 border-gray-200 dark:border-gray-800">
        <div className="relative mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t("Send us a message")}
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-400">
              {t("Send us a message using the form")}
            </p>
          </div>
          <div className="mt-12">
            <div className="bg-gray-50 dark:bg-gray-950/50 shadow p-4 sm:p-8 rounded-lg">
              {/* Уведомление об отправке сообщения */}
              {messageSent ? (
                <div
                  className="bg-spring-green-800 border border-spring-green-600 text-green-50 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <p>
                    <strong className="font-bold">Success!</strong>
                  </p>
                  <span className="block sm:inline">
                    Your message has been sent successfully. We will contact you as soon as possible.
                  </span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <FontAwesomeIcon icon={faCheck} className={"w-4 h-4"} />
                  </span>
                </div>
              ) : (
                // Форма для заполнения
                <form onSubmit={handleSendMessage} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      {t("First name")}
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        required
                        className="block w-full rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium  text-gray-700 dark:text-gray-200">
                      {t("Last name")}
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        required
                        className="block w-full rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>{" "}
                  <div className="sm:col-span-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      {t("Subject")}
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        autoComplete="subject"
                        required
                        className="block w-full rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium  text-gray-700 dark:text-gray-200">
                      {t("Message")}
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="block w-full rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type={"submit"}
                      className={cn(
                        isLoading ? "opacity-50" : "",
                        "inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      )}
                      disabled={isLoading}
                    >
                      {isLoading ? <FontAwesomeIcon icon={faSpinner} className={"w-5 h-5 animate-spin mr-2"} /> : null}{" "}
                      {t("Send")}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
