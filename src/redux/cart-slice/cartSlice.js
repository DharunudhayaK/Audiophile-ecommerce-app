import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    cartData: {},
    total: 0,
  },
  reducers: {
    addCartData: (state, action) => {
      state.cartData = {
        ...state.cartData,
        ...action.payload,
      };
    },
    totalPrice: (state, action) => {
      state.total = action.payload;
    },
    resetCart: (state) => {
      state.cartData = {};
      state.total = 0;
    },
  },
});

export const { addCartData, totalPrice, resetCart } = counterSlice.actions;

export default counterSlice.reducer;
