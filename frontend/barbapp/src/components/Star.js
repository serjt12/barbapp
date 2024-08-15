import React from "react";

// Star component to handle filled, half, and empty states
const Star = ({ filled }) => (
    <svg
        className={`w-6 h-6 ${filled ? "text-yellow-400" : "text-gray-300"}`}
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.757 5.411a1 1 0 00.95.69h5.794c.97 0 1.371 1.24.588 1.81l-4.682 3.408a1 1 0 00-.364 1.118l1.757 5.411c.3.921-.755 1.688-1.539 1.118l-4.682-3.408a1 1 0 00-1.176 0l-4.682 3.408c-.784.57-1.838-.197-1.539-1.118l1.757-5.411a1 1 0 00-.364-1.118L2.66 10.838c-.783-.57-.382-1.81.588-1.81h5.794a1 1 0 00.95-.69l1.757-5.411z"
        />
    </svg>
);

const StarRating = ({ rating, maxStars = 5 }) => {
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
        stars.push(<Star key={i} filled={i <= rating} />);
    }

    return <div className="flex">{stars}</div>;
};

export default StarRating;
