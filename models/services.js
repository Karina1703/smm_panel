import { Schema, model, models } from "mongoose";

const ServicesSchema = new Schema(
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
    description: { type: String, default: "" },
    linkExample: { type: String, default: "https://example.com/XXXXXX" },
    description_en: { type: String, default: "" },
    enabled: { type: Boolean, default: "true" },
  },
  { timestamps: true }
);

const Services = models.Services || model("Services", ServicesSchema);

export default Services;
