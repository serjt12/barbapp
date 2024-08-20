import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShopDetails } from "../features/shops/shopsSlice";
import { useParams } from "react-router-dom";
import ShopImage from "../components/shops/ShopImage";
import ShopInfo from "../components/shops/ShopInfo";
import Reviews from "../components/shops/ShopReview";
import BookingOrProducts from "../components/shops/ShopActions";

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

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loader"></div>
            </div>
        );
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-1 md:col-span-2">
                <ShopImage src={shop?.image} alt={shop?.description} />
            </div>
            <div className="col-span-1 md:col-span-2">
                <ShopInfo title={shop?.name} description={shop?.contact_info} />
            </div>
            <div className="col-span-1 md:col-span-2">
                <Reviews reviews={shop?.reviews} />
            </div>
            <div className="col-span-1 md:col-span-2">
                <BookingOrProducts
                    shopType={shop?.type}
                    shopImages={shop?.images}
                    shopId={shop?.id}
                />
            </div>
        </div>
    );
};

export default ShopDetail;
