"use client";

import "@styles/globals.css";
import Image from "next/image";
import AnimatedStickerRocket from "@public/assets/lottie/start.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"));

const LoadingPage = () => {
  // Or a custom loading skeleton component
  return (
    <div className="bg-white dark:bg-gray-900 h-full w-full">
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
  );
};

export default LoadingPage;
