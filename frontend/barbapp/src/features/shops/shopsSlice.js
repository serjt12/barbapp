import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig";

// Async thunk to create a shop
export const createShop = createAsyncThunk(
    "shop/createShop",
    async (data, { rejectWithValue }) => {
        console.log("data: ", data);
        try {
            const response = await axiosInstance.post("/shops/", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to fetch all shops
export const fetchShops = createAsyncThunk(
    "shop/fetchShops",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/shops/");
            return response.data.shops;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

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

export const updateShop = createAsyncThunk(
    "shop/updateShop",
    async ({ shopId, data, headers }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `/shops/${shopId}/`,
                data,
                { headers: headers }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteShop = createAsyncThunk(
    "shop/deleteShop",
    async (shopId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/shops/${shopId}`);
            return shopId; // Return the shopId to use in the reducer
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
        status: "idle",
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
            .addCase(createShop.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createShop.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedShop = action.payload;
            })
            .addCase(createShop.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
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
            });

        builder
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

        builder
            .addCase(fetchOwnedShops.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOwnedShops.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.ownedShops = action.payload;
            })
            .addCase(fetchOwnedShops.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

        builder
            .addCase(fetchShopServices.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchShopServices.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.services = action.payload;
            })
            .addCase(fetchShopServices.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

        // Handle the updateShop thunk
        builder
            .addCase(updateShop.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateShop.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.shops.findIndex(
                    (shop) => shop.id === action.payload.id
                );
                if (index !== -1) {
                    state.shops[index] = action.payload;
                }
                if (
                    state.selectedShop &&
                    state.selectedShop.id === action.payload.id
                ) {
                    state.selectedShop = action.payload;
                }
            })
            .addCase(updateShop.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

        // Handle the deleteShop thunk
        builder
            .addCase(deleteShop.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteShop.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.shops = state.shops.filter(
                    (shop) => shop.id !== action.payload
                );
                if (
                    state.selectedShop &&
                    state.selectedShop.id === action.payload
                ) {
                    state.selectedShop = null;
                }
            })
            .addCase(deleteShop.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { clearSelectedShop } = shopSlice.actions;

export default shopSlice.reducer;
