import { prisma } from "../db/prisma.js";
import { v4 as uuidv4 } from "uuid";
import { emailService } from "./email.service.js";

export type UserCreateDto = {
    email: string;
    firstName?: string;
    lastName?: string;
    hashedPassword: string;
    token?: string;
};

export type UserSelectedValues = {
    id?: boolean;
    email?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    hashedPassword?: boolean;
    token?: boolean;
};

export type UserDataToUpdate = {
    email?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    hashedPassword?: string;
    bio?: string;
    profilePicture?: string;
    linkHash?: string;
};

class UserService {
    public async getAllUsers() {
        const users = await prisma.user.findMany({
            select: {
                email: true,
                firstName: true,
                lastName: true,
            },
        });

        return users;
    }

    public async getUserByEmail(
        email: string,
        selectedValues: UserSelectedValues = {}
    ) {
        const user = await prisma.user.findFirst({
            where: { email: email },
            select: Object.keys(selectedValues).length
                ? { ...selectedValues }
                : {
                      id: true,
                      email: true,
                      firstName: true,
                      lastName: true,
                  },
        });

        return user;
    }

    public async getUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
            },
        });

        if (!user?.email) {
            return {
                message: "Пользователь не найден",
            };
        }

        return user;
    }

    public async UpdateUserDataByEmail(
        email: string,
        payload: UserDataToUpdate
    ) {
        const result = await prisma.user.update({
            where: { email: email },
            data: { ...payload },
        });

        return result;
    }

    public async addFriend(userId: string, friendId: string) {
        await prisma.$transaction([
            prisma.user.update({
                where: { id: parseInt(userId) },
                data: {
                    friends: {
                        connect: { id: parseInt(friendId) },
                    },
                },
            }),
            prisma.user.update({
                where: { id: parseInt(friendId) },
                data: {
                    friends: {
                        connect: { id: parseInt(userId) },
                    },
                },
            }),
        ]);
    }

    public async removeFriend(userId: string, friendId: string) {
        await prisma.$transaction([
            prisma.user.update({
                where: { id: parseInt(userId) },
                data: {
                    friends: {
                        disconnect: { id: parseInt(friendId) },
                    },
                },
            }),
            prisma.user.update({
                where: { id: parseInt(friendId) },
                data: {
                    friends: {
                        disconnect: { id: parseInt(userId) },
                    },
                },
            }),
        ]);
    }

    public async joinGroup(userId: string, serverId: string) {
        await prisma.group.update({
            where: { id: parseInt(serverId) },
            data: {
                members: {
                    connect: { id: parseInt(userId) },
                },
            },
        });
    }

    public async leaveGroup(userId: string, serverId: string) {
        await prisma.group.update({
            where: { id: parseInt(serverId) },
            data: {
                members: {
                    disconnect: { id: parseInt(userId) },
                },
            },
        });
    }

    public async createUser(payload: UserCreateDto) {
        await prisma.user.create({
            data: {
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName,
                hashedPassword: payload.hashedPassword,
                token: payload.token,
            },
        });
    }

    public async resetPassword(payload: { email: string }) {
        const linkHash = uuidv4();

        await this.UpdateUserDataByEmail(payload.email, { linkHash });

        await emailService.sendMessage({
            to: payload.email,
            subject: "Stack inc. Сброс пароля",
            text: `<a href='http://localhost:5000/reset-password/${linkHash}'>Сбросить пароль</a>`,
        });
    }
}

export const userService = new UserService();
