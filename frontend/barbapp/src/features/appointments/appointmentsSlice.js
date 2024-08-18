import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig";

// Existing fetchAppointments thunk
export const fetchAppointments = createAsyncThunk(
    "appointments/fetchAppointments",
    async ({ startDate, endDate, shopId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/appointments/monthly/?shop_id=${shopId}&start_date=${startDate}&end_date=${endDate}`
            );
            return response.data.appointments;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// New createAppointment thunk
export const createAppointment = createAsyncThunk(
    "appointments/createAppointment",
    async ({ service_id, datetime }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/appointments/create/", {
                service_id,
                datetime,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const appointmentsSlice = createSlice({
    name: "appointments",
    initialState: {
        appointments: [],
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppointments.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.appointments = action.payload;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            .addCase(createAppointment.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.appointments.push(action.payload); // Assuming you want to add the new appointment to the list
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            });
    },
});

export default appointmentsSlice.reducer;
