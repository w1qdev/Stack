import { Request, Response } from "express";
import { passwordService } from "../services/passwordHasher.service.js";
import { tokenService } from "../services/token.service.js";
import { userService } from "../services/user.service.js";

export type userLoginDto = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

export const userController = {
    loginUser: async (req: Request, res: Response) => {
        const userData = req.body;

        const existsUser = await userService.getUserByEmail(userData.email, {
            email: true,
            firstName: true,
            lastName: true,
            hashedPassword: true,
        });

        if (!existsUser?.email) {
            return res.send({
                message: "что-то пошло не так, попробуйте позже",
            });
        }

        const isPasswordMatch = await passwordService.comparePasswords(
            userData?.password,
            existsUser.hashedPassword
        );

        if (!isPasswordMatch) {
            return res.send({
                message: "что-то пошло не так, попробуйте позже",
            });
        }

        const newToken = tokenService.generateTokens(
            userData.email
        ).accessToken;

        await userService.UpdateUserDataByEmail(userData.email, {
            token: newToken,
        });

        res.cookie("token", newToken, {
            httpOnly: true,
            path: "/api",
        });

        return res.send({
            message: "Успешный вход в аккаунт",
            userData: {
                email: existsUser.email,
                token: newToken,
            },
        });
    },

    createUser: async (req: Request, res: Response) => {
        const userData: userLoginDto = req.body;

        const existsUser = await userService.getUserByEmail(userData.email);

        if (existsUser) {
            return res.send({ message: "Данный пользователь уже существует" });
        }

        const hashedPassword = await passwordService.generateHashedPassword(
            userData.password
        );

        const tokens = tokenService.generateTokens({
            email: userData!.email,
        });

        const userPayload = {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            hashedPassword: hashedPassword,
            token: tokens.accessToken,
        };

        await userService.createUser(userPayload);

        return res.send({
            message: "Новый пользователь успешно создан!",
            userData: {
                email: userData.email,
                accessToken: tokens.accessToken,
            },
        });
    },

    getUsers: async (req: Request, res: Response) => {
        const users = await userService.getAllUsers();

        res.send([...users]);
    },

    getUser: async (req: Request, res: Response) => {
        const userId = req.params?.id;

        const result = await userService.getUserById(userId);

        return res.send({
            ...result,
        });
    },

    joinGroup: async (req: Request, res: Response) => {},

    leaveGroup: async (req: Request, res: Response) => {},

    addFriend: async (req: Request, res: Response) => {
        const payload = req.body;

        await userService.addFriend(payload.userId, payload.friendId);

        return res.send({
            message: "Вы успешно добавили в друзья нового друга",
        });
    },

    removeFriend: async (req: Request, res: Response) => {
        const payload = req.body;

        await userService.removeFriend(payload.userId, payload.friendId);

        return res.send({
            message: "Успешное удаление из друзей",
        });
    },
};
