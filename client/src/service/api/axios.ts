import axios from "axios";

// const accessToken = document.cookie("token");

export const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
    // headers: {
    //     Authorization: `Bearer ${accessToken}`,
    // },
});
