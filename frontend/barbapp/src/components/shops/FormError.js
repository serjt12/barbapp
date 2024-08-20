import React from "react";

const FormError = ({ error }) =>
    error ? (
        <div className="text-red-500 mb-4 text-sm sm:text-base">{error}</div>
    ) : null;

export default FormError;
