import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShopDetails } from "../features/shops/shopsSlice";
import { useParams, Link } from "react-router-dom";
import StarRating from "../components/Star";

const ShopDetail = () => {
    const { id } = useParams(); // Get the shop ID from the URL
    const dispatch = useDispatch();

    // Selectors to get shop data, status, and error from the Redux store
    const shop = useSelector((state) => state.shop.selectedShop);
    const status = useSelector((state) => state.shop.status);
    const error = useSelector((state) => state.shop.error);

    // Fetch shop details when the component mounts or when the shop ID changes
    useEffect(() => {
        dispatch(fetchShopDetails(id));
    }, [dispatch, id]);

    // Loading state
    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loader"></div>
            </div>
        );
    }

    // Error state
    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    // Helper function to format the review date
    const formatDate = (string) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
    };

    return (
        <div className="container mx-auto p-4">
            {/* Shop Image Section */}
            <div className="h-96 w-96">
                <img
                    src={
                        shop?.images[0] || "https://via.placeholder.com/600x400"
                    }
                    alt={shop?.description}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Shop Information Section */}
            <div className="mt-4">
                <h1 className="text-3xl font-bold">
                    {shop?.title || "Shop Name"}
                </h1>
                <p className="mt-2 text-gray-700">{shop?.description}</p>
            </div>

            {/* Reviews Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold">Reviews</h2>
                <div className="mt-4">
                    {shop?.reviews?.length ? (
                        shop.reviews.map((review) => (
                            <div
                                key={crypto.randomUUID()}
                                className="border-b py-4"
                            >
                                <p className="text-gray-700">
                                    {review.comment}
                                </p>
                                <div className="flex items-center">
                                    <StarRating rating={review.rating} />
                                    <p className="ml-2 text-sm text-gray-500">
                                        - {review.reviewerName}
                                    </p>
                                    <p className="ml-2 text-sm text-gray-500">
                                        - {formatDate(review.date)}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            </div>

            {/* Booking or Products Section */}
            <div className="mt-8">
                {shop?.type === "beauty" || shop?.type === "independent" ? (
                    <div>
                        <h2 className="text-2xl font-semibold">
                            Book an Appointment
                        </h2>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                            Book Now
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-semibold">Our Products</h2>
                        <Link
                            to="/products"
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded inline-block"
                        >
                            View Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopDetail;
