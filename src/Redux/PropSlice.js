import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isProp: false,
  index: null,
};

const propSlice = createSlice({
  name: "prop",
  initialState,
  reducers: {
    SetpropState: (state, acion) => {
      state.isProp = acion.payload;
    },
    setIndex: (state, acion) => {
      state.index = acion.payload;
    },
  },
});
export const propReducer = propSlice.reducer;
export const { SetpropState ,setIndex} = propSlice.actions;
