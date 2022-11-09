import { HydratedDocument } from "mongoose";
import { ICreateUserFeatureDTO } from "../interface/create-user-feature.dto";
import { Feature, User } from "../models";
import { IUserFeature, UserFeature } from "../models/user-feature";

export class UserFeatureService {
  static async create(props: ICreateUserFeatureDTO) {
    try {
      const userFeatureExits =
        await UserFeatureService.checkIfUserFeatureExists(props);
      if (userFeatureExits) {
        throw new Error("User feature already exists");
      }
      const response = await UserFeatureService.getUserAndFeature(props);
      const user = response[0];
      const feature = response[1];
      const userFeature: HydratedDocument<IUserFeature> = new UserFeature({
        user: user._id,
        feature: feature._id,
        enable: true,
      });
      const createdFeature = await userFeature.save();
      return createdFeature;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUserFeature(props: Partial<ICreateUserFeatureDTO>) {
    const response = await UserFeatureService.getUserAndFeature(props);
    const user = response[0];
    const feature = response[1];
    const userFeature = await UserFeature.findOne({
      user: user._id,
      feature: feature._id,
    });
    return userFeature;
  }

  static async checkIfUserFeatureExists(
    props: Partial<ICreateUserFeatureDTO>
  ): Promise<boolean> {
    return (await UserFeatureService.getUserFeature(props)) ? true : false;
  }

  static async getUserAndFeature(
    props: Partial<ICreateUserFeatureDTO>
  ): Promise<any[]> {
    const { email, featureName } = props;
    const data: any[] = [];
    data.push(User.findOne({ email }), Feature.findOne({ name: featureName }));
    const response: any[] = await Promise.all(data);
    return response;
  }
}
