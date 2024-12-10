"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const Services = () => {
  const t = useTranslations("Services");
  const features = [
    {
      name: "Instagram",
      icon: "/assets/icons/instagram.webp",
      desc: t("Instagram Description"),
    },
    {
      name: "TikTok",
      icon: "/assets/icons/tiktok.webp",
      desc: t("TikTok Description"),
    },
    {
      name: "YouTube",
      icon: "/assets/icons/youtube.webp",
      desc: t("YouTube Description"),
    },
    {
      name: "Twitter",
      icon: "/assets/icons/twitter.webp",
      desc: t("Twitter Description"),
    },
    {
      name: "Facebook",
      icon: "/assets/icons/facebook.webp",
      desc: t("Facebook Description"),
    },
    {
      name: "Telegram",
      icon: "/assets/icons/telegram.webp",
      desc: t("Telegram Description"),
    },
    {
      name: "Discord",
      icon: "/assets/icons/discord.webp",
      desc: t("Discord Description"),
    },
    {
      name: "SoundCloud",
      icon: "/assets/icons/soundcloud.webp",
      desc: t("SoundCloud Description"),
    },
    {
      name: "Spotify",
      icon: "/assets/icons/spotify.webp",
      desc: t("Spotify Description"),
    },
    {
      name: "VK",
      icon: "/assets/icons/vk.webp",
      desc: t("VK Description"),
    },
    {
      name: "App Store / Google Play",
      icon: "/assets/icons/appstore.webp",
      desc: t("App Store Description"),
    },
    {
      name: "Website Traffic",
      icon: "/assets/icons/safari.webp",
      desc: t("Website Traffic Description"),
    },
  ];

  return (
    <div className="relative bg-white dark:bg-gray-900 pt-10 pb-16 sm:pb-16 lg:pb-16">
      <div className="mx-auto max-w-md px-4 lg:text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-base uppercase font-semibold tracking-wider text-indigo-600 dark:text-indigo-300">
          {t("Grow Your Social Media")}
        </h2>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
          {t("Explore our wide range of services")}
        </p>
        <p className="mt-5 max-w-prose mx-auto text-lg leading-8 text-gray-600 dark:text-gray-300">
          {t("Our platform offers a comprehensive list")}
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center">
                        <Image src={feature.icon} alt="" className={"h-12 w-12 text-white"} width={48} height={48} />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
