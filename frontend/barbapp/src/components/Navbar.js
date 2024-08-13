import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import axiosInstance from "../services/axiosConfig";
import logo from "../assets/logo512.png";

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/logout/");
            dispatch(logout());
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <a
                                href="/"
                                className="rounded-md px-3"
                                aria-current="page"
                            >
                                <img
                                    className="h-8 w-auto"
                                    src={logo}
                                    alt="Barbapp"
                                />
                            </a>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            {isLoggedIn && (
                                <div className="flex space-x-4">
                                    <a
                                        href="/profile"
                                        className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                        aria-current="page"
                                    >
                                        Profile
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-white">
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className="mr-4">
                                    Login
                                </Link>
                                <Link to="/register">Register</Link>
                            </>
                        ) : (
                            <button onClick={handleLogout} className="mr-4">
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
