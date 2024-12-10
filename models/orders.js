import { Schema, model, models } from "mongoose";

const OrdersSchema = new Schema(
  {
    orderId: { type: String, unique: true },
    isSubscription: Boolean,
    subscriptionId: String,
    createdBy: String, // API or Default
    orderType: String, // Default, Package, Custom Comments, Mentions Hashtag,  Mentions with Hashtags, Mentions Custom List, Mentions User Followers, Custom Comments Package
    userEmail: String,
    serviceId: Number,
    name: String, // Name of the service on Russian
    // name_en: String, // Name of the service on English
    category: String, // Service category
    quantity: Number,
    price: Number,
    link: String,
    startCount: Number,
    remains: Number,
    status: String,
    // customComments: String,
    // mentionsHashtag: String,
    // mentionsWithHashtagsUsernames: String,
    // mentionsWithHashtags: String,
    // mentionsCustomList: String,
    // mentionsUserFollowers: String,
    // customCommentsPackage: String,
  },
  {
    timestamps: true,
  }
);

const Orders = models.Orders || model("Orders", OrdersSchema);

export default Orders;
