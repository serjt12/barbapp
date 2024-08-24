// authService.js
import axiosInstance from "./axiosConfig";

// Define your functions to get and refresh access tokens
export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};

export const refreshAccessToken = async () => {
    // Refresh token logic here
    const response = await axiosInstance.post("/auth/refresh", {
        refresh: localStorage.getItem("refreshToken"),
    });
    return response.data.access;
};
