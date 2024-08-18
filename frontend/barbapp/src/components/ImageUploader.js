import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ImageUploader = ({ label, name, value, onChange }) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (value) {
            const url = URL.createObjectURL(value);
            setImageUrl(url);
            return () => {
                URL.revokeObjectURL(url);
            };
        } else {
            setImageUrl("");
        }
    }, [value]);

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700">
                {label}
            </label>
            <input
                type="file"
                name={name}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded"
            />
            {imageUrl && (
                <div className="mt-2">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="max-w-xs h-auto rounded"
                    />
                </div>
            )}
        </div>
    );
};

ImageUploader.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

export default ImageUploader;
