import axios from "axios";
import store from "../store";
import { login, logout } from "../features/auth/authSlice";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

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
    (error) => Promise.reject(error instanceof Error ? error : new Error(error))
);

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
                        "http://localhost:8000/api/token/refresh/",
                        { refresh: refreshToken }
                    );
                    const { access, refresh } = response.data;

                    store.dispatch(
                        login({
                            access,
                            refresh,
                            user: store.getState().auth.user,
                        })
                    );

                    localStorage.setItem("accessToken", access);
                    localStorage.setItem("refreshToken", refresh);

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
            switch (error.response.status) {
                case 400:
                    console.error("Bad Request: ", error.response.data);
                    break;
                case 403:
                    console.error("Forbidden: ", error.response.data);
                    break;
                case 404:
                    console.error("Not Found: ", error.response.data);
                    break;
                case 500:
                    console.error("Server Error: ", error.response.data);
                    break;
                default:
                    console.error("An error occurred: ", error.response.data);
                    break;
            }
        } else {
            console.error("Network Error: ", error.message);
        }

        return Promise.reject(
            error instanceof Error
                ? error
                : new Error(error.message || "An error occurred")
        );
    }
);

export default axiosInstance;
