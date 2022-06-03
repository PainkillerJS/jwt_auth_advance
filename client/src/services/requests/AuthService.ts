import type { AxiosResponse } from "axios";

import { loginRequest, registrationRequest, logoutRequest, refreshRequest } from "../../packages/api/rest/auth";

import type { UserGetDto } from "../../models/dtos/userDto";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<UserGetDto>> {
    return loginRequest({ email, password });
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<UserGetDto>> {
    return registrationRequest({ email, password });
  }

  static async logout(): Promise<void> {
    await logoutRequest();
  }

  static async refresh(): Promise<AxiosResponse<UserGetDto>> {
    const response = await refreshRequest();

    return response;
  }
}
