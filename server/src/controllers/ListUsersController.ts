import type { Request, Response, NextFunction } from "express";

import listUsersService from "../services/ListUserService";

class ListUsersController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await listUsersService.getUsers();

      return res.json(users);
    } catch (e) {
      next((e as Error).message);
    }
  }
}

export default new ListUsersController();
