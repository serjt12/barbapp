import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShops } from "../features/shops/shopsSlice";
import ShopsList from "../components/shops/ShopsList";

const Feed = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.shop?.status);
    const error = useSelector((state) => state.shop?.error);
    const shops = useSelector((state) => state.shop?.shops);

    useEffect(() => {
        dispatch(fetchShops());
    }, [dispatch]);

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
        content = <ShopsList shops={shops} />;
    }

    return <div className="bg-white container m-3 mx-auto">{content}</div>;
};

export default Feed;
