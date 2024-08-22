import axios from "axios";

// Define the base URL from an environment variable
const BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor to add Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        // Assuming you have a function to get the access token
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(new Error(error))
);

// Response Interceptor to handle errors and refresh tokens
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401) {
            // Handle token refresh here
            try {
                // Call your refresh token logic
                const response = await axios.post("/token/refresh", {
                    refresh: localStorage.getItem("refreshToken"),
                });
                const newAccessToken = response.data.access;
                localStorage.setItem("accessToken", newAccessToken);
                originalRequest.headers[
                    "Authorization"
                ] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(new Error(error));
    }
);

export default axiosInstance;
