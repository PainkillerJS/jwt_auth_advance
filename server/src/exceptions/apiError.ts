import { UserAuthError } from "../constants/UserError";

type TApiErrorPayload = {
  status: number;
  message: string;
  errors?: string[];
};

export default class ApiError extends Error {
  public readonly status: number;
  public readonly errors: string[];

  constructor({ status, message, errors = [] }: TApiErrorPayload) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static UnauthError() {
    return new ApiError({ status: 401, message: UserAuthError.USER_NO_AUTH_ERROR });
  }

  static BadRequest(message: string, errors?: string[]) {
    return new ApiError({ status: 401, message, errors });
  }
}
