import { prisma } from "../db/prisma.js";

export type GroupPayloadType = {
    name: string;
    description: string;
    ownerId: string;
};

class GroupsService {
    public async createGroup(payload: GroupPayloadType) {
        await prisma.group.create({
            data: {
                name: payload.name,
                description: payload.description,
                owner: { connect: { id: parseInt(payload.ownerId) } },
            },
        });
    }

    public async deleteGroup(userId: string, serverId: string) {
        const server = await prisma.group.findUnique({
            where: { id: parseInt(serverId) },
            include: { owner: true }, // Включить владельца в запрос
        });

        if (!server) {
            throw new Error("Server not found");
        }

        if (server.ownerId !== parseInt(userId)) {
            throw new Error("You are not authorized to delete this server");
        }

        await prisma.group.delete({
            where: { id: parseInt(serverId) },
        });
    }

    public async getAllGroups() {
        const groups = await prisma.group.findMany();

        return groups;
    }
}

export const groupsService = new GroupsService();
