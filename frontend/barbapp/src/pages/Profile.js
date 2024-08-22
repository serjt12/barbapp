import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosConfig";
import { FaEdit, FaCheck, FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import ShopForm from "../components/shops/ShopForm";
import ImageUploader from "../components/ImageUploader";
import PropTypes from "prop-types";
import { getImageUrl } from "../services/utils";
import ShopsList from "../components/shops/ShopsList";
import { fetchOwnedShops } from "../features/shops/shopsSlice";
import { selectOwnedShops } from "../features/shops/shopsSelectors";

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
    const [selectedShop, setSelectedShop] = useState(null);
    const [showOwnedShopsList, setShowOwnedShopsList] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOwnedShops());
    }, [dispatch]);
    const shops = useSelector(selectOwnedShops);

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/logout/");
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("first_name", formData.first_name);
        data.append("last_name", formData.last_name);
        data.append("email", formData.email);
        if (formData.profile_picture) {
            data.append("profile_picture", formData.profile_picture);
        }

        setErrors({});
        try {
            const response = await axiosInstance.put("/update_profile/", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch(updateUser(response.data.user));
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
        setSelectedShop(null); // Reset selected shop when toggling the form
    };

    const handleSelectEditShop = (shop) => {
        setSelectedShop(shop);
        setShowShopForm(true);
    };

    const handleToggleShopsList = () => {
        setShowOwnedShopsList(!showOwnedShopsList);
    };

    return (
        <div className="container mx-auto my-4 p-4 bg-white shadow rounded">
            <h1 className="text-2xl font-semibold mb-4">Profile</h1>
            {user ? (
                <div>
                    <div className="mb-4 flex justify-center">
                        {isEditing.profile_picture ? (
                            <ImageUploader
                                label="Profile Picture"
                                name="profile_picture"
                                value={formData.profile_picture}
                                onChange={handleChange}
                            />
                        ) : (
                            <>
                                <img
                                    src={getImageUrl(formData.profile_picture)}
                                    alt={user.username}
                                    className="rounded-full w-32 h-32"
                                />
                                <FaEdit
                                    className="ml-2 cursor-pointer"
                                    onClick={() =>
                                        handleEdit("profile_picture")
                                    }
                                />
                            </>
                        )}
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
                            <li>
                                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                    Shops Owned{" "}
                                    <AddIcons
                                        onClick={handleToggleShopsList}
                                        showConditional={showOwnedShopsList}
                                    />
                                </span>
                            </li>
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
                        {errors.profile_picture && (
                            <p className="text-red-500">
                                {errors.profile_picture}
                            </p>
                        )}
                        {showButtons && (
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="submit"
                                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    <FaCheck className="mr-1" /> Save
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={handleCancel}
                                >
                                    <FaTimes className="mr-1" /> Cancel
                                </button>
                            </div>
                        )}
                    </form>
                    {showShopForm && (
                        <ShopForm focusOnEdit={true} shop={selectedShop} />
                    )}
                    {showOwnedShopsList ? (
                        shops.length > 0 ? (
                            <ShopsList
                                shops={shops}
                                onEditShop={handleSelectEditShop}
                            />
                        ) : (
                            <p>No shops owned.</p>
                        )
                    ) : null}
                    <div className="mt-6">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
