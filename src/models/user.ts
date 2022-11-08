import { model, Schema } from "mongoose";

export interface IUser {
  email: string;
}
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
});
export const User = model("User", userSchema);
