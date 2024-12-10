import { Schema, model, models } from "mongoose";

const PayoutsSchema = new Schema(
  {
    payoutId: Number,
    amount: Number,
    email: String,
    status: Number,
    payoutMethod: String,
    wallet: String,
  },
  {
    timestamps: true,
  }
);

const Payouts = models.Payouts || model("Payouts", PayoutsSchema);

export default Payouts;
