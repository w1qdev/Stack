import { Request, Response } from "express";
import { groupsService, GroupPayloadType } from "../services/groups.service.js";

export const groupController = {
    createGroup: async (req: Request, res: Response) => {
        const groupPayload: GroupPayloadType = req.body;

        await groupsService.createGroup(groupPayload);

        return res.send({
            message: "Ваша группа успешно создана",
        });
    },

    deleteGroup: async (req: Request, res: Response) => {
        const groupPayload = req.body;

        await groupsService.deleteGroup(
            groupPayload.userId,
            groupPayload.serverId
        );
    },
};
