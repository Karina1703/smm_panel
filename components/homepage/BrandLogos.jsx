import React from "react";
import LogoBuildboxSvg from "@public/assets/icons/svg/LogoBuildboxSvg";
import LogoIvecoSvg from "@public/assets/icons/svg/LogoIvecoSvg";
import LogoMonzoSvg from "@public/assets/icons/svg/LogoMonzoSvg";
import LogoPixSvg from "@public/assets/icons/svg/LogoPixSvg";
import LogoSpoonSvg from "@public/assets/icons/svg/LogoSpoonSvg";
import LogoSteelseriesSvg from "@public/assets/icons/svg/LogoSteelseriesSvg";
import LogoVeeamSvg from "@public/assets/icons/svg/LogoVeeamSvg";
import LogoZendeskSvg from "@public/assets/icons/svg/LogoZendeskSvg";

const BrandLogos = () => {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl sm:pt-6 pb-16 px-6 lg:px-8">
        <h2 className="uppercase text-xl font-semibold tracking-tight text-center animate-text bg-gradient-to-r from-blue-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
          Trusted by the world’s most innovative teams
        </h2>
        <div className="mt-8 flow-root lg:mt-10">
          <div className="flex flex-wrap justify-between gap-x-8 lg:gap-x-4">
            <div className="mt-4 flex">
              <LogoBuildboxSvg className={"h-12 w-12 text-white"} />
            </div>
            <div className="mt-4 flex">
              <LogoIvecoSvg className={"h-12 w-12 text-white"} />
            </div>
            <div className="mt-4 flex">
              <LogoMonzoSvg className={"h-12 w-12 text-white"} />
            </div>
            <div className="mt-4 flex">
              <LogoPixSvg className={"h-12 w-12 text-white"} />
            </div>
            <div className="mt-4 flex">
              <LogoSpoonSvg className={"h-12 w-12 text-white"} />
            </div>
            <div className="mt-4 flex">
              <LogoSteelseriesSvg className={"h-12 w-12 text-white"} />
            </div>
            <div className="mt-4 flex">
              <LogoVeeamSvg className={"h-12 w-12 text-white"} />
            </div>
            <div className="mt-4 flex">
              <LogoZendeskSvg className={"h-12 w-12 text-white"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandLogos;
