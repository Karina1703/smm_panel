"use client";

import React from "react";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import { useTranslations } from "next-intl";

const AnnouncementPost2 = () => {
  const t = useTranslations("Announcements");

  return (
    <>
      <Navbar />

      <div className="relative overflow-hidden bg-white dark:bg-gray-900 pt-32 pb-16">
        <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
          <div
            className="relative mx-auto h-full max-w-prose text-lg"
            aria-hidden="true"
          ></div>
        </div>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="inline-flex w-fit items-center text-green-800 bg-green-100 px-3 py-0.5 rounded-full text-sm font-medium mb-2">
                {t("posts.2.content.tag")}
              </span>
              <span className="mb-2 block text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {t("posts.2.content.title")}
              </span>
            </h1>
          </div>
          <div className="prose prose-lg prose-yellow mx-auto mt-8 text-gray-500 dark:text-gray-200">
            {t.rich("posts.2.content.text", {
              p: (chunks) => <p>{chunks}</p>,
            })}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AnnouncementPost2;
