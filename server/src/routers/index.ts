import { Router } from "express";
import { body } from "express-validator";

import listUserController from "../controllers/ListUsersController";
import userController from "../controllers/UserController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/registration", body("email").isEmail(), body("password").isLength({ min: 3, max: 13 }), userController.registration);
router.post("/login", body("email").isEmail(), body("password").isLength({ min: 3, max: 13 }), userController.login);
router.post("/logout", userController.logout);

router.get("/activate/:activaionLink", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, listUserController.getUsers);

export default router;
