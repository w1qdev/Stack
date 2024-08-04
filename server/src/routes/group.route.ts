import express from "express";
import { authenticateToken } from "../middlewares/token.middleware.js";
import { groupController } from "../controllers/group.controller.js";

export const groupRouter = express.Router();

groupRouter.use("/create-group", authenticateToken);
groupRouter.post("/create-group", groupController.createGroup);

groupRouter.use("/delete-group", authenticateToken);
groupRouter.delete("/delete-group", groupController.deleteGroup);
