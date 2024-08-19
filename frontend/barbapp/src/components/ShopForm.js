import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import ImageUploader from "./ImageUploader";
import OpeningHoursForm from "./shops/OpeningHoursForm";

const ShopForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        contact_info: "",
        image: null,
        opening_hours: {},
        type: "",
    });

    const [openingHours, setOpeningHours] = useState({
        Monday: { open: "", close: "" },
        Tuesday: { open: "", close: "" },
        Wednesday: { open: "", close: "" },
        Thursday: { open: "", close: "" },
        Friday: { open: "", close: "" },
        Saturday: { open: "", close: "" },
        Sunday: { open: "", close: "" },
    });

    const [error, setError] = useState("");
    const [isEmpty, setIsEmpty] = useState(true);
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    // Check if all required fields are filled out
    useEffect(() => {
        const checkIsEmpty = () => {
            const { name, location, contact_info, type } = formData;
            if (name && location && contact_info && type) {
                setIsEmpty(false);
            } else {
                setIsEmpty(true);
            }
        };
        checkIsEmpty();
    }, [formData]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isEmpty) {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("location", formData.location);
            data.append("contact_info", formData.contact_info);
            data.append("opening_hours", JSON.stringify(openingHours));
            data.append("type", formData.type);
            if (formData.image) data.append("image", formData.image);

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
                        value={formData.name}
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
                        value={formData.location}
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
                        value={formData.contact_info}
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
                        value={formData.type}
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
                    value={formData.image}
                    onChange={onChange}
                />
                <OpeningHoursForm
                    openingHours={openingHours}
                    setOpeningHours={setOpeningHours}
                />
                {error && <div className="text-red-500 mb-4">{error}</div>}
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
