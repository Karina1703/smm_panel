"use client";

import React from "react";
import { useConstants } from "@constants";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServicesClient = ({ services }) => {
  const { categories } = useConstants();

  return (
    <div className={"bg-white dark:bg-gray-900 min-h-full"}>
      <div className="flex flex-1 flex-col md:pl-64">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Services
              </h1>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
                A list of all services in our platform including their name,
                price, quantity and specifications.
              </p>
            </div>
          </div>
          <div className=" mt-8 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 mx-0 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-950/50">
                <tr>
                  <th
                    scope="col"
                    className="table-cell px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="table-cell px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
                  >
                    <dt className="sr-only">Refill</dt>
                    {/*<ShieldCheckIcon className={"h-6 w-6"} />*/}
                    Refill
                  </th>
                  <th
                    scope="col"
                    className="table-cell px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
                  >
                    <dt className="sr-only">Start Time</dt>
                    {/*<ClockIcon className={"h-6 w-6"} />*/}
                    Start
                  </th>
                  <th
                    scope="col"
                    className="table-cell px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
                  >
                    <dt className="sr-only">Speed</dt>
                    {/*<TruckIcon className={"h-6 w-6"} />*/}
                    Speed
                  </th>
                  <th
                    scope="col"
                    className="table-cell px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
                  >
                    <dt className="sr-only">Quality</dt>
                    {/*<TrophyIcon className={"h-6 w-6"} />*/}
                    Quality
                  </th>
                  <th
                    scope="col"
                    className="table-cell px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
                  >
                    Min
                  </th>
                  <th
                    scope="col"
                    className="table-cell px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
                  >
                    Max
                  </th>
                  <th
                    scope="col"
                    className="table-cell px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-950/50 dark:divide-gray-800">
                {categories.map((category) => (
                  <>
                    <tr key={category.name}>
                      <th
                        className="w-full max-w-0 py-4 pl-4 pr-3 text-left text-xl font-semibold text-gray-900 dark:text-white sm:w-auto sm:max-w-none sm:pl-6"
                        colSpan={8}
                      >
                        <div className={"flex flex-row items-center"}>
                          <Image
                            src={category.image}
                            className={"mr-3"}
                            width={24}
                            height={24}
                            alt={category.name}
                          />
                          {category.name}
                        </div>
                      </th>
                    </tr>
                    {Object.values(category.subCategories).map(
                      (subCategory) => (
                        <>
                          <tr key={subCategory.tag + category.id}>
                            <th
                              className="w-full max-w-0 py-4 pl-4 pr-3 text-left text-lg font-medium text-indigo-600 dark:text-indigo-500 sm:w-auto sm:max-w-none sm:pl-6"
                              colSpan={8}
                            >
                              <FontAwesomeIcon
                                icon={subCategory.icon}
                                className={"w-5 h-5 mr-2"}
                              />{" "}
                              {subCategory.name}
                            </th>
                          </tr>
                          {services
                            .filter(
                              (service) =>
                                service.category === category.name &&
                                service.subCategory === subCategory.tag
                            )
                            .map((service) => (
                              <tr key={service.serviceId}>
                                <td className="table-cell sm:pl-6 px-3 py-4 text-sm text-gray-500 dark:text-white max-w-xs break-words">
                                  {`${service.name} [ID${service.serviceId}]`}
                                </td>
                                <td className="table-cell px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  {service.refill}
                                </td>
                                <td className="table-cell px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  {service.est}
                                </td>
                                <td className="table-cell px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  {service.speed}
                                </td>
                                <td className="table-cell px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  {service.quality}
                                </td>
                                <td className="table-cell px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  {service.min}
                                </td>
                                <td className="table-cell px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  {service.max}
                                </td>
                                <td className="table-cell px-3 py-4 text-sm text-gray-500 dark:text-white">
                                  {service.rate1K}
                                </td>
                              </tr>
                            ))}
                        </>
                      )
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesClient;
