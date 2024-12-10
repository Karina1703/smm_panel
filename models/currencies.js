import { Schema, model, models } from "mongoose";

const CurrenciesSchema = new Schema(
  {
    currency: String,
    value: Number,
    name: String,
  },
  { timestamps: true }
);

const Currencies = models.Currencies || model("Currencies", CurrenciesSchema);

export default Currencies;
