import { model, Schema } from "mongoose";
export interface IFeature {
  name: string;
}
const featureSchema = new Schema<IFeature>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

export const Feature = model("Feature", featureSchema);
