import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axiosClient";

/* FETCH CART */
export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/cart");
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue(
        "Failed to load cart"
      );
    }
  }
);

/* ADD TO CART */
export const addToCartApi = createAsyncThunk(
  "cart/add",
  async (
    { productId, quantity },
    thunkAPI
  ) => {
    try {
      await api.post("/cart", {
        productId,
        quantity,
      });

      thunkAPI.dispatch(fetchCart());

      return {
        productId,
        quantity,
      };
    } catch {
      return thunkAPI.rejectWithValue(
        "Failed to add item"
      );
    }
  }
);

/* REMOVE FROM CART */
export const removeFromCartApi =
  createAsyncThunk(
    "cart/remove",
    async (productId, thunkAPI) => {
      try {
        await api.delete(
          `/cart/${productId}`
        );

        thunkAPI.dispatch(fetchCart());

        return productId;
      } catch {
        return thunkAPI.rejectWithValue(
          "Failed to remove item"
        );
      }
    }
  );
  export const updateCartQuantityApi =
  createAsyncThunk(
    "cart/updateQuantity",
    async (
      { productId, quantity },
      thunkAPI
    ) => {
      try {
        await api.put(`/cart/${productId}`, {
          quantity,
        });

        thunkAPI.dispatch(fetchCart());

        return {
          productId,
          quantity,
        };
      } catch {
        return thunkAPI.rejectWithValue(
          "Failed to update quantity"
        );
      }
    }
  );

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* FETCH CART */
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchCart.fulfilled,
        (state, action) => {
          state.loading = false;
          state.items = action.payload;
        }
      )

      .addCase(
        fetchCart.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      /* ADD TO CART */
      .addCase(
        addToCartApi.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        addToCartApi.fulfilled,
        (state) => {
          state.loading = false;
        }
      )

      .addCase(
        addToCartApi.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      /* REMOVE FROM CART */
      .addCase(
        removeFromCartApi.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        removeFromCartApi.fulfilled,
        (state) => {
          state.loading = false;
        }
      )

      .addCase(
        removeFromCartApi.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default cartSlice.reducer;