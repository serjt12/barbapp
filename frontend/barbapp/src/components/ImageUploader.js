import React from "react";
import { getImageUrl } from "../services/utils";

const ImageUploader = ({ label, name, value, onChange }) => {
    const isFileObject =
        typeof value === "object" && value !== null && value.name;

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm sm:text-base">
                {label}
            </label>
            {isFileObject ? (
                <img
                    src={URL.createObjectURL(value)}
                    alt="Preview"
                    className="mb-2 w-full max-w-xs"
                />
            ) : (
                value && (
                    <img
                        src={getImageUrl(value)}
                        alt="Preview"
                        className="mb-2 w-full max-w-xs"
                    />
                )
            )}
            <input
                type="file"
                name={name}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
            />
        </div>
    );
};

export default ImageUploader;
