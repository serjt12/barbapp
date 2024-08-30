import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig";

// Initial state for the auth slice
const initialState = {
    isLoggedIn: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const removeLocalStorageItems = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

const setLocalStorageItems = ({ access, refresh }) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
};

// Async thunk for logging in
export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/login/", {
                username,
                password,
            });
            setLocalStorageItems(response.data);
            return response.data; // Contains user, accessToken, and refreshToken
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginGoogle = createAsyncThunk(
    "auth/loginGoogle",
    async (accessToken, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/google/", {
                access_token: accessToken,
            });
            setLocalStorageItems(response.data);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for registering a new user
export const register = createAsyncThunk(
    "auth/register",
    async (
        { username, password, email, firstName, lastName },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.post("/register/", {
                username,
                password,
                email,
                first_name: firstName,
                last_name: lastName,
            });
            setLocalStorageItems(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for logging out
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await axiosInstance.post("/logout/");
            removeLocalStorageItems();
            return { msg: "User logout" };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for refreshing tokens
export const refreshAuthToken = createAsyncThunk(
    "auth/refreshAuthToken",
    async (_, { getState, rejectWithValue }) => {
        const { refreshToken } = getState().auth;
        try {
            const response = await axiosInstance.post("/token/refresh/", {
                refresh: refreshToken,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Slice definition
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateUser(state, action) {
            state.user = { ...state.user, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle login thunk
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.accessToken = action.payload.access;
                state.refreshToken = action.payload.refresh;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            // Handle login google
            .addCase(loginGoogle.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginGoogle.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.accessToken = action.payload.access;
                state.refreshToken = action.payload.refresh;
                state.error = null;
            })
            .addCase(loginGoogle.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            // Handle register thunk
            .addCase(register.pending, (state) => {
                state.status = "loading";
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.accessToken = action.payload.access;
                state.refreshToken = action.payload.refresh;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            // Handle logout thunk
            .addCase(logout.pending, (state) => {
                state.status = "loading";
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = "succeeded";
                state.isLoggedIn = false;
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            // Handle refreshAuthToken thunk
            .addCase(refreshAuthToken.pending, (state) => {
                state.status = "loading";
            })
            .addCase(refreshAuthToken.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.accessToken = action.payload.access;
                state.error = null;
            })
            .addCase(refreshAuthToken.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            });
    },
});

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;
