import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosConfig";
// import { useSelector } from "react-redux";

const ShopForm = () => {
    // const user = useSelector((state) => state.auth.user);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        contact_info: "",
    });
    const [error, setError] = useState("");
    const [isEmpty, setIsEmpty] = useState(true);

    const { name, location, contact_info } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        setIsEmpty(!(name && location && contact_info));
    }, [name, location, contact_info]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (name && location && contact_info) {
            try {
                const res = await axiosInstance.post("/shops/", formData);
                console.log("Shop created:", res.data);
                console.log("Shop data saved!");
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
