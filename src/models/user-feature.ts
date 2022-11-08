import { model, Schema, Types } from "mongoose";

export interface IUserFeature {
  user: Types.ObjectId;
  feature: Types.ObjectId;
  enable: boolean;
}

const userFeatureSchema = new Schema<IUserFeature>({
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
