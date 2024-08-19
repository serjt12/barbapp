import axios from "axios";
import store from "../store";
import { login, logout } from "../features/auth/authSlice";

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
        const state = store.getState();
        const accessToken =
            state.auth.accessToken || localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor to handle errors and refresh tokens
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 errors and refresh tokens
        if (error.response && error.response.status === 401) {
            const refreshToken =
                store.getState().auth.refreshToken ||
                localStorage.getItem("refreshToken");

            if (refreshToken) {
                try {
                    const response = await axios.post(
                        `${BASE_URL}/token/refresh/`,
                        { refresh: refreshToken }
                    );
                    const { access, refresh } = response.data;

                    // Update the store and localStorage with the new tokens
                    store.dispatch(
                        login({
                            access,
                            refresh,
                            user: store.getState().auth.user,
                        })
                    );
                    localStorage.setItem("accessToken", access);
                    localStorage.setItem("refreshToken", refresh);

                    // Update the Authorization header with the new access token
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${access}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    store.dispatch(logout());
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    return Promise.reject(
                        new Error(
                            refreshError.message || "Token refresh failed"
                        )
                    );
                }
            } else {
                store.dispatch(logout());
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            }
        }

        // Handle other HTTP status codes
        if (error.response) {
            const status = error.response.status;
            const errorData = error.response.data;

            switch (status) {
                case 400:
                    console.error("Bad Request: ", errorData);
                    break;
                case 403:
                    console.error("Forbidden: ", errorData);
                    break;
                case 404:
                    console.error("Not Found: ", errorData);
                    break;
                case 500:
                    console.error("Server Error: ", errorData);
                    break;
                default:
                    console.error("An error occurred: ", errorData);
                    break;
            }
        } else {
            console.error("Network Error: ", error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
