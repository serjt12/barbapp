import React from "react";
import InputField from "../shops/InputField";
import ImageUploader from "../ImageUploader";

const ProductsField = ({
    products,
    onProductChange,
    onAddProduct,
    onRemoveProduct,
}) => {
    return (
        <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Product Form
            </h3>
            {products?.map((product, index) => (
                <div
                    key={product.id + product.name}
                    className="mb-4 border p-4 rounded-lg"
                >
                    <h4 className="text-md font-semibold mb-2">
                        Product: {product.name}
                    </h4>
                    <InputField
                        label="Name"
                        name={`product-name-${index}`}
                        value={product.name}
                        onChange={(e) =>
                            onProductChange(index, "name", e.target.value)
                        }
                        placeholder="Enter product name"
                    />
                    <InputField
                        label="Description"
                        name={`product-description-${index}`}
                        value={product.description}
                        onChange={(e) =>
                            onProductChange(
                                index,
                                "description",
                                e.target.value
                            )
                        }
                        placeholder="Enter product description"
                        type="textarea"
                    />
                    <InputField
                        label="Price"
                        name={`product-price-${index}`}
                        value={product.price}
                        onChange={(e) =>
                            onProductChange(index, "price", e.target.value)
                        }
                        placeholder="Enter product price"
                        type="number"
                        step="0.01"
                    />
                    <ImageUploader
                        label="Product Image"
                        name={`product-image-${index}`}
                        value={product.image}
                        onChange={(e) =>
                            onProductChange(index, "image", e.target.files[0])
                        }
                    />
                    <button
                        type="button"
                        onClick={() => onRemoveProduct(index)}
                        className="mt-2 text-red-500 hover:text-red-700"
                    >
                        Remove Product
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductsField;
