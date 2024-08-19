import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig";

// Async thunk to fetch all shops
export const fetchShops = createAsyncThunk("shop/fetchShops", async () => {
    const response = await axiosInstance.get("/shops");
    return response.data.shops;
});

export const fetchOwnedShops = createAsyncThunk(
    "shops/fetchOwnedShops",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/owned-shops");
            return response.data.owned_shops;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to fetch a single shop's details
export const fetchShopDetails = createAsyncThunk(
    "shop/fetchShopDetails",
    async (shopId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/shops/${shopId}`);
            return response.data.shop;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchShopServices = createAsyncThunk(
    "shop/fetchServices",
    async (shopId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/services/?shop_id=${shopId}`
            );
            console.log("response: ", response);
            return response.data.services;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        shops: [],
        selectedShop: null,
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        ownedShops: [],
        services: [],
    },
    reducers: {
        clearSelectedShop(state) {
            state.selectedShop = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShops.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchShops.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.shops = action.payload;
            })
            .addCase(fetchShops.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchShopDetails.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchShopDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedShop = action.payload;
            })
            .addCase(fetchShopDetails.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchOwnedShops.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOwnedShops.fulfilled, (state, action) => {
                state.loading = false;
                state.ownedShops = action.payload;
            })
            .addCase(fetchOwnedShops.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchShopServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchShopServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(fetchShopServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSelectedShop } = shopSlice.actions;

export default shopSlice.reducer;
