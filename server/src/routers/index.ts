import { Router } from "express";

import listUserController from "../controllers/ListUsersController";
import userController from "../controllers/UserController";

const router = Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.get("/activate/:activaionLink", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", listUserController.getUsers);

export default router;
