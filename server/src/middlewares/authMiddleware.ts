import type { Request, Response, NextFunction } from "express";

import ApiError from "../exceptions/apiError";
import TokenService from "../services/TokenService";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization?.split(" ")[1];

    if (!authHeader) {
      return next(ApiError.UnAuthError());
    }

    const userData = TokenService.validateAccessToken(authHeader);

    if (!userData) {
      return next(ApiError.UnAuthError());
    }

    //@ts-expect-error
    req.user = userData;

    next();
  } catch (e) {
    return next(ApiError.UnAuthError());
  }
};

export default authMiddleware;
