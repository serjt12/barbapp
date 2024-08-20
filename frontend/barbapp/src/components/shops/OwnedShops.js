import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOwnedShops } from "../../features/shops/shopsSlice";
import {
    selectOwnedShops,
    selectShopLoading,
    selectShopError,
} from "../../features/shops/shopsSelectors";
import ShopsList from "./ShopsList";

const OwnedShopsPage = () => {
    const dispatch = useDispatch();
    const ownedShops = useSelector(selectOwnedShops);
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
                <ShopsList shops={ownedShops} />;
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
