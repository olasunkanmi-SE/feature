import { ICreateUserFeatureDTO } from "../interface/create-user-feature.dto";

interface IUserError {
  body?: string;
  invalidEmail?: string;
}
export class RequestValidation {
  static isEmail(prop: string): boolean {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return prop.match(regex) ? true : false;
  }

  static validateUserFeatureRequest(
    props: Partial<ICreateUserFeatureDTO>
  ): string {
    let error: any = {};

    if (!Object.keys(props).length) {
      error.body = "request body is required";
    }

    if (Object.hasOwnProperty.call(props, "email")) {
      const { email } = props;
      if (!RequestValidation.isEmail(email)) {
        error.invalidEmail = "Provide a valid email";
      }
    }

    if (Object.hasOwnProperty.call(props, "featureName")) {
      const { featureName } = props;
      if (typeof featureName !== "string") {
        error.inValidFeatureName = "Feature Name has to be a string";
      }
    }

    if (Object.hasOwnProperty.call(props, "enable")) {
      const { enable } = props;
      if (typeof enable !== "boolean") {
        error.invalidEnable = "enable must be a boolean";
      }
    }
    return error;
  }

  static validRequest(prop: { email?: string; name?: string }): IUserError {
    let error: IUserError = {};
    if (!Object.keys(prop).length) {
      error.body = "The request body cannot be empty";
    }

    if (Object.hasOwnProperty.call(prop, "email")) {
      const { email } = prop;
      if (!RequestValidation.isEmail(email)) {
        error.invalidEmail = "Provide a valid email";
      }
    }

    if (Object.hasOwnProperty.call(prop, "name")) {
      const { name } = prop;
      if (typeof name !== "string") {
        error.invalidEmail = "Name must be a string";
      }
    }
    return error;
  }
}
