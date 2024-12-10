import { Schema, model, models } from "mongoose";

const ReviewsSchema = new Schema(
  {
    name: String,
    text: String,
  },
  { timestamps: true }
);

const Reviews = models.Reviews || model("Reviews", ReviewsSchema);

export default Reviews;
