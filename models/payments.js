import { Schema, model, models } from "mongoose";

const PaymentsSchema = new Schema(
  {
    paymentId: Number,
    amount: Number,
    email: String,
    status: Number,
    gateway: String,
    type: String,
    orderId: String,
  },
  {
    timestamps: true,
  }
);

const Payments = models.Payments || model("Payments", PaymentsSchema);

export default Payments;
