import { Response, Request, NextFunction } from "express";
import { tokenService } from "../services/token.service.js";

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const headersData = req.headers["authorization"];
        const token = headersData && headersData.split(" ")[1];

        if (!token) {
            return res
                .send({
                    message: "Токен не предоставлен",
                })
                .status(401);
        }

        const isTokenExpired = tokenService.verifyToken(token);

        if (!isTokenExpired) {
            return res
                .send({
                    message: "Время действия токена закончилось",
                })
                .status(401);
        }

        next();
    } catch (err) {
        return res.status(500).send({
            message: "Ошибка проверки токена",
        });
    }
}
