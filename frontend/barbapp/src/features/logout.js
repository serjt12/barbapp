import axiosInstance from "../axiosConfig"; // Adjust the path as necessary

const logout = async () => {
    try {
        // Optional: Make a request to the backend to invalidate the session/token
        await axiosInstance.post("/logout/"); // Adjust the endpoint if necessary

        // Clear tokens and user data from local storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken"); // If you're using refresh tokens

        // Clear any other relevant data if needed

        // Redirect to login or home page
        window.location.href = "/login"; // Adjust the URL as needed
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

export default logout;
