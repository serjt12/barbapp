import axios from "axios";

const BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                const response = await axios.post(
                    `${BASE_URL}/token/refresh/`,
                    {
                        refresh: refreshToken,
                    }
                );

                const { access: newAccessToken, refresh: newRefreshToken } =
                    response.data;

                localStorage.setItem("accessToken", newAccessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${newAccessToken}`;
                originalRequest.headers[
                    "Authorization"
                ] = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                // Redirect to login or handle authentication failure
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
