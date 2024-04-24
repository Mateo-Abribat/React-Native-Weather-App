import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@redux/Store";
import type { GeocodeProps } from "@constant/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HistoryState {
  history: GeocodeProps[];
}

const initialState: HistoryState = {
  history: [],
};

export const getStorageHistory = createAsyncThunk(
  "history/getStorageHistory",
  async () => {
    try {
      const history = await AsyncStorage.getItem("history");
      return history != null ? JSON.parse(history) : null;
    } catch (error) {
      console.error("Error while getting geocode from history: ", error);
    }
  }
);

export const historySlice = createSlice({
  name: "history",
  initialState: initialState,
  reducers: {
    updateHistory: (state, action: PayloadAction<GeocodeProps[]>) => {
      state.history = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getStorageHistory.fulfilled,
      (state, action: PayloadAction<GeocodeProps[] | undefined>) => {
        state.history = action.payload ?? [];
      }
    );
  },
});

export const { updateHistory } = historySlice.actions;

export const selectHistoryState = (state: RootState) => state.history;

export default historySlice.reducer;
