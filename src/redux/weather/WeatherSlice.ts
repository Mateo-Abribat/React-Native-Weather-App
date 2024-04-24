import type { LocationObjectCoords } from "expo-location";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@redux/Store";

interface WeatherState {
  location?: LocationObjectCoords;
}

const initialState: WeatherState = {
  location: undefined,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {
    updateLocation: (state, action: PayloadAction<LocationObjectCoords>) => {
      state.location = action.payload;
    },
  },
});

export const { updateLocation } = weatherSlice.actions;

export const selectWeatherState = (state: RootState) => state.weather;

export default weatherSlice.reducer;
