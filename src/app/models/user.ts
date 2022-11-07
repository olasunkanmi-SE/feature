import { model, Schema } from "mongoose";

const userSchema = new Schema({
  user: {
    email: String,
    required: true,
  },
});
export const User = model("User", userSchema);
