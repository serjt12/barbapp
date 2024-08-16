import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig";

// Async thunk to fetch all shops
export const fetchShops = createAsyncThunk("shop/fetchShops", async () => {
    const response = await axiosInstance.get("/shops");
    return response.data.shops; // Assuming response has a 'shops' key
});

// Async thunk to fetch a single shop's details
export const fetchShopDetails = createAsyncThunk(
    "shop/fetchShopDetails",
    async (shopId) => {
        const response = await axiosInstance.get(`/shops/${shopId}`);
        console.log("response1: ", response);
        return response.data.shop; // Assuming response has a 'shop' key
    }
);

export const fetchOwnedShops = createAsyncThunk(
    "shops/fetchOwnedShops",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/owned-shops");
            console.log("response2: ", response);
            return response.data;
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
            });
    },
});

export const { clearSelectedShop } = shopSlice.actions;

export default shopSlice.reducer;
