import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import ApiError from "../exceptions/apiError";
import userModel from "../models/user-model";
import { UserRegistrationError, UserAuthError } from "../constants/UserError";
import tokenService from "./TokenService";

class UserService {
  async registration(email: string, password: string) {
    if (await userModel.findOne({ email })) {
      throw ApiError.BadRequest(UserRegistrationError.USER_FOUND_ERROR);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activateLink = uuid();
    const userData = { email, password: hashPassword, activateLink };

    const user = await userModel.create(userData);
    const tokens = await tokenService.generateToken({ email, isActivated: user.isActivated, _id: user._id });

    await tokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userData
    };
  }

  async login(email: string, password: string) {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest(UserAuthError.USER_NO_REG_ERROR);
    }

    const isCheckPassword = await bcrypt.compare(password, user.password);

    if (!isCheckPassword) {
      throw ApiError.BadRequest(UserAuthError.USER_WRONG_PASSWORD_ERROR);
    }

    const tokens = await tokenService.generateToken({ email, isActivated: user.isActivated, _id: user._id });
    const userData = { email, password };

    await tokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userData
    };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async activate(activateLink: string) {
    const user = await userModel.findOne({ activateLink });

    if (!user) {
      throw ApiError.BadRequest(UserRegistrationError.USER_FOUND_ERROR);
    }

    user.isActivated = true;

    await user.save();
  }
}

export default new UserService();
