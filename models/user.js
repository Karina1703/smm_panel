import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    userNumber: { type: Number, unique: true },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      // required: [true, "Username is required"],
      // match: [
      //   /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      //   "Username invalid, it should contain 3-20 alphanumeric letters and be unique!",
      // ],
    },
    image: { type: String },
    role: { type: String, default: "customer" },
    balance: { type: Number, default: 0 },
    spent: { type: Number, default: 0 },
    orders: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    affiliate_bonus: { type: Number, default: 0 },
    api_key: { type: String, unique: true },
    referrer: String,
    referrer_earned: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
