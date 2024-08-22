import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../ImageUploader";
import OpeningHoursForm from "./OpeningHoursForm";
import { updateShop, createShop } from "../../features/shops/shopsSlice";
import { useDispatch } from "react-redux";

const ShopForm = ({ shop, focusOnEdit }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        contact_info: "",
        image: null,
        opening_hours: {},
        type: "",
    });
    const nameInputRef = useRef(null);
    const openingHoursEmpty = {
        Monday: { open: "", close: "" },
        Tuesday: { open: "", close: "" },
        Wednesday: { open: "", close: "" },
        Thursday: { open: "", close: "" },
        Friday: { open: "", close: "" },
        Saturday: { open: "", close: "" },
        Sunday: { open: "", close: "" },
    };

    const [openingHours, setOpeningHours] = useState(
        shop?.opening_hours || openingHoursEmpty
    );

    useEffect(() => {
        if (shop && focusOnEdit && nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, [shop, focusOnEdit]);

    const [error, setError] = useState("");
    const [isEmpty, setIsEmpty] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (shop) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                name: shop.name,
                location: shop.location,
                contact_info: shop.contact_info,
                type: shop.type,
                image: shop.image,
            }));
        } else {
            setFormData({
                name: "",
                location: "",
                contact_info: "",
                type: "",
                image: "",
            });
        }
    }, [shop]);

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

    useEffect(() => {
        if (focusOnEdit && nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, [focusOnEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("location", formData.location);
        data.append("contact_info", formData.contact_info);
        data.append("type", formData.type);
        data.append("opening_hours", JSON.stringify(openingHours));
        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            if (shop) {
                alert(`The ${shop.name} was updated`);
                dispatch(updateShop);
            }
            const response = dispatch(createShop);
            console.info("Shop saved!", response.data);
            navigate(`/shop/${shop.id}`);
        } catch (error) {
            console.error("Save shop error:", error);
        }
    };

    const onChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4 font-semibold">
                {!shop ? "Create Shop" : `Update: ${shop?.name}`}
            </h1>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 text-sm sm:text-base"
                    >
                        Shop Name
                    </label>
                    <input
                        ref={nameInputRef}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="location"
                        className="block text-gray-700 text-sm sm:text-base"
                    >
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="contact_info"
                        className="block text-gray-700 text-sm sm:text-base"
                    >
                        Contact Info
                    </label>
                    <input
                        type="text"
                        name="contact_info"
                        value={formData.contact_info}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="type"
                        className="block text-gray-700 text-sm sm:text-base"
                    >
                        Shop Type
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
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
                {error && (
                    <div className="text-red-500 mb-4 text-sm sm:text-base">
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-700 ${
                        isEmpty ? "opacity-50" : ""
                    }`}
                    disabled={isEmpty}
                >
                    {!shop ? "Create Shop" : "Update Shop"}
                </button>
            </form>
        </div>
    );
};

export default ShopForm;
