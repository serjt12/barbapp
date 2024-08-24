import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShopDetails } from "../features/shops/shopsSlice";
import { useParams } from "react-router-dom";
import ShopImage from "../components/shops/ShopImage";
import ShopInfo from "../components/shops/ShopInfo";
import Reviews from "../components/shops/ShopReview";
import ShopActions from "../components/shops/ShopActions";
import {
    selectSelectedShop,
    selectShopError,
    selectShopStatus,
} from "../features/shops/shopsSelectors";
import { fetchProducts } from "../features/products/productsSlice";
import { fetchShopServices } from "../features/shops/shopsSlice";

const ShopDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const shop = useSelector(selectSelectedShop);
    const status = useSelector(selectShopStatus);
    const error = useSelector(selectShopError);
    const [thumbnailsImages, setThumbnailsImages] = useState([]);
    const [shopType, setShopType] = useState(null);

    useEffect(() => {
        dispatch(fetchShopDetails(id)).then((result) => {
            const shopData = result.payload;
            setShopType(shopData?.type);

            if (shopData?.type === "beauty_supplier") {
                dispatch(fetchProducts(id)).then((result) => {
                    const images = result.payload
                        ?.filter((item) => item.hasOwnProperty("image"))
                        .map((item) => item.image);
                    setThumbnailsImages(images || []);
                });
            } else {
                dispatch(fetchShopServices(id)).then((result) => {
                    const images = result.payload
                        ?.filter((item) => item.hasOwnProperty("image"))
                        .map((item) => item.image);
                    setThumbnailsImages(images || []);
                });
            }
        });
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
                <ShopActions
                    shopType={shopType}
                    thumbnailsImages={thumbnailsImages}
                />
            </div>
        </div>
    );
};

export default ShopDetail;
