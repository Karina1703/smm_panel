"use client";

import "@styles/globals.css";
import Image from "next/image";
import AnimatedStickerRocket from "@public/assets/lottie/start.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"));

const LoadingPage = () => {
  // Or a custom loading skeleton component
  return (
    <div className={"w-full h-full bg-white dark:bg-gray-900"}>
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-8">
              <div
                className={
                  "animate-pulse flex h-screen w-full justify-center items-center"
                }
              >
                <Lottie
                  animationData={AnimatedStickerRocket}
                  loop={true}
                  className={"w-[100px] h-[100px]"}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoadingPage;
