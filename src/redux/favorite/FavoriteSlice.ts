import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@redux/Store";
import type { CityProps } from "@constant/Types";

interface FavoriteState {
  favorite: CityProps[];
}

const initialState: FavoriteState = {
  favorite: [],
};

export const getStorageFavorite = createAsyncThunk(
  "favorite/getStorageFavorite",
  async () => {
    try {
      const favorite = await AsyncStorage.getItem("favorite");
      return favorite != null ? JSON.parse(favorite) : null;
    } catch (error) {
      console.error("Error while getting city from favorite: ", error);
    }
  }
);

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: initialState,
  reducers: {
    updateFavorite: (state, action: PayloadAction<CityProps[]>) => {
      state.favorite = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getStorageFavorite.fulfilled,
      (state, action: PayloadAction<CityProps[] | undefined>) => {
        state.favorite = action.payload ?? [];
      }
    );
  },
});

export const { updateFavorite } = favoriteSlice.actions;

export const selectFavoriteState = (state: RootState) => state.favorite;

export default favoriteSlice.reducer;
