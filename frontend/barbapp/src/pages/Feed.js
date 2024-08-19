import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShops } from "../features/shops/shopsSlice";
import { Link } from "react-router-dom";
import { getImageUrl, formatOpeningHours } from "../services/utils";

const Feed = () => {
    const dispatch = useDispatch();
    const shops = useSelector((state) => state.shop?.shops);
    const status = useSelector((state) => state.shop?.status);
    const error = useSelector((state) => state.shop?.error);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchShops()); // Dispatch the thunk action
        }
    }, [status, dispatch]);

    let content;

    if (status === "loading") {
        content = (
            <div className="flex justify-center items-center h-64">
                <div className="loader"></div>
            </div>
        );
    } else if (status === "failed") {
        content = <div>Error: {error}</div>;
    } else {
        content = (
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Services</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {shops?.map((shop) => (
                        <Link
                            key={shop.id}
                            to={`/shop/${shop.id}`}
                            className="group"
                        >
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src={getImageUrl(shop.image)}
                                    alt={shop.contact_info}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">
                                {shop.name}
                            </h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {formatOpeningHours(shop.opening_hours)}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    return <div className="bg-white container m-3 mx-auto">{content}</div>;
};

export default Feed;
