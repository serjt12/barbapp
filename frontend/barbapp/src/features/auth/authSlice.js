import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: null,
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
        updateUser(state, action) {
            state.user = { ...state.user, ...action.payload };
        },
    },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
