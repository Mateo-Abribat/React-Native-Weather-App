import { configureStore } from "@reduxjs/toolkit";

import toasterSlice from "./toaster/ToasterSlice";
import historySlice from "./history/HistorySlice";
import weatherSlice from "./weather/WeatherSlice";
import favoriteSlice from "./favorite/FavoriteSlice";
import applicationSlice from "./application/ApplicationSlice";

export const Store = configureStore({
  reducer: {
    history: historySlice,
    weather: weatherSlice,
    toaster: toasterSlice,
    favorite: favoriteSlice,
    application: applicationSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
