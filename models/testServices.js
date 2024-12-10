import { Schema, model, models } from "mongoose";

const TestServicesSchema = new Schema(
  {
    serviceId: { type: Number, unique: true },
    category: String,
    subCategory: { type: String, default: "Нет" },
    name: String,
    type: String,
    rate1K: Number,
    rate: Number,
    min: Number,
    max: Number,
    est: { type: String, default: "0-1 час" },
    speed: { type: String, default: "10K/день" },
    geo: { type: String, default: "Весь мир" },
    refill: { type: String, default: "Нет" },
    quality: { type: String, default: "Высокое" },
    description: { type: String, default: "" },
    linkExample: { type: String, default: "https://example.com/XXXXXX" },
    name_en: String,
    est_en: { type: String, default: "0-1 hour" },
    speed_en: { type: String, default: "10K/day" },
    geo_en: { type: String, default: "Worldwide" },
    refill_en: { type: String, default: "No" },
    quality_en: { type: String, default: "High" },
    description_en: { type: String, default: "" },
    enabled: { type: Boolean, default: "true" },
  },
  { timestamps: true }
);

const TestServices = models.TestServices || model("TestServices", TestServicesSchema);

export default TestServices;
