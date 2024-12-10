import React from "react";
import { cn } from "@lib/cn";
import { MinusIcon } from "@node_modules/@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/20/solid";

function QuantitySelector({
  label,
  quantity,
  selectedService,
  quantityInputError,
  onChangeQuantity,
  onIncrement,
  onDecrement,
}) {
  return (
    <>
      <label className="mt-2.5 pb-2 block text-sm font-semibold">{label}</label>
      <div
        className={
          "flex items-center rounded-md border border-gray-300 dark:border-gray-700 shadow-sm"
        }
      >
        <button
          type="button"
          id="decrement-button"
          className="bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200 rounded-s-md p-3 h-[42px] focus:ring-transparent focus:outline-none"
          onClick={onDecrement}
        >
          <MinusIcon className="w-5 h-4" />
        </button>
        <input
          type={"number"}
          inputMode={"numeric"}
          name="quantity"
          value={quantity}
          className={cn(
            quantityInputError
              ? "border-red-300 dark:border-red-500 text-red-900 dark:text-red-500 placeholder-red-300 dark:placeholder-red-500 focus:border-red-500 focus:outline-none focus:ring-red-500"
              : "border-none",
            "text-center block w-full h-[42px] bg-gray-100 dark:bg-gray-800 focus:ring-transparent focus:outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          )}
          onChange={onChangeQuantity}
          placeholder={`${selectedService?.min} - ${selectedService?.max}`}
          min={selectedService ? selectedService.min : 1}
          max={selectedService ? selectedService.max : 100}
          disabled={
            selectedService?.type === "Custom Comments" ||
            selectedService?.type === "Mentions Custom List"
          }
          autoComplete={"off"}
        />
        <button
          type="button"
          id="increment-button"
          className="bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-600 hover:bg-gray-200 rounded-e-md p-3 h-[42px] focus:border-indigo-500 focus:ring-indigo-500"
          onClick={onIncrement}
        >
          <PlusIcon className="w-5 h-4 text-gray-900 dark:text-white" />
        </button>
      </div>
    </>
  );
}

export default QuantitySelector;
