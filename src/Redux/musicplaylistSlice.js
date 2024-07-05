import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";
const initialState = {
  musicplay: data[0],
};
const musicPlaylistSlice = createSlice({
  name: "musicplay",
  initialState,
  reducers: {
    setmusicplay: (state, action) => {
      state.musicplay = action.payload;
    },
  },
});
export const musicReducer = musicPlaylistSlice.reducer;
export const { setmusicplay } = musicPlaylistSlice.actions;
