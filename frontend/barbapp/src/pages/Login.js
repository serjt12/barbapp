import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { login as loginThunk, loginGoogle } from "../features/auth/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isEmpty, setIsEmpty] = useState(true);
    const dispatch = useDispatch();

    const { username, password } = formData;

    useEffect(() => {
        setIsEmpty(!(username && password));
    }, [username, password]);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (username && password) {
            try {
                // Dispatch login thunk
                const resultAction = await dispatch(
                    loginThunk({ username, password })
                );

                if (loginThunk.fulfilled.match(resultAction)) {
                    const { user } = resultAction.payload;
                    if (user) {
                        navigate("/");
                    }
                    setError("An unexpected error occurred");
                } else {
                    throw new Error(
                        resultAction.payload.error || "Login failed"
                    );
                }
            } catch (err) {
                console.error(err.message || "An unexpected error occurred");
                setError(err.message || "An unexpected error occurred");
            }
        }
    };

    const responseGoogle = async (response) => {
        const accessToken = response.credential;

        const res = await dispatch(loginGoogle(accessToken));

        if (res.payload?.user) {
            navigate("/");
        }

        setError(
            error.response?.data?.detail || "Google authentication failed"
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Login</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <Link to="/forgot-password" className="text-blue-500">
                        Forgot password?
                    </Link>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-700"
                    disabled={isEmpty}
                >
                    Login
                </button>
            </form>
            <div className="mt-4">
                <GoogleLogin
                    onSuccess={responseGoogle}
                    onError={responseGoogle}
                    className="w-full flex justify-center"
                />
            </div>
        </div>
    );
};

export default Login;
