import { HydratedDocument } from "mongoose";
import { IUser, User } from "../models";

export class UserService {
  static async create(email: string) {
    try {
      const userExists = await UserService.checkUser(email);

      if (userExists) {
        throw new Error("User already exists");
      }

      const user: HydratedDocument<IUser> = new User({
        email,
      });

      const createdUser = await user.save();
      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async checkUser(email: string): Promise<boolean> {
    const user = await User.findOne({ email });
    return user ? true : false;
  }
}
