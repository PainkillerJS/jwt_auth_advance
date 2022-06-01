import type { ValidationError } from "express-validator";

import { UserAuthError } from "../constants/UserError";

type TApiErrorPayload = {
  status: number;
  message: string;
  errors?: string[] | ValidationError[];
};

export default class ApiError extends Error {
  public readonly status: TApiErrorPayload["status"];
  public readonly errors: TApiErrorPayload["errors"];

  constructor({ status, message, errors = [] }: TApiErrorPayload) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static UnAuthError() {
    return new ApiError({ status: 401, message: UserAuthError.USER_NO_AUTH_ERROR });
  }

  static BadRequest(message: TApiErrorPayload["message"], errors?: TApiErrorPayload["errors"]) {
    return new ApiError({ status: 401, message, errors });
  }
}
