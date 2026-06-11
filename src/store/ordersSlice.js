import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axiosClient";

export const fetchOrders = createAsyncThunk("orders/fetch", async (_, thunkAPI) => {
  try {
    const res = await api.get("/orders");
    return res.data;
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch orders");
  }
});

export const createOrder = createAsyncThunk("orders/create", async (_, thunkAPI) => {
  try {
    const res = await api.post("/orders");
    return res.data;
  } catch {
    return thunkAPI.rejectWithValue("Failed to create order");
  }
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastOrder: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.lastOrder = action.payload;
      });
  }
});

export default ordersSlice.reducer;
