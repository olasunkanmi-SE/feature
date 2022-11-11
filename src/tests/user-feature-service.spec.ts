import { Feature } from "./../models/feature";
import Sinon from "sinon";
import { User } from "./../models/user";
import { UserFeatureService } from "./../services/user-feature";
import { expect } from "chai";
import { UserFeature } from "../models";
import { Types } from "mongoose";
import { factory } from "typescript";
jest.setTimeout(100000);
describe("user feature service", () => {
  let props = {
    email: "ola@gmail.com",
    featureName: "new",
    enable: true,
  };
  const id = new Types.ObjectId();
  const { email, ...request } = props;
  it("it should get user and feature documents", async () => {
    Sinon.mock(User).expects("findOne").resolves({ email: props.email });
    Sinon.mock(Feature)
      .expects("findOne")
      .resolves({ featureName: props.featureName });
    const result = await UserFeatureService.getUserAndFeature(request);
    expect(result).to.have.length;
    expect(result[0].email).to.eq(props.email);
  });

  it("it should get userfeature document", async () => {
    const userFeature = {
      user: id,
      feature: id,
      enable: true,
    };
    UserFeatureService.getUserAndFeature = async (): Promise<
      any[] | undefined
    > => {
      return [
        { _id: id, email: "ola@gmail.com" },
        { _id: id, featureName: "new" },
      ];
    };
    Sinon.mock(UserFeature).expects("findOne").resolves(userFeature);
    const result = await UserFeatureService.getUserFeature(request);
    expect(result);
  });

  it("it should check if user feature exists", async () => {
    UserFeatureService.checkIfUserFeatureExists =
      async (): Promise<boolean> => {
        return true;
      };
    const result = await UserFeatureService.checkIfUserFeatureExists(request);
    expect(result).to.not.be.undefined;
  });
});
