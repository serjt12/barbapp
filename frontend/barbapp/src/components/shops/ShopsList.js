import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../services/utils";
import { FaShoppingBag, FaEdit } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";

const ShopsList = ({ shops, onEditShop }) => {
    const handleEditClick = (event, shop) => {
        event.preventDefault();
        onEditShop(shop, event);
    };
    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Services</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {shops?.map((shop) => (
                    <Link
                        key={shop.id}
                        to={`/shop/${shop.id}`}
                        className="group relative block"
                    >
                        <div className="relative">
                            <div className="aspect-h-1 aspect-w-1">
                                <img
                                    src={getImageUrl(shop.image)}
                                    alt={shop.contact_info}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                                <div className="absolute top-2 left-2 p-2 bg-black h-fit w-fit rounded-full">
                                    {shop.type !== "beauty_supplier" ? (
                                        <FaScissors className="text-yellow-300" />
                                    ) : (
                                        <FaShoppingBag className="text-yellow-300" />
                                    )}
                                </div>
                                <div className="z-50">
                                    {onEditShop && (
                                        <button
                                            onClick={(event) =>
                                                handleEditClick(event, shop)
                                            }
                                            className="z-50 ml-2 cursor-pointer absolute bottom-2 left-2 p-2 bg-black h-fit w-fit rounded-full"
                                        >
                                            <FaEdit className="text-yellow-300" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">
                                {shop.name}
                            </h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {shop.contact_info}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ShopsList;
