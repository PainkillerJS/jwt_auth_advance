import makeRequest from "../makeRequest";
import { API_URL } from "../../../services/constants/http";

import type { UserGetDto, UserRequestDto } from "../../../models/dtos/userDto";

export const loginRequest = (data: UserRequestDto) => makeRequest<UserGetDto, UserRequestDto>({ method: "post", url: "/login", data });

export const registrationRequest = (data: UserRequestDto) =>
  makeRequest<UserGetDto, UserRequestDto>({ method: "post", url: "/registration", data });

export const logoutRequest = () => makeRequest<boolean>({ method: "get", url: "/logout" });

export const getUsersRequest = () => makeRequest<UserGetDto[]>({ method: "get", url: "/users" });

export const refreshRequest = () => makeRequest<UserGetDto>({ method: "get", url: `${API_URL}/refresh`, isUseInstanceAxios: false });
