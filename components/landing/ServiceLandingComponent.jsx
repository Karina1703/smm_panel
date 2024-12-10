import React from "react";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import QuickOrderServer from "@components/quickOrder/QuickOrderServer";

const ServiceLandingComponent = ({ t, service }) => {
  return (
    <>
      <Navbar />
      {/* HEADING TITLE */}
      <div className="relative isolate bg-white dark:bg-gray-900">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50 dark:fill-gray-800/50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
        </svg>
        <div className="mx-auto max-w-7xl px-6 pt-24 sm:pt-32 pb-0 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:pt-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">{t("description")}</p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t("Get started")}
              </a>
              <a href="/" className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                {t("Learn more")} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 flex-shrink-0 flex-grow">
            <img src={`/assets/images/landing/${service}.png`} alt="" className={"w-96"} />
          </div>
        </div>
      </div>
      <QuickOrderServer />
      {/* SEO CONTENT */}
      <div className={"bg-white dark:bg-gray-900"}>
        <div className={"mx-auto max-w-7xl px-6 pb-6 lg:flex lg:items-center lg:gap-x-10 lg:px-8"}>
          <div
            className={
              "prose max-w-full text-gray-900 dark:text-white bg-gray-200/50 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg"
            }
          >
            {t.rich("content", {
              p: (chunks) => <p>{chunks}</p>,
              b: (chunks) => <b>{chunks}</b>,
              li: (chunks) => <li>{chunks}</li>,
              ol: (chunks) => <ol>{chunks}</ol>,
            })}
          </div>
        </div>
      </div>
      {/* CTA SECTION */}
      <div className="relative isolate overflow-hidden bg-gray-900">
        <div className="py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              {t("cta.title-1")}
              <br />
              {t("cta.title-2")}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">{t("cta.content")}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t("Get started")}
              </a>
              <a href="/" className="text-base font-semibold leading-7 text-white">
                {t("Learn more")} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
          aria-hidden="true"
        >
          <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
          <defs>
            <radialGradient
              id="8d958450-c69f-4251-94bc-4e091a323369"
              cx={0}
              cy={0}
              r={1}
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <Footer />
    </>
  );
};

export default ServiceLandingComponent;
