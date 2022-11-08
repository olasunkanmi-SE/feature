import { ICreateUserFeatureDTO } from "../interface/create-feature.interface";
import { Feature, User } from "../models";
import { UserFeature } from "../models/user-feature";

export class UserFeatureService {
  static async create(props: ICreateUserFeatureDTO) {
    try {
      const userFeatureExits =
        UserFeatureService.checkIfUserFeatureExists(props);
      if (userFeatureExits) {
        throw new Error("User feature already exists");
      }
      const response = await UserFeatureService.getUserAndFeature(props);
      const user = response[0];
      const feature = response[1];
      const userFeature = new UserFeature({
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

  static async checkIfUserFeatureExists(
    props: Partial<ICreateUserFeatureDTO>
  ): Promise<boolean> {
    const response = await UserFeatureService.getUserAndFeature(props);
    const user = response[0];
    const feature = response[1];
    const userFeature = UserFeature.find({
      user: user._id,
      feature: feature._id,
    });
    return userFeature ? true : false;
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
