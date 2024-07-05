import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playListsChange: false,
};
const playListSlice = createSlice({
  name: "playLists",
  initialState,
  reducers: {
    setPlayLists: (state, action) => {
      state.playListsChange = !state.playListsChange;
    },
  },
});

export const playListReducer = playListSlice.reducer;
export const { setPlayLists } = playListSlice.actions;
