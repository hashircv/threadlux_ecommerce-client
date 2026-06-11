import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import api from "../api/axiosClient";

/* FETCH ALL PRODUCTS */
export const fetchProducts =
  createAsyncThunk(
    "products/fetchAll",
    async (_, thunkAPI) => {
      try {
        const res = await api.get(
          "/products"
        );

        return res.data;
      } catch {
        return thunkAPI.rejectWithValue(
          "Failed to load products"
        );
      }
    }
  );

/* FETCH SINGLE PRODUCT */
export const fetchProductById =
  createAsyncThunk(
    "products/fetchById",
    async (id, thunkAPI) => {
      try {
        const res = await api.get(
          `/products/${id}`
        );

        return res.data;
      } catch {
        return thunkAPI.rejectWithValue(
          "Failed to load product"
        );
      }
    }
  );

const productsSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    selected: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* FETCH PRODUCTS */
      .addCase(
        fetchProducts.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          state.loading = false;
          state.items = action.payload;
        }
      )

      .addCase(
        fetchProducts.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      /* FETCH PRODUCT BY ID */
      .addCase(
        fetchProductById.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchProductById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.selected = action.payload;
        }
      )

      .addCase(
        fetchProductById.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default productsSlice.reducer;