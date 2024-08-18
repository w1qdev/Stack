import { api } from "./api/axios";
import Cookies from "cookie";

export type userPayload = {
    email: string;
    password: string;
    isSaveDeviceAuth: boolean;
};

export const UserService = {
    logIn: async (payload: userPayload) => {
        const result = await api.post("/user/login", payload);

        return result;
    },
    signUp: async (payload: userPayload) => {
        const result = await api.post("/user/signup", payload);

        return result;
    },
    saveToken: (token: string) => {
        const options = {
            path: "/",
            sameSite: true, // Защита от CSRF
            maxAge: 5 * 365 * 24 * 60 * 60, // 5 лет в секундах
        };

        document.cookie = Cookies.serialize("authToken", token, options);
    },
};
