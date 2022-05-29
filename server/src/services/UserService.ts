import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import userModel from "../models/user-model";
import { UserRegistrationError } from "../constants/UserError";
import mailService from "./MailService";
import tokenService from "./TokenService";

class UserService {
  async registration(email: string, password: string) {
    if (await userModel.findOne({ email })) {
      throw new Error(UserRegistrationError.USER_FOUND_ERROR);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activateLink = uuid();
    const userData = { email, password: hashPassword, activateLink };

    const user = await userModel.create(userData);
    const tokens = await tokenService.generateToken({ email, isActivated: user.isActivated, _id: user._id });

    await mailService.sendActivationEmail(email, activateLink);
    await tokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userData
    };
  }
}

export default new UserService();
