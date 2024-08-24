import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig";

// Fetch products for a shop
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (shopId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/products/${shopId}/`);
            return response.data.products;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Fetch product details by id
export const fetchProductDetails = createAsyncThunk(
    "products/fetchProductDetails",
    async ({ shopId, productId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/products/${shopId}/${productId}/`
            );
            return response.data.product;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create a new product
export const createProduct = createAsyncThunk(
    "products/createProduct",
    async ({ shopId, productData }, { rejectWithValue }) => {
        console.log("productData: ", productData);
        try {
            const response = await axiosInstance.post(
                `/products/${shopId}/`,
                productData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data.products;
        } catch (error) {
            console.error(
                "Error creating product:",
                error.response?.data || error.message
            );
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        productDetails: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error =
                    typeof action.payload === "string"
                        ? action.payload
                        : JSON.stringify(action.payload);
            });

        builder
            .addCase(fetchProductDetails.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.productDetails = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.status = "failed";
                state.error =
                    typeof action.payload === "string"
                        ? action.payload
                        : JSON.stringify(action.payload);
            });

        builder
            .addCase(createProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error =
                    typeof action.payload === "string"
                        ? action.payload
                        : JSON.stringify(action.payload);
            });
    },
});

export default productsSlice.reducer;
