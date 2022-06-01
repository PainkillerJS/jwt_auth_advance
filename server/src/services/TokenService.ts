import jwt from "jsonwebtoken";

import tokenModel from "../models/token-model";

import type { IToken } from "../models/token-model";
import type { IUser } from "../models/user-model";

type payloadData = Pick<IUser, "_id" | "email" | "isActivated">;

class TokenService {
  generateTokens(payload: payloadData) {
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

  validateAccessToken(token: string): payloadData | null {
    try {
      const userData = jwt.verify(token, process.env.SECRET_ACCESS) as payloadData;

      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string): payloadData | null {
    try {
      const userData = jwt.verify(token, process.env.SECRET_REFRESH) as payloadData;

      return userData;
    } catch (e) {
      return null;
    }
  }

  async removeToken(refreshToken: string) {
    const responseTokenDB = await tokenModel.deleteOne({ refreshToken });

    return !!responseTokenDB.deletedCount;
  }

  async findToken(refreshToken: string) {
    const token = await tokenModel.findOne({ refreshToken });

    return token;
  }
}

export default new TokenService();
