import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export type VerifyTokenType = boolean | { tokenData: string };

export type TokensType = {
    refreshToken: string;
    accessToken: string;
};

export type generateTokensPayload = {
    id: number;
    email: string;
};

class TokenService {
    private jwtSecretPhrase = config.jwtSecretPhrase;

    public generateTokens(payload: generateTokensPayload): TokensType {
        const refreshToken = jwt.sign({ ...payload }, this.jwtSecretPhrase, {
            expiresIn: "180d",
        });
        const accessToken = jwt.sign({ ...payload }, this.jwtSecretPhrase, {
            expiresIn: "30d",
        });

        return { refreshToken, accessToken };
    }

    public verifyToken(token: string) {
        try {
            if (token === null) {
                return false;
            }

            return jwt.verify(token, this.jwtSecretPhrase);
        } catch (JsonWebTokenError) {
            return false;
        }
    }

    public decodeToken(token: string) {
        try {
            if (token === null) {
                return false;
            }

            return jwt.decode(token);
        } catch (err) {
            console.log(err);
        }
    }
}

export const tokenService = new TokenService();
