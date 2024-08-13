import React from "react";
import { GoogleLogin } from "react-google-login";
import axiosInstance from "..services/axiosConfig";
import { useDispatch } from "react-redux";
import { login } from "./features/auth/authSlice";

const GoogleLoginComponent = () => {
    const dispatch = useDispatch();

    const responseGoogle = async (response) => {
        try {
            const res = await axiosInstance.post("/api/auth/social/login/", {
                access_token: response.tokenId,
                code: response.code,
            });

            dispatch(
                login({
                    user: res.data.user,
                    access: res.data.access_token,
                    refresh: res.data.refresh_token,
                })
            );

            localStorage.setItem("accessToken", res.data.access_token);
            localStorage.setItem("refreshToken", res.data.refresh_token);
        } catch (error) {
            console.error("Google login error:", error);
        }
    };

    return (
        <div>
            <GoogleLogin
                clientId="<your-client-id>"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
            />
        </div>
    );
};

export default GoogleLoginComponent;
