import { makeAutoObservable } from "mobx";

import { setTokenStorage } from "../../packages/storage/";

import type { User } from "../../models/auth/user";
import type { UserGetDto } from "../../models/dtos/userDto";

import AuthService from "../requests/AuthService";

export default class Store {
   user = {} as User;
   isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  private setAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  private setUser(user: User) {
    this.user = user;
  }

  private globalUpdateStorage(response: UserGetDto) {
    setTokenStorage(response.accessToken);
    this.setAuth(true);
    this.setUser(response.user);
  }

  async login(email: string, password: string) {
    try {
      const { data } = await AuthService.login(email, password);

      this.globalUpdateStorage(data);
    } catch (e) {
      console.log(e);
    }
  }

  async registration(email: string, password: string) {
    try {
      const { data } = await AuthService.registration(email, password);

      this.globalUpdateStorage(data);
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      await AuthService.logout();

      this.setAuth(false);
      this.setUser({} as User);
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    try {
      const { data } = await AuthService.refresh();

      this.globalUpdateStorage(data);
    } catch (e) {
      console.log(e);
    }
  }
}
