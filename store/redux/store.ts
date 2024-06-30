import { configureStore } from "@reduxjs/toolkit";
import favorites, { IfavoritesState } from "./favorites";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    favorites,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
