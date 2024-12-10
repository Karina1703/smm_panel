import { Schema, model, models } from "mongoose";

const LiveUsersSchema = new Schema(
  {
    name: String,
    online: Number,
  },
  { timestamps: true }
);

const LiveUsers = models.LiveUsers || model("Live Users", LiveUsersSchema);

export default LiveUsers;
