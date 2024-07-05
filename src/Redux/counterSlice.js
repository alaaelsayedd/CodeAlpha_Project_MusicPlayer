import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  counter: 0,
};
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCount:(state,action)=>{
        state.counter =action.payload
    }
  },
});
export const counterReducer=counterSlice.reducer;
export const {setCount}=counterSlice.actions;
