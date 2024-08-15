import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosConfig";
import { FaEdit, FaCheck, FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import ShopForm from "../components/ShopForm";
import PropTypes from "prop-types";

const AddIcons = ({ onClick, showConditional }) =>
    showConditional ? (
        <FaMinus className="ml-2 cursor-pointer" onClick={onClick} />
    ) : (
        <FaPlus className="ml-2 cursor-pointer" onClick={onClick} />
    );

AddIcons.propTypes = {
    onClick: PropTypes.func.isRequired,
    showConditional: PropTypes.bool.isRequired,
};

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    const [isEditing, setIsEditing] = useState({
        first_name: false,
        last_name: false,
        email: false,
        profile_picture: false,
    });
    const [formData, setFormData] = useState({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        profile_picture: user?.profile_picture || "",
    });
    const [errors, setErrors] = useState({});
    const [showButtons, setShowButtons] = useState(false);
    const [showShopForm, setShowShopForm] = useState(false);
    const [showShopsList, setShowShopsList] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/logout/");
            dispatch(logout());
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const response = await axiosInstance.put(
                "/update_profile/",
                formData
            );
            console.log("Profile updated:", response.data);
            dispatch(updateUser(formData));
            setShowButtons(false);
            setIsEditing({
                first_name: false,
                last_name: false,
                email: false,
                profile_picture: false,
            });
        } catch (error) {
            if (error.response?.data) {
                setErrors(error.response.data);
            } else {
                console.error("Update error:", error);
            }
        }
    };

    const handleEdit = (field) => {
        setIsEditing((prevState) => {
            const updatedState = {
                ...prevState,
                [field]: !prevState[field],
            };
            setShowButtons(Object.values(updatedState).some((value) => value));
            return updatedState;
        });
    };

    const handleCancel = () => {
        setIsEditing({
            first_name: false,
            last_name: false,
            email: false,
            profile_picture: false,
        });
        setFormData({
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            email: user?.email || "",
            profile_picture: user?.profile_picture || "",
        });
        setShowButtons(false);
    };

    const handleToggleShopForm = () => {
        setShowShopForm(!showShopForm);
    };

    const handleToggleShopsList = () => {
        setShowShopsList(!showShopsList);
    };

    return (
        <div className="container mx-auto my-4 p-4 bg-white shadow rounded">
            <h1 className="text-2xl font-semibold mb-4">Profile</h1>
            {user ? (
                <div>
                    <div className="mb-4 flex justify-center">
                        <img
                            src={user.profile_picture}
                            alt={user.username}
                            className="rounded-full w-32 h-32"
                        />
                    </div>
                    <div className="mb-4 flex justify-end">
                        <ul className=" flex space-x-4">
                            <li>
                                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                    Add Shop{" "}
                                    <AddIcons
                                        onClick={handleToggleShopForm}
                                        showConditional={showShopForm}
                                    />
                                </span>
                            </li>
                            {
                                <li>
                                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                        Shops Owned{" "}
                                        <AddIcons
                                            onClick={handleToggleShopsList}
                                            showConditional={showShopsList}
                                        />
                                    </span>
                                </li>
                            }
                        </ul>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 flex items-center">
                            <label
                                htmlFor="first_name"
                                className="block text-gray-700 w-1/4"
                            >
                                First Name
                            </label>
                            {isEditing.first_name ? (
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                            ) : (
                                <span className="mt-1 p-2  w-full">
                                    {formData.first_name}
                                </span>
                            )}
                            <FaEdit
                                className="ml-2 cursor-pointer"
                                onClick={() => handleEdit("first_name")}
                            />
                        </div>
                        {errors.first_name && (
                            <p className="text-red-500">{errors.first_name}</p>
                        )}
                        <div className="mb-4 flex items-center">
                            <label
                                htmlFor="last_name"
                                className="block text-gray-700 w-1/4"
                            >
                                Last Name
                            </label>
                            {isEditing.last_name ? (
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                            ) : (
                                <span className="mt-1 p-2 w-full">
                                    {formData.last_name}
                                </span>
                            )}
                            <FaEdit
                                className="ml-2 cursor-pointer"
                                onClick={() => handleEdit("last_name")}
                            />
                        </div>
                        {errors.last_name && (
                            <p className="text-red-500">{errors.last_name}</p>
                        )}
                        <div className="mb-4 flex items-center">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 w-1/4"
                            >
                                Email
                            </label>{" "}
                            <span className="mt-1 p-2 w-full">
                                {formData.email}
                            </span>
                        </div>
                        {errors.email && (
                            <p className="text-red-500">{errors.email}</p>
                        )}
                        <div className="mb-4 flex items-center">
                            <label
                                htmlFor="profile_picture"
                                className="block text-gray-700 w-1/4"
                            >
                                Profile Picture URL
                            </label>
                            {isEditing.profile_picture ? (
                                <input
                                    type="text"
                                    name="profile_picture"
                                    value={formData.profile_picture}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                            ) : (
                                <span className="mt-1 p-2 w-full">
                                    {formData.profile_picture}
                                </span>
                            )}
                            <FaEdit
                                className="ml-2 cursor-pointer"
                                onClick={() => handleEdit("profile_picture")}
                            />
                        </div>
                        {errors.profile_picture && (
                            <p className="text-red-500">
                                {errors.profile_picture}
                            </p>
                        )}
                    </form>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Logout
                    </button>
                    {showButtons && (
                        <div className=" py-2 flex flex-row space-x-2 wide">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 rounded flex items-center :ho"
                            >
                                <FaCheck className="mr-2" /> Check
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                            >
                                <FaTimes className="mr-2" /> Cancel
                            </button>
                        </div>
                    )}
                    {showShopForm && (
                        <div className="container mx-auto my-4 p-4 bg-white shadow rounded">
                            <ShopForm />
                        </div>
                    )}
                    {showShopsList && (
                        <div className="container mx-auto my-4 p-4 bg-white shadow rounded">
                            List of Shops
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-gray-600">Loading...</p>
            )}
        </div>
    );
};

export default Profile;
