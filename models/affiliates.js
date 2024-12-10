import { Schema, model, models } from "mongoose";

const AffiliatesSchema = new Schema(
  {
    userNumber: { type: Number, unique: true },
    email: String,
    code: { type: String, unique: true },
    visits: { type: Number, default: 0 },
    referrals: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    earned: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Affiliates = models.Affiliates || model("Affiliates", AffiliatesSchema);

export default Affiliates;
