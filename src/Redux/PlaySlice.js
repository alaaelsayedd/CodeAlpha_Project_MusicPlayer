import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    playing:false
}
const  playSlice = createSlice(
    {
        name:"play",
        initialState,
        reducers:{
            setPlaygState:(state,action)=>{
                state.playing=action.payload
            }
        }

    }
)
 export const playReducer= playSlice.reducer;
 export const {setPlaygState} =playSlice.actions;