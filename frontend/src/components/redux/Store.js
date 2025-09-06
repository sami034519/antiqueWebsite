// src/Redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cartslice.jsx";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
