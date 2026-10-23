import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      if (!state.items.some(p => p.id === action.payload.id))
        state.items.push({ ...action.payload, quantity: 1 });
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(p => p.id === action.payload);
      if (item) item.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(p => p.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
      else state.items = state.items.filter(p => p.id !== action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    }
  }
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
