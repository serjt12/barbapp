// features/shop/shopSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch all shops
export const fetchShops = createAsyncThunk("shop/fetchShops", async () => {
    const response = await fetch(
        "https://dummyjson.com/products/category/beauty"
    );
    const data = await response.json();
    return data.products;
});

// Async thunk to fetch a single shop's details
export const fetchShopDetails = createAsyncThunk(
    "shop/fetchShopDetails",
    async (shopId) => {
        const response = await fetch(
            `https://dummyjson.com/products/${shopId}`
        );
        const data = await response.json();
        return data; // Assuming the API returns the shop details directly
    }
);

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        items: [],
        selectedShop: null,
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
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
                state.items = action.payload;
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
            });
    },
});

export const { clearSelectedShop } = shopSlice.actions;

export default shopSlice.reducer;
