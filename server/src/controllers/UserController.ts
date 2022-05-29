import type { Request, Response } from "express";

import userService from "../services/UserService";
import UserDto from "../dto/UserDto";
import type { IUser } from "../models/user-model";

class UserController {
  async registration(req: Request<unknown, unknown, UserDto>, res: Response) {
    try {
      const { email, password } = req.body;

      const userData = await userService.registration(email, password);
      res.cookie("refresh token", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.json(userData);
    } catch (e) {
      res.status(500).send((e as Error).message);
    }
  }

  async login(req: Request, res: Response) {
    try {
    } catch (e) {
      res.status(500).send((e as Error).message);
    }
  }

  async activate(req: Request<Pick<IUser, "activaionLink">>, res: Response) {
    try {
      const activaionLink = req.params.activaionLink;

      await userService.activate(activaionLink);

      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      res.status(500).send((e as Error).message);
    }
  }

  async logout(req: Request, res: Response) {
    try {
    } catch (e) {
      res.status(500).send((e as Error).message);
    }
  }

  async refresh(req: Request, res: Response) {
    try {
    } catch (e) {
      res.status(500).send((e as Error).message);
    }
  }
}

export default new UserController();
