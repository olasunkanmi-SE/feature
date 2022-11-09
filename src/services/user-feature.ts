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
      const [user, feature] = await UserFeatureService.getUserAndFeature(props);
      if (!user) {
        throw new Error("User does not");
      }
      if (!feature) {
        throw new Error("feature does not");
      }
      let createdFeature;
      if (user && feature) {
        const userFeature: HydratedDocument<IUserFeature> = new UserFeature({
          user: user._id,
          feature: feature._id,
          enable: props.enable,
        });
        createdFeature = await userFeature.save();
      }
      return createdFeature;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUserFeature(
    props: Partial<ICreateUserFeatureDTO | undefined>
  ) {
    let userFeature;
    const [user, feature] = await UserFeatureService.getUserAndFeature(props);
    if (user && feature) {
      userFeature = await UserFeature.findOne({
        user: user._id,
        feature: feature._id,
      });
    }
    return userFeature;
  }

  static async checkIfUserFeatureExists(
    props: Partial<ICreateUserFeatureDTO>
  ): Promise<boolean> {
    return (await UserFeatureService.getUserFeature(props)) ? true : false;
  }

  static async getUserAndFeature(
    props: Partial<ICreateUserFeatureDTO>
  ): Promise<any[] | undefined> {
    const { email, featureName } = props;
    const data: any[] = [];
    data.push(User.findOne({ email }), Feature.findOne({ name: featureName }));
    let response: any[] = await Promise.all(data);
    for (let res of response) {
      if (response[res] === null) {
        response = undefined;
        break;
      }
    }
    return response;
  }
}
