import React from "react";
import { getReviews } from "@lib/getReviews";
import ReviewsClient from "@components/homepage/reviews/ReviewsClient";

const ReviewsServer = async () => {
  const reviews = await getReviews();
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ReviewsClient reviews={reviews} />
      </div>
    </div>
  );
};

export default ReviewsServer;
