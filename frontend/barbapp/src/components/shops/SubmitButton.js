import React from "react";

const SubmitButton = ({ isEmpty }) => (
    <button
        type="submit"
        className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-700 ${
            isEmpty ? "opacity-50" : ""
        }`}
        disabled={isEmpty}
    >
        Create Shop
    </button>
);

export default SubmitButton;
