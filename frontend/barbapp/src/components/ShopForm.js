import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import ImageUploader from "./ImageUploader";

const ShopForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        contact_info: "",
        image: null,
        opening_hours: "",
        type: "", // Add type to formData
    });
    const [error, setError] = useState("");
    const [isEmpty, setIsEmpty] = useState(true);
    const navigate = useNavigate();

    const { name, location, contact_info, image, opening_hours, type } =
        formData; // Destructure type

    const onChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    useEffect(() => {
        setIsEmpty(!(name && location && contact_info && type)); // Include type in validation
    }, [name, location, contact_info, type]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (name && location && contact_info && type) {
            // Ensure type is included
            const data = new FormData();
            data.append("name", name);
            data.append("location", location);
            data.append("contact_info", contact_info);
            data.append("opening_hours", opening_hours);
            data.append("type", type); // Add type to FormData
            if (image) data.append("image", image);

            try {
                const res = await axiosInstance.post("/shops/", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("Shop created:", res.data);
                navigate("/feed");
            } catch (err) {
                console.error(err.response?.data || "An error occurred");
                setError(err.response?.data?.detail || "An error occurred");
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Create Shop</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">
                        Shop Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="contact_info"
                        className="block text-gray-700"
                    >
                        Contact Info
                    </label>
                    <input
                        type="text"
                        name="contact_info"
                        value={contact_info}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="opening_hours"
                        className="block text-gray-700"
                    >
                        Opening Hours
                    </label>
                    <input
                        type="text"
                        name="opening_hours"
                        value={opening_hours}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="block text-gray-700">
                        Shop Type
                    </label>
                    <select
                        name="type"
                        value={type}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Shop Type</option>
                        <option value="independent">Independent</option>
                        <option value="beauty_shop">Beauty Shop</option>
                        <option value="beauty_supplier">Beauty Supplier</option>
                    </select>
                </div>
                <ImageUploader
                    label="Shop Image"
                    name="image"
                    value={image}
                    onChange={onChange}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-700"
                    disabled={isEmpty}
                >
                    Create Shop
                </button>
            </form>
        </div>
    );
};

export default ShopForm;
