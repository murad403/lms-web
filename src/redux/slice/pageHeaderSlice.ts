// store/pageHeaderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageHeaderState {
  title: string;
  info: string;
}

const initialState: PageHeaderState = {
  title: "",
  info: "",
};

const pageHeaderSlice = createSlice({
  name: "pageHeader",
  initialState,
  reducers: {
    setPageHeader: (
      state,
      action: PayloadAction<{ title: string; info: string }>,
    ) => {
      state.title = action.payload.title;
      state.info = action.payload.info;
    },
    clearPageHeader: (state) => {
      state.title = "";
      state.info = "";
    },
  },
});

export const { setPageHeader, clearPageHeader } = pageHeaderSlice.actions;
export default pageHeaderSlice.reducer;
