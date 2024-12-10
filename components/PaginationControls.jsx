"use client";

import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@lib/cn";

const PaginationControls = ({ totalItems, totalPages, hasNextPage, hasPrevPage, start, end }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("perPage") ?? "25";

  return (
    <div className="flex items-center justify-between border-t border-gray-800 bg-gray-950/50 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          className={cn(
            !hasPrevPage ? "text-gray-400" : "hover:bg-gray-800",
            "relative inline-flex items-center rounded-md border border-gray-800 bg-gray-950/50 px-4 py-2 text-sm font-medium"
          )}
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(`?page=${Number(page) - 1}&perPage=${perPage}`);
          }}
        >
          Previous
        </button>
        <button
          className={cn(
            !hasNextPage ? "text-gray-500" : "hover:bg-gray-800",
            "relative ml-3 inline-flex items-center rounded-md border border-gray-800 bg-gray-950/50 px-4 py-2 text-sm font-medium"
          )}
          disabled={!hasNextPage}
          onClick={() => {
            router.push(`?page=${Number(page) + 1}&perPage=${perPage}`);
          }}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm">
            Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              className={cn(
                !hasPrevPage ? "text-gray-500" : "hover:bg-gray-800",
                "relative inline-flex items-center rounded-l-md border border-gray-800 bg-gray-950/50 px-2 py-2 text-sm font-medium focus:z-20"
              )}
              disabled={!hasPrevPage}
              onClick={() => {
                router.push(`?page=${Number(page) - 1}&perPage=${perPage}`);
              }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-500/30 border-indigo-500", Default: "bg-gray-950/50 border-gray-800 hover:bg-gray-800" */}
            {/*<a*/}
            {/*  href="#"*/}
            {/*  aria-current="page"*/}
            {/*  className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-500/30 px-4 py-2 text-sm font-medium focus:z-20"*/}
            {/*>*/}
            {/*  1*/}
            {/*</a>*/}
            {/*<a*/}
            {/*  href="#"*/}
            {/*  className="relative inline-flex items-center border border-gray-800 bg-gray-950/50 px-4 py-2 text-sm font-medium hover:bg-gray-800 focus:z-20"*/}
            {/*>*/}
            {/*  2*/}
            {/*</a>*/}
            {/*<a*/}
            {/*  href="#"*/}
            {/*  className="relative hidden items-center border border-gray-800 bg-gray-950/50 px-4 py-2 text-sm font-medium hover:bg-gray-800 focus:z-20 md:inline-flex"*/}
            {/*>*/}
            {/*  3*/}
            {/*</a>*/}
            <span className="relative inline-flex items-center border border-gray-800 bg-gray-950/50 px-4 py-2 text-sm font-medium text-gray-200">
              {page + " / " + totalPages}
            </span>
            {/*<a*/}
            {/*  href="#"*/}
            {/*  className="relative hidden items-center border border-gray-800 bg-gray-950/50 px-4 py-2 text-sm font-medium hover:bg-gray-800 focus:z-20 md:inline-flex"*/}
            {/*>*/}
            {/*  8*/}
            {/*</a>*/}
            {/*<a*/}
            {/*  href="#"*/}
            {/*  className="relative inline-flex items-center border border-gray-800 bg-gray-950/50 px-4 py-2 text-sm font-medium hover:bg-gray-800 focus:z-20"*/}
            {/*>*/}
            {/*  9*/}
            {/*</a>*/}
            {/*<a*/}
            {/*  href="#"*/}
            {/*  className="relative inline-flex items-center border border-gray-800 bg-gray-950/50 px-4 py-2 text-sm font-medium hover:bg-gray-800 focus:z-20"*/}
            {/*>*/}
            {/*  10*/}
            {/*</a>*/}
            <button
              className={cn(
                !hasNextPage ? "text-gray-500" : "hover:bg-gray-800",
                "relative inline-flex items-center rounded-r-md border border-gray-800 bg-gray-950/50 px-2 py-2 text-sm font-medium focus:z-20"
              )}
              disabled={!hasNextPage}
              onClick={() => {
                router.push(`?page=${Number(page) + 1}&perPage=${perPage}`);
              }}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
