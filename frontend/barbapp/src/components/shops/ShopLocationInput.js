import React from "react";

const ShopLocationInput = ({ location, onChange }) => (
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
            value={location}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
        />
    </div>
);

export default ShopLocationInput;
