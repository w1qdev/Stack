import express from "express";
import { userController } from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/token.middleware.js";

export const userRouter = express.Router();

userRouter.post("/login", userController.loginUser);
userRouter.post("/signup", userController.createUser);

userRouter.use("/join-group", authenticateToken);
userRouter.post("/join-group", userController.joinGroup);

userRouter.use("/leave-group", authenticateToken);
userRouter.post("/leave-group", userController.leaveGroup);

userRouter.use("/add-friend", authenticateToken);
userRouter.post("/add-friend", userController.addFriend);

userRouter.use("/remove-friend", authenticateToken);
userRouter.post("/remove-friend", userController.removeFriend);

userRouter.use("/all", authenticateToken);
userRouter.get("/all", userController.getUsers);

// userRouter.use("/:id", authenticateToken);
// userRouter.get("/:id", userController.getUser);

userRouter.patch("/reset-password", userController.resetPassword);
userRouter.post("/reset-password", userController.checkHashAndResetPassword);
