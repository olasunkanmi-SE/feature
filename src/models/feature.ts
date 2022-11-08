import { model, Schema } from "mongoose";

const featureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export const Feature = model("Feature", featureSchema);
