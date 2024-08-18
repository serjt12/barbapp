import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOwnedShops } from "../../features/shops/shopsSlice";
import {
    selectOwnedShops,
    selectShopLoading,
    selectShopError,
} from "../../features/shops/shopsSelectors";
import { Link } from "react-router-dom";
import { getImageUrl, formatOpeningHours } from "../../services/utils";

const OwnedShopsPage = () => {
    const dispatch = useDispatch();
    const ownedShops = useSelector(selectOwnedShops);
    console.log("ownedShops: ", ownedShops);
    const isLoading = useSelector(selectShopLoading);
    const error = useSelector(selectShopError);

    useEffect(() => {
        dispatch(fetchOwnedShops());
    }, [dispatch]);

    let content;

    if (isLoading) {
        content = (
            <div className="flex justify-center items-center h-64">
                <div className="loader"></div>
            </div>
        );
    } else if (error) {
        content = <div>Error: {error.message}</div>;
    } else if (ownedShops && ownedShops.length > 0) {
        content = (
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    My Owned Shops
                </h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {ownedShops.map((shop) => (
                        <Link
                            key={shop.id}
                            to={`/shop/${shop.id}`}
                            className="group"
                        >
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src={getImageUrl(shop.image)}
                                    alt={shop.name}
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
    } else {
        content = (
            <h2 className="text-center text-xl text-gray-500">
                You don't own any shops yet!
            </h2>
        );
    }

    return <div className="bg-white container m-3 mx-auto">{content}</div>;
};

export default OwnedShopsPage;
