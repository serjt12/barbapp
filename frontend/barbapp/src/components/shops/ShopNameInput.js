import React from "react";

const ShopNameInput = ({ name, onChange }) => (
    <div className="mb-4">
        <label
            htmlFor="name"
            className="block text-gray-700 text-sm sm:text-base"
        >
            Shop Name
        </label>
        <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
        />
    </div>
);

export default ShopNameInput;
