import { getUsers } from "@lib/admin/getUsers";
import { getCurrencyRate } from "@lib/getCurrencyRate";
import { ChevronDownIcon } from "@node_modules/@heroicons/react/20/solid";
import { formattedDateTime } from "@lib/formattedDateTime";
import { getOrders } from "@lib/admin/getOrders";
import PaginationControls from "@components/PaginationControls";
import { formatCurrency } from "@lib/formatPrice";
import { cookies } from "@node_modules/next/headers";

const AdminUsersPage = async ({ searchParams }) => {
  const cookieStore = cookies();
  const currencyCookie = cookieStore.get("user_currency");
  const currency = currencyCookie?.value || process.env.NEXT_PUBLIC_DEFAULT_CURRENCY;

  const page = searchParams["page"] ?? "1";
  const perPage = searchParams["perPage"] ?? "25";

  const start = (Number(page) - 1) * Number(perPage); // 0, 5, 10 ...
  const end = start + Number(perPage); // 5, 10, 15 ...

  const usersData = await getUsers(perPage, page);
  const totalPages = Math.ceil(usersData.itemCount / perPage);

  const currencyRate = await getCurrencyRate(currency);

  return (
    <div className={"min-h-full h-full"}>
      <div className={"bg-white dark:bg-gray-900 min-h-full"}>
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-8">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Users</h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <hr className={"my-4 h-px border-t-0 bg-gray-300 dark:bg-gray-800 opacity-100"} />
                {/* USERS TABLE START */}
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-800">
                          <thead className="bg-gray-50 dark:bg-gray-950/50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white sm:pl-6"
                              >
                                <span className="group inline-flex">Email</span>
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                <span className="group inline-flex">Balance</span>
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                <span className="group inline-flex">Created at</span>
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
                              >
                                <span className="group inline-flex">Confirmed at</span>
                              </th>
                              {/*<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">*/}
                              {/*  <span className="sr-only">Edit</span>*/}
                              {/*</th>*/}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-950/50 dark:divide-gray-800">
                            {usersData.items.map((user) => (
                              <tr key={user.email}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6 flex flex-row items-center">
                                  <div>
                                    {user.image ? (
                                      <img className="inline-block h-10 w-10 rounded-full" src={user.image} alt="" />
                                    ) : (
                                      <span className="flex items-center align-middle h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                                        <svg
                                          className="h-full w-full text-gray-400"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                      </span>
                                    )}
                                  </div>
                                  <div className={"ml-2"}>
                                    <div>{user.username}</div>
                                    <div className={"text-indigo-600 dark:text-indigo-400 font-medium"}>
                                      {user.email}
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold">
                                  {formatCurrency(currency, user.balance, currencyRate)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                  {formattedDateTime(user.createdAt)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                  {user.image
                                    ? formattedDateTime(user.createdAt)
                                    : user.emailVerified
                                    ? formattedDateTime(user.emailVerified)
                                    : "--"}
                                </td>
                                {/*<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">*/}
                                {/*  <a href="#" className="text-indigo-600 dark:text-indigo-500 hover:text-indigo-900">*/}
                                {/*    Edit*/}
                                {/*    <span className="sr-only">, {user.username}</span>*/}
                                {/*  </a>*/}
                                {/*</td>*/}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <PaginationControls
                          totalItems={usersData.itemCount}
                          totalPages={totalPages}
                          hasNextPage={end < usersData.itemCount}
                          hasPrevPage={start > 0}
                          start={start + 1}
                          end={usersData.itemCount < end ? usersData.itemCount : end}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* USERS TABLE END */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
