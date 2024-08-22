import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import logo from "../assets/logo512.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await dispatch(logout());
            if (res.payload.msg) navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between relative">
                <div className="flex items-center">
                    <a href="/" className="rounded-md px-3">
                        <img className="h-8 w-auto" src={logo} alt="Barbapp" />
                    </a>
                    <div className="ml-4 flex max-sm:hidden items-center">
                        {isLoggedIn && (
                            <div className="flex space-x-4">
                                <a
                                    href="/profile"
                                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                    aria-current="page"
                                >
                                    Profile
                                </a>
                                <a
                                    href="/feed"
                                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                    aria-current="page"
                                >
                                    Feed
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                <div className="sm:invisible flex items-center z-50">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                <div className="flex max-sm:hidden items-center text-white">
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
            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transition-transform transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                } sm:hidden flex items-center justify-center`}
            >
                <div className="flex flex-col items-center">
                    {isLoggedIn && (
                        <>
                            <Link
                                to="/profile"
                                className="text-white text-lg py-2"
                                onClick={closeMenu}
                            >
                                Profile
                            </Link>
                            <Link
                                to="/feed"
                                className="text-white text-lg py-2"
                                onClick={closeMenu}
                            >
                                Feed
                            </Link>
                        </>
                    )}
                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                className="text-white text-lg py-2"
                                onClick={closeMenu}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-white text-lg py-2"
                                onClick={closeMenu}
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                handleLogout();
                                closeMenu();
                            }}
                            className="text-white text-lg py-2"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
