import { HydratedDocument } from "mongoose";
import { Feature } from "../models";
import { IFeature } from "./../models/feature";

export class FeatureService {
  static async create(name: string) {
    try {
      const featureExists = FeatureService.checkFeature(name);
      if (featureExists) {
        throw new Error("Feature exists");
      }

      const feature: HydratedDocument<IFeature> = new Feature({ name });
      const createFeature = await feature.save();
      return createFeature;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async checkFeature(name: string): Promise<boolean> {
    const user: HydratedDocument<IFeature> = await Feature.findOne({ name });
    return user ? true : false;
  }
}