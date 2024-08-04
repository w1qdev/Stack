import { prisma } from "../db/prisma.js";

export type UserCreateDto = {
    email: string;
    firstName: string;
    lastName?: string;
    hashedPassword: string;
    token?: string;
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

    public async getUserByEmail(email: string) {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
            select: {
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
}

export const userService = new UserService();
