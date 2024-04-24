import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@redux/Store";
import type { StatusType } from "@constant/Types";

interface ApplicationState {
  status: StatusType;
}

const initialState: ApplicationState = {
  status: "loading",
};

export const applicationSlice = createSlice({
  name: "application",
  initialState: initialState,
  reducers: {
    updateStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
  },
});

export const { updateStatus } = applicationSlice.actions;

export const selectApplicationState = (state: RootState) => state.application;

export default applicationSlice.reducer;
