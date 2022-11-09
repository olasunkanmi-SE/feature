import { ICreateUserFeatureDTO } from "../interface/create-user-feature.dto";

interface IUserError {
  body?: string;
  invalidEmail?: string;
  email?: string;
  name?: string;
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

    if (!Object.hasOwnProperty.call(props, "email")) {
      error.email = "email is required";
    }

    if (!Object.hasOwnProperty.call(props, "featureName")) {
      error.featureName = "featureName is required";
    }

    if (!Object.hasOwnProperty.call(props, "enable")) {
      error.enable = "enable is required";
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
    return JSON.stringify(error);
  }

  static validUserRequest(prop: { email: string }): IUserError {
    let error: IUserError = {};
    if (!Object.keys(prop).length) {
      error.body = "The request body cannot be empty";
    }

    if (!Object.hasOwnProperty.call(prop, "email")) {
      error.email = "email is required";
    }

    if (Object.hasOwnProperty.call(prop, "email")) {
      const { email } = prop;
      if (!RequestValidation.isEmail(email)) {
        error.invalidEmail = "Provide a valid email";
      }
    }

    return error;
  }

  static validFeatureRequest(prop: { name: string }): IUserError {
    let error: IUserError = {};
    if (!Object.keys(prop).length) {
      error.body = "The request body cannot be empty";
    }

    if (Object.hasOwnProperty.call(prop, "name")) {
      const { name } = prop;
      if (typeof name !== "string") {
        error.invalidEmail = "Name must be a string";
      }
    }

    if (!Object.hasOwnProperty.call(prop, "name")) {
      error.name = "name is required";
    }

    if (Object.hasOwnProperty.call(prop, "name")) {
      const { name } = prop;
      if (!name.length) {
        error.invalidEmail = "Name cannot be undefined";
      }
    }
    return error;
  }
}
