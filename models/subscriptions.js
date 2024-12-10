import { Schema, model, models } from "mongoose";

const SubscriptionsSchema = new Schema({
  subscriptionId: { type: Number, unique: true },
  associatedPayment: Number, // Payment ID from payments collection
  type: String, // Weekly, Monthly
  email: String,
  charge: Number, // Amount (USD)
  status: String, // Active or Canceled
  createDate: Date,
  nextCharge: Date,
  serviceId: Number,
  quantity: Number,
  link: String,
});

const Subscriptions = models.Subscriptions || model("Subscriptions", SubscriptionsSchema);

export default Subscriptions;
