import { useState } from "react";
import { Switch } from "@headlessui/react";
import { cn } from "@lib/cn";
import { BoltIcon, RocketLaunchIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "@node_modules/next-intl";

const PriorityProcessing = ({ handleSwitch, value }) => {
  const t = useTranslations("Order");

  return (
    <>
      <Switch.Group as="div" className="flex items-center ">
        <Switch
          checked={value}
          onChange={handleSwitch}
          className={cn(
            value ? "bg-[#00D54B]" : "dark:bg-gray-800 bg-gray-200",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              value ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
        <Switch.Label as="span" className="ml-3">
          <RocketLaunchIcon className={"inline-flex w-6 h-6 mr-2"} />
          <span className="text-sm">{t("quickOrder.Priority Processing")}</span>
          {/*<span className="text-sm text-indigo-600"> (Save 10%)</span>*/}
        </Switch.Label>
      </Switch.Group>
    </>
  );
};

export default PriorityProcessing;
