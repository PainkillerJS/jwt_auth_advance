import jwt from "jsonwebtoken";

import tokenModel from "../models/token-model";

import type { IToken } from "../models/token-model";
import type { IUser } from "../models/user-model";

type payloadData = Pick<IUser, "_id" | "email" | "isActivated">;

class TokenService {
  generateToken(payload: payloadData) {
    const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS, { expiresIn: "30m" });
    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH, { expiresIn: "30d" });

    return { accessToken, refreshToken };
  }

  async saveToken(userId: IToken["user"], refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await tokenModel.create({ user: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken: string) {
    const responseTokenDB = await tokenModel.deleteOne({ refreshToken }, { new: true });

    return responseTokenDB;
  }
}

export default new TokenService();
