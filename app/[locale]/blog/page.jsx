"use client";

import React from "react";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { useTranslations } from "next-intl";
import Meta from "@components/Meta";

const Blog = () => {
  const t = useTranslations("Blog");
  const posts = [
    {
      title: t("posts.3.title"),
      href: "/blog/ways-to-get-started-as-an-smm-service-reseller",
      category: { name: t("posts.categories.Article"), href: "#" },
      description: t("posts.3.description"),
      date: "Mar 3, 2022",
      datetime: "2022-03-03",
      imageUrl:
        "/assets/images/blog/ways-to-get-started-as-an-smm-service-reseller.png",
      readingTime: "3 min",
      author: {
        name: "Jane Lu",
        href: "#",
        imageUrl: "/assets/images/avatars/team-avatar-6.webp",
      },
    },
    {
      title: t("posts.2.title"),
      href: "/blog/5-ways-to-attract-new-smm-panel-customers",
      category: { name: t("posts.categories.Article"), href: "#" },
      description: t("posts.2.description"),
      date: "Feb 25, 2022",
      datetime: "2022-02-25",
      imageUrl: "/assets/images/blog/5-ways-to-attract-new-customers.png",
      readingTime: "3 min",
      author: {
        name: "Jane Lu",
        href: "#",
        imageUrl: "/assets/images/avatars/team-avatar-6.webp",
      },
    },
    {
      title: t("posts.1.title"),
      href: "/blog/what-is-smm-panel-and-how-it-works",
      category: { name: t("posts.categories.Article"), href: "#" },
      description: t("posts.1.description"),
      date: "Feb 11, 2022",
      datetime: "2022-02-11",
      imageUrl: "/assets/images/blog/what-is-smm-panel.png",
      readingTime: "5 min",
      author: {
        name: "Jane Lu",
        href: "#",
        imageUrl: "/assets/images/avatars/team-avatar-6.webp",
      },
    },
  ];

  return (
    <>
      <Meta
        title={t("Seo.title")}
        description={t("Seo.description")}
        siteName={t("Seo.siteName")}
        url={t("Seo.url")}
      />
      <Navbar />
      <div className="relative bg-gray-50 dark:bg-gray-900 px-6 pt-24 pb-20 lg:px-8 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-white dark:bg-gray-900 sm:h-2/3" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t("Our blog")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
              {t("Description")}
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.title}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={post.imageUrl}
                    alt=""
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white dark:bg-gray-950/50 p-6">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-500">
                      <span>{post.category.name}</span>
                    </p>
                    <a href={post.href} className="mt-2 block">
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        {post.title}
                      </p>
                      <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                        {post.description}
                      </p>
                    </a>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <span className="sr-only">{post.author.name}</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={post.author.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <span>{post.author.name}</span>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                        <time dateTime={post.datetime}>{post.date}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.readingTime} read</span>
                      </div>
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

export default Blog;
