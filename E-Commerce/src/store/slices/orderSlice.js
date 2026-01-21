import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

export const createCheckoutSession = createAsyncThunk(
    'orders/createCheckoutSession',
    async (shippingAddress, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(`${API_URL}/checkout`, { shippingAddress }, config);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const verifyPayment = createAsyncThunk(
    'orders/verifyPayment',
    async (sessionId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(`${API_URL}/verify`, { sessionId }, config);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getMyOrders = createAsyncThunk(
    'orders/getMyOrders',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(`${API_URL}/myorders`, config);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        currentOrder: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: '',
    },
    reducers: {
        resetOrderState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCheckoutSession.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCheckoutSession.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Session URL is handled in the component
            })
            .addCase(createCheckoutSession.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(verifyPayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyPayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentOrder = action.payload.order;
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMyOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload.data;
            })
            .addCase(getMyOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
