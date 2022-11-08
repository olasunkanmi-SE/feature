import { model, Schema } from "mongoose";

const userFeatureSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  feature: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Feature",
  },
  enable: {
    type: Boolean,
    default: true,
  },
});

export const UserFeature = model("UserFeature", userFeatureSchema);
