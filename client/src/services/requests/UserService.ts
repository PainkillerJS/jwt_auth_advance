import type { AxiosResponse } from "axios";

import { getUsersRequest } from "../../packages/api/rest/auth";

import type { UserGetDto } from "../../models/dtos/userDto";

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<UserGetDto[]>> {
    return await getUsersRequest();
  }
}
