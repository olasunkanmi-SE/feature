import { model, Schema } from "mongoose";

export interface IUser {
  email: string;
}
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
});
export const User = model("User", userSchema);
