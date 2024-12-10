"use client";

import React from "react";
import { cn } from "@lib/cn";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import { useTranslations } from "next-intl";
import Meta from "@components/Meta";

const Announcements = () => {
  const t = useTranslations("Announcements");

  const announcements = [
    {
      title: t("posts.2.title"),
      href: "/announcements/introducing-api-order-creation",
      category: {
        name: t("posts.categories.Announcement"),
        href: "#",
        color: "bg-green-100 text-green-800",
      },
      description: t("posts.2.description"),
      date: "Jul 20, 2023",
      datetime: "2023-07-20",
      author: {
        name: "Lindsay Querol",
        href: "#",
        imageUrl: "/assets/images/avatars/team-avatar-5.webp",
      },
      readingTime: "1 min",
    },
    {
      title: t("posts.1.title"),
      href: "/announcements/smmstats-update-more-opportunities-more-success",
      category: {
        name: t("posts.categories.Announcement"),
        href: "#",
        color: "bg-green-100 text-green-800",
      },
      description: t("posts.1.description"),
      date: "Jul 12, 2023",
      datetime: "2023-07-12",
      author: {
        name: "Lindsay Querol",
        href: "#",
        imageUrl: "/assets/images/avatars/team-avatar-5.webp",
      },
      readingTime: "1 min",
    },
  ];

  return (
    <>
      <Meta title={t("Seo.title")} description={t("Seo.description")} siteName={t("Seo.siteName")} url={t("Seo.url")} />
      <Navbar />
      <div className="bg-white dark:bg-gray-900 px-6 pt-24 pb-20 lg:px-8 lg:pt-32 lg:pb-28">
        <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 dark:divide-gray-800 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t("Recent announcements")}
            </h2>
            <p className="mt-3 text-xl text-gray-500 dark:text-gray-400 sm:mt-4">{t("Description")}</p>
          </div>
          <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
            {announcements.map((announcement) => (
              <div key={announcement.title}>
                <div>
                  <a href={announcement.category.href} className="inline-block">
                    <span
                      className={cn(
                        announcement.category.color,
                        "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
                      )}
                    >
                      {announcement.category.name}
                    </span>
                  </a>
                </div>
                <a href={announcement.href} className="mt-4 block">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">{announcement.title}</p>
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-400">{announcement.description}</p>
                </a>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href={announcement.author.href}>
                      <span className="sr-only">{announcement.author.name}</span>
                      <img className="h-10 w-10 rounded-full" src={announcement.author.imageUrl} alt="" />
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      <a href={announcement.author.href}>{announcement.author.name}</a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={announcement.datetime}>{announcement.date}</time>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Announcements;
