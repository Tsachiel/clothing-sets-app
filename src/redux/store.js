import { configureStore } from "@reduxjs/toolkit";
import clothesReducer from "./slices/clothesSlice";

export const store = configureStore({
  reducer: {
    clothes: clothesReducer,
  },
});
