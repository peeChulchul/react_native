import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Meal } from "data/dummy-data";

export interface IfavoritesState {
  ids: Meal["id"][];
}

const initialState: IfavoritesState = {
  ids: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (
      state: IfavoritesState,
      action: PayloadAction<{ id: Meal["id"] }>
    ) => {
      state.ids = state.ids.concat(action.payload.id);
    },
    removeFavorite: (
      state: IfavoritesState,
      action: PayloadAction<{ id: Meal["id"] }>
    ) => {
      state.ids = state.ids.filter((id) => id !== action.payload.id);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
