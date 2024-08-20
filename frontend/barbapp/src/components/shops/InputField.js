import React from "react";

const InputField = ({
    label,
    name,
    value,
    onChange,
    type = "text", // Default to text input
    options = [], // Used for select input
    placeholder = "",
    className = "",
    ...props
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="block text-gray-700 text-sm sm:text-base"
            >
                {label}
            </label>
            {type === "select" ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full p-2 border border-gray-300 rounded text-sm sm:text-base ${className}`}
                    {...props}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full p-2 border border-gray-300 rounded text-sm sm:text-base ${className}`}
                    placeholder={placeholder}
                    {...props}
                />
            )}
        </div>
    );
};

export default InputField;
