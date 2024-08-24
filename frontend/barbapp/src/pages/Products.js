import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import ProductsList from "../components/products/ProductsList";
import ProductsField from "../components/products/ProductsField";
import {
    fetchProducts,
    createProduct,
} from "../features/products/productsSlice";
import {
    selectProducts,
    selectProductError,
    selectProductStatus,
} from "../features/products/productSelectors";
import { selectOwnedShops } from "../features/shops/shopsSelectors";
import { fetchOwnedShops } from "../features/shops/shopsSlice";

const Products = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const products = useSelector(selectProducts);
    const status = useSelector(selectProductStatus);
    const error = useSelector(selectProductError);
    const ownShops = useSelector(selectOwnedShops);

    // Check if the user owns the shop
    const isOwner = ownShops.some((shop) => shop.id === parseInt(id));

    // Initialize form data with one empty product form
    const [formData, setFormData] = useState({
        products: [{ name: "", description: "", price: "", image: null }],
    });
    const [isEmpty, setIsEmpty] = useState(true);

    const addProductField = () => {
        setFormData((prevState) => ({
            products: [
                ...prevState.products,
                { name: "", description: "", price: "", image: null },
            ],
        }));
    };

    const handleProductChange = (index, key, value) => {
        const updatedProducts = [...formData.products];
        updatedProducts[index] = { ...updatedProducts[index], [key]: value };
        setFormData({ products: updatedProducts });
    };

    const removeProductField = (index) => {
        const updatedProducts = [...formData.products];
        updatedProducts.splice(index, 1);
        setFormData({ products: updatedProducts });
    };

    useEffect(() => {
        const checkIsEmpty = () => {
            const allProductsFilled = formData.products.every(
                ({ name, description, price, image }) =>
                    name && description && price && image
            );
            setIsEmpty(!allProductsFilled);
        };
        checkIsEmpty();
    }, [formData]);

    useEffect(() => {
        if (id) {
            dispatch(fetchProducts(id));
            dispatch(fetchOwnedShops());
        }
    }, [dispatch, id]);

    const handleSave = async () => {
        // Loop through all the products in the form data and save them
        for (const product of formData.products) {
            const productFormData = new FormData();
            productFormData.append("name", product.name);
            productFormData.append("description", product.description);
            productFormData.append("price", product.price);
            if (product.image) {
                productFormData.append("image", product.image);
            }
            productFormData.append("shop", id);

            dispatch(
                createProduct({ shopId: id, productData: productFormData })
            );
        }

        // Clear the form after saving
        setFormData({
            products: [{ name: "", description: "", price: "", image: null }],
        });
    };

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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Products</h1>

            <ProductsList products={products} shopId={id} />

            {/* Conditionally render ProductsField if the user is the shop owner */}
            {isOwner && (
                <>
                    <ProductsField
                        formDataProducts={formData.products}
                        onProductChange={handleProductChange}
                        onRemoveProduct={removeProductField}
                        onAddProduct={addProductField}
                    />
                    <button
                        disabled={isEmpty}
                        onClick={handleSave}
                        className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-700 ${
                            isEmpty ? "opacity-50" : ""
                        }`}
                    >
                        Save Changes
                    </button>
                </>
            )}
        </div>
    );
};

export default Products;
