"use client";

import { useTranslations } from "next-intl";
import Head from "next/head";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Meta from "@components/Meta";

const About = () => {
  const t = useTranslations("About");
  const supportLinks = [
    {
      name: "Sales",
      description: t("First Block"),
    },
    {
      name: "Technical Support",
      description: t("Second Block"),
    },
    {
      name: "Media Inquiries",
      description: t("Third Block"),
    },
  ];
  const people = [
    {
      name: "Mike Reis",
      role: "Founder & CEO",
      imageUrl: "/assets/images/avatars/team-avatar-1.webp",
    },
    {
      name: "Emily Chen",
      role: "Senior Marketing Manager",
      imageUrl: "/assets/images/avatars/team-avatar-2.webp",
    },
    {
      name: "Brian Rodstain",
      role: "Data Analyst",
      imageUrl: "/assets/images/avatars/team-avatar-3.webp",
    },
    {
      name: "Evan Shapiro",
      role: "Web Developer",
      imageUrl: "/assets/images/avatars/team-avatar-4.webp",
    },
    {
      name: "Jane Lu",
      role: "Marketing Manager",
      imageUrl: "/assets/images/avatars/team-avatar-6.webp",
    },
    {
      name: "Lindsay Querol",
      role: "Customer Service Manager",
      imageUrl: "/assets/images/avatars/team-avatar-5.webp",
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
      <div className="bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="relative bg-gray-800 dark:bg-white py-32">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src="/assets/images/about-image.avif"
              alt=""
            />
            <div
              className="absolute inset-0 bg-gray-800 mix-blend-multiply"
              aria-hidden="true"
            />
          </div>
          <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-gray-300">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Overlapping cards */}
        <section
          className="relative mx-auto -mt-32 max-w-7xl px-6 pb-32 lg:px-8"
          aria-labelledby="contact-heading"
        >
          <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
            {supportLinks.map((link) => (
              <div className="flex flex-col rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-xl">
                <div className="relative flex-1 px-6 pt-8 pb-8 md:px-8">
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    {link.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/*Stats*/}

      <div className="bg-white dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-900 pb-12 sm:pb-32">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-white dark:bg-gray-900" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-4xl">
                <dl className="rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg sm:grid sm:grid-cols-4">
                  <div className="flex flex-col border-b border-gray-100 dark:border-gray-800 p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-200">
                      {t("Completed Orders")}
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600 dark:text-indigo-300">
                      180K+
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-b border-gray-100 dark:border-gray-800 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-200">
                      {t("Satisfied Clients")}
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600 dark:text-indigo-300">
                      10K+
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 dark:border-gray-800 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-200">
                      {t("Audience Reached")}
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600 dark:text-indigo-300">
                      200M+
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 dark:border-gray-800 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-200">
                      {t("Years On Market")}
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600 dark:text-indigo-300">
                      5+
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Meet Our Team*/}

      {/*<div className="bg-white dark:bg-gray-900">*/}
      {/*  <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8 lg:py-24">*/}
      {/*    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">*/}
      {/*      <div className="space-y-5 sm:space-y-4">*/}
      {/*        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">*/}
      {/*          {t("Meet our team")}*/}
      {/*        </h2>*/}
      {/*        <p className="text-lg text-gray-500 dark:text-gray-300">*/}
      {/*          {t("Each member of our team brings")}*/}
      {/*        </p>*/}
      {/*        <p className="text-lg text-gray-500 dark:text-gray-300">*/}
      {/*          {t("We believe in transparency")}*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*      <div className="lg:col-span-2">*/}
      {/*        <ul*/}
      {/*          role="list"*/}
      {/*          className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8"*/}
      {/*        >*/}
      {/*          {people.map((person) => (*/}
      {/*            <li key={person.name}>*/}
      {/*              <div className="flex items-center space-x-4 lg:space-x-6">*/}
      {/*                <img*/}
      {/*                  className="h-16 w-16 rounded-full lg:h-20 lg:w-20"*/}
      {/*                  src={person.imageUrl}*/}
      {/*                  alt=""*/}
      {/*                />*/}
      {/*                <div className="space-y-1 text-lg font-medium leading-6 text-gray-900 dark:text-white">*/}
      {/*                  <h3>{person.name}</h3>*/}
      {/*                  <p className="text-indigo-600 dark:text-indigo-300">*/}
      {/*                    {person.role}*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </li>*/}
      {/*          ))}*/}
      {/*        </ul>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Footer />
    </>
  );
};

export default About;
