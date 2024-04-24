import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@redux/Store";
import type { ToasterType } from "@constant/Types";

interface ToasterState {
  state: ToasterType;
  visible: boolean;
  description: string;
}

const initialState: ToasterState = {
  visible: false,
  state: "failure",
  description: "Erreur inconnue",
};

export const toasterSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<ToasterType>) => {
      state.state = action.payload;
    },
    updateVisibility: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    updateDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  },
});

export const { updateState, updateVisibility, updateDescription } =
  toasterSlice.actions;

export const selectToasterState = (state: RootState) => state.toaster;

export default toasterSlice.reducer;
