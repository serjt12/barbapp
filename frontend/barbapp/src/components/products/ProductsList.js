import React from "react";
import { Link } from "react-router-dom";
import { FaBox } from "react-icons/fa";
import { getImageUrl } from "../../services/utils";

const ProductsList = ({ products, shopId }) => {
    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products?.map((product) => (
                    <Link
                        key={product.id}
                        to={`/product/${product.id}/?shop_id=${shopId}`}
                        className="group relative block"
                    >
                        <div className="relative">
                            <div className="aspect-h-1 aspect-w-1">
                                <img
                                    src={getImageUrl(product.image)}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                                <div className="absolute top-2 right-2 left-2 p-2 bg-black h-fit w-fit rounded-full">
                                    <FaBox className="text-yellow-300" />
                                </div>
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">
                                {product.name}
                            </h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                ${product.price}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductsList;
