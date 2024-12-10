import React from "react";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@node_modules/@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { generateAvatarLetters } from "@lib/helpers/generateAvatarLetters";
import { formattedDateTime } from "@lib/formattedDateTime";

const ReviewsClient = ({ reviews }) => {
  return (
    <>
      <div className="h-fit rounded-lg bg-gray-200 dark:bg-gray-950/50 px-4 py-6 sm:px-8 sm:py-8 shadow ring-1 ring-black ring-opacity-5">
        <div className={"flex items-center justify-between bg-gray-800 rounded-md p-4"}>
          <div className={"text-lg sm:text-2xl font-bold"}>Customer Reviews</div>
          <div className={"flex flex-col text-sm sm:text-normal sm:flex-row items-end sm:items-center"}>
            <span className={"hidden sm:flex"}>Rating</span>
            <div className={"flex flex-row items-center gap-x-1"}>
              <div className={"sm:mx-2 flex gap-x-0.5"}>
                <FontAwesomeIcon icon={faStar} className={"w-5 h-5 text-energy-yellow-400"} />
                <FontAwesomeIcon icon={faStar} className={"w-5 h-5 text-energy-yellow-400"} />
                <FontAwesomeIcon icon={faStar} className={"w-5 h-5 text-energy-yellow-400"} />
                <FontAwesomeIcon icon={faStar} className={"w-5 h-5 text-energy-yellow-400"} />
                <FontAwesomeIcon icon={faStarHalfAlt} className={"w-5 h-5 text-energy-yellow-400"} />
              </div>
              <span className={"sm:mr-6 font-semibold"}>
                <b>4.89</b>/5
              </span>
            </div>
            <span className={"ml-auto"}>
              {(17830 + reviews.length).toLocaleString("en-US")} reviews (
              <Link href={"#"} className={"text-indigo-400 hover:underline"}>
                View all
              </Link>
              )
            </span>
          </div>
        </div>

        {Array.isArray(reviews) && reviews?.map((review, index) => (
          <div key={index} className={"flex flex-col sm:flex-row mt-2 sm:items-center bg-gray-800 rounded-md p-4"}>
            <div className={"flex flex-row items-center space-x-4 min-w-max"}>
              <div
                className={
                  "bg-orange-300 rounded-full h-14 w-14 flex items-center justify-center font-semibold text-lg"
                }
              >
                {generateAvatarLetters(review.name)}
              </div>
              <div>
                <div>{review.name}</div>
                <div className={"flex flex-row items-center"}>
                  <FontAwesomeIcon icon={faStar} className={"w-4 h-4 text-energy-yellow-400"} />
                  <FontAwesomeIcon icon={faStar} className={"w-4 h-4 text-energy-yellow-400"} />
                  <FontAwesomeIcon icon={faStar} className={"w-4 h-4 text-energy-yellow-400"} />
                  <FontAwesomeIcon icon={faStar} className={"w-4 h-4 text-energy-yellow-400"} />
                  <FontAwesomeIcon icon={faStar} className={"w-4 h-4 text-energy-yellow-400"} />
                </div>
                <div className={"opacity-70 text-[12px]"}>{formattedDateTime(review.createdAt)}</div>
              </div>
            </div>
            <div className={"w-20 h-[1px] my-4 sm:w-[1px] sm:h-20 sm:mx-10 md:mx-20 bg-gray-700"}></div>
            <div>{review.text}</div>
          </div>
        ))}

        <div className={"flex flex-col mt-4 sm:flex-row items-center text-center sm:text-start"}>
          <div className={"text-center"}>
            <div className={"my-4 sm:mb-4 font-bold text-xl sm:text-4xl"}>365 days Money Back Guarantee</div>
            <p>
              We provide an unequivocal assurance of 100% satisfaction through our help and support service. In the rare
              event that our service fails to meet your requirements, we offer a full refund of your purchase price
              within 365 days. Please be aware that products purchased at a discounted rate are not eligible for
              refunds.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsClient;
