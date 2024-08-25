import { Request, Response } from "express";
import { passwordService } from "../services/passwordHasher.service.js";
import { tokenService } from "../services/token.service.js";
import { userService } from "../services/user.service.js";
import { validator } from "../services/validator.service.js";

export type userLoginDto = {
    email: string;
    // firstName: string;
    // lastName: string;
    password: string;
};

export const userController = {
    loginUser: async (req: Request, res: Response) => {
        try {
            const userData = req.body;

            const existsUser = await userService.getUserByEmail(
                userData.email,
                {
                    email: true,
                    firstName: true,
                    lastName: true,
                    hashedPassword: true,
                }
            );

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
                expires: new Date(new Date().getTime() + 5 * 1000),
            });

            return res.send({
                message: "Успешный вход в аккаунт",
                userData: {
                    email: existsUser.email,
                },
            });
        } catch (e) {
            console.error(e);
        }
    },

    createUser: async (req: Request, res: Response) => {
        const userData: userLoginDto = req.body;

        const emailValidation = validator.validateEmail(userData.email);
        const passwordValidation = validator.validatePassword(
            userData.password
        );

        if (!emailValidation || !passwordValidation) {
            return res.send({
                message: "Введены не правильнные email или пароль",
            });
        }

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
            hashedPassword: hashedPassword,
            token: tokens.accessToken,
        };

        await userService.createUser(userPayload);

        const date = new Date();
        date.setFullYear(date.getFullYear() + 5);

        res.cookie("token", tokens.accessToken, {
            httpOnly: true,
            path: "/api",
            expires: date,
        });

        return res.send({
            message: "Новый пользователь успешно создан!",
            userData: {
                email: userData.email,
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

    resetPassword: async (req: Request, res: Response) => {
        const payload = req.body;

        await userService.resetPassword({
            email: payload.email,
        });

        return res.send({
            message: "Смена пароля процесс: 1 из 2",
        });
    },

    checkHashAndResetPassword: async (req: Request, res: Response) => {
        const payload = req.body;

        const hashedPassword = await passwordService.generateHashedPassword(
            payload.password
        );

        await userService.UpdateUserDataByEmail(payload.email, {
            hashedPassword,
            linkHash: "",
        });

        return res.send({
            message: "Ваш пароль успешно сменен",
        });
    },
};
