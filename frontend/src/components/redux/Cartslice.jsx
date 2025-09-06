// src/Redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // {id, name, price, image, quantity}
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// ✅ Actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// ✅ Reducer
export default cartSlice.reducer;

// ✅ Selectors
export const selectCartItems = (state) => state.cart.items;

// Total quantity of all items
export const selectCartTotalQuantity = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

// Total price
export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
