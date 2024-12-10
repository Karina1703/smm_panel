import React from "react";
import { cn } from "@lib/cn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons";
import LinkInfoModal from "@components/modal/LinkInfoModal";
import { useState } from "react";

const Input = ({ label, inputError, selectedService, onChange, placeholder }) => {
  const [linkModalOpen, setLinkModalOpen] = useState(false);

  return (
    <>
      <label className="mt-2.5 pb-2 flex items-center text-sm font-semibold">
        {label}
        {label === "Link" ? (
          <span className="ml-2 flex items-center">
            <FontAwesomeIcon
              icon={fa.faCircleQuestion}
              className={"w-3 h-3 dark:text-gray-500 dark:hover:text-gray-300"}
              onClick={() => setLinkModalOpen(true)}
            />
          </span>
        ) : null}
      </label>

      <div className="">
        <input
          type={"text"}
          className={cn(
            inputError
              ? "border-red-300 dark:border-red-500 text-red-900 dark:text-red-500 placeholder-red-300 dark:placeholder-red-500 focus:border-red-500 focus:ring-red-500"
              : "border border-gray-300 dark:border-gray-700",
            "block w-full h-[42px] rounded-md bg-gray-100 dark:bg-gray-800 shadow-sm focus:ring-1 dark:focus:border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          )}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>

      {/* Link Instruction Modal Window */}
      {linkModalOpen && (
        <LinkInfoModal isOpen={linkModalOpen} onClose={() => setLinkModalOpen(false)} />
      )}
    </>
  );
};

export default Input;
