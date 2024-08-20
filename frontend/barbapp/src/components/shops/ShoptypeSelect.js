import React from "react";

const ShopTypeSelect = ({ type, onChange }) => (
    <div className="mb-4">
        <label
            htmlFor="type"
            className="block text-gray-700 text-sm sm:text-base"
        >
            Shop Type
        </label>
        <select
            name="type"
            value={type}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded text-sm sm:text-base"
        >
            <option value="">Select Shop Type</option>
            <option value="independent">Independent</option>
            <option value="beauty_shop">Beauty Shop</option>
            <option value="beauty_supplier">Beauty Supplier</option>
        </select>
    </div>
);

export default ShopTypeSelect;
