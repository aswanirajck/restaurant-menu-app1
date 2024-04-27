import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addToCart: (state, action) => {
      const { dishId } = action.payload;
      state[dishId] = (state[dishId] || 0) + 1;
    },
    removeFromCart: (state, action) => {
      const { dishId } = action.payload;
      if (state[dishId] && state[dishId] > 0) {
        state[dishId] -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
