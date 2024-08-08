import { api } from "./api/axios";

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
        // create user
        const result = await api.post("/user/signup", payload);

        return result;
    },
};
