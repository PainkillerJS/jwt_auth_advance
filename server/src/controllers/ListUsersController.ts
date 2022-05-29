import type { Request, Response } from "express";

class ListUsersController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      res.json({ mess: "frfr" });
    } catch (e) {
      res.status(500).send((e as Error).message);
    }
  }
}

export default new ListUsersController();
