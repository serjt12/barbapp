import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetails } from "../features/products/productsSlice";
import { useParams, useLocation } from "react-router-dom";
import ShopImage from "../components/shops/ShopImage";
import ShopInfo from "../components/shops/ShopInfo";
import Reviews from "../components/shops/ShopReview";
// import ShopActions from "../components/shops/ShopActions";
import {
    selectProducts,
    selectProductStatus,
    selectProductError,
} from "../features/products/productSelectors";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ProductDetail = () => {
    const { id } = useParams();
    let query = useQuery();
    const shopId = query.get("shop_id");
    console.log("id: ", id);
    console.log("shopId: ", shopId);
    const dispatch = useDispatch();
    const product = useSelector(selectProducts);
    console.log("product: ", product);
    const status = useSelector(selectProductStatus);
    const error = useSelector(selectProductError);

    useEffect(() => {
        dispatch(fetchProductDetails({ shopId, productId: id }));
    }, [dispatch, id, shopId]);

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
                <ShopImage src={product?.image} alt={product?.description} />
            </div>
            <div className="col-span-1 md:col-span-2">
                <ShopInfo
                    title={product?.name}
                    description={product?.contact_info}
                />
            </div>
            <div className="col-span-1 md:col-span-2">
                <Reviews reviews={product?.reviews} />
            </div>
            {/* <div className="col-span-1 md:col-span-2">
                <ShopActions
                    shopType={shopType}
                    thumbnailsImages={thumbnailsImages}
                />
            </div> */}
        </div>
    );
};

export default ProductDetail;
