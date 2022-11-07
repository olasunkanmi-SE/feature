import { model, Schema } from "mongoose";

const featureSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  featureName: {
    type: String,
    required: true,
  },
  enable: {
    type: Boolean,
    default: true,
  },
});

export const Feature = model("Feature", featureSchema);
