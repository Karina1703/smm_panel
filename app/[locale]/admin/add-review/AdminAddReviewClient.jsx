"use client";

import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import API_URL from "@lib/apiUrl";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@node_modules/@fortawesome/free-solid-svg-icons";
import { cn } from "@lib/cn";

const AdminAddReviewPage = () => {
  const [reviewSent, setReviewSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Создаем новый экземпляр объекта FormData и передаем ему форму
    const formData = new FormData(e.target);

    // Создаем объект для хранения данных формы
    const formDataObject = {};

    // Преобразуем данные FormData в объект
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await fetch(`${API_URL}/api/admin/reviews/add-review`, {
        method: "POST",
        body: JSON.stringify(formDataObject),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setReviewSent(true); // Устанавливаем состояние, что сообщение отправлено
    } catch (error) {
      console.error("Ошибка добавления нового отзыва: ", error);
    }
  };

  return (
    <div className={"min-h-full h-full"}>
      <div className={"bg-white dark:bg-gray-900 min-h-full"}>
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-8">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Добавить отзыв</h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <hr className={"my-4 h-px border-t-0 bg-gray-300 dark:bg-gray-800 opacity-100"} />
                {/* CONTENT START */}
                {reviewSent ? (
                  <div
                    className="bg-spring-green-800 border border-spring-green-600 text-green-50 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <p>
                      <strong className="font-bold">Success!</strong>
                    </p>
                    <span className="block sm:inline">
                      Новый отзыв успешно добавлен, в скором времени он отобразится на главной странице.
                    </span>

                    <button
                      onClick={() => {
                        setReviewSent(!reviewSent);
                        setIsLoading(false);
                      }}
                      className="mt-2 flex items-center justify-center rounded-md border border-spring-green-300 bg-spring-green-950 px-4 py-2 text-base font-medium text-spring-green-300 shadow-sm hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-spring-green-500 focus:ring-offset-2"
                    >
                      <PencilSquareIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                      Написать новый отзыв
                    </button>

                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                      <FontAwesomeIcon icon={faCheck} className={"w-4 h-4"} />
                    </span>
                  </div>
                ) : (
                  <div className="mt-2 flex flex-col bg-gray-950/50 rounded-xl pt-2 px-4 pb-4">
                    <form onSubmit={handleSendMessage}>
                      <div className={"mb-2"}>
                        <div className="flex justify-between">
                          <label htmlFor="email" className="block text-sm font-medium">
                            Имя пользователя
                          </label>
                        </div>
                        <div className="mt-1">
                          <input
                            type="text"
                            name={"name"}
                            className="block w-full rounded-md bg-gray-800 border-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Marie A."
                            required
                          />
                        </div>
                      </div>
                      <div className={"mb-4"}>
                        <label htmlFor="text" className="block text-sm font-medium">
                          Текст отзыва
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={4}
                            name={"text"}
                            className="block w-full rounded-md bg-gray-800 border-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder={"Укажите текст отзыва"}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className={cn(
                            isLoading ? "opacity-50" : "",
                            "w-full inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          )}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <FontAwesomeIcon icon={faSpinner} className={"w-5 h-5 animate-spin mr-2"} />
                          ) : (
                            <PencilSquareIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                          )}
                          Отправить отзыв
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminAddReviewPage;
