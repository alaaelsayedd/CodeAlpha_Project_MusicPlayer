import { createSlice } from "@reduxjs/toolkit";
 const initialState={
    isEnd:false
 }

const endSlice =  createSlice(
    {
        name:"end",
        initialState,
        reducers:{
            setEndState:(state,action)=>{
                state.isEnd=action.payload
            }
        }

    }
)
export const endReducer = endSlice.reducer;
export const { setEndState } = endSlice.actions;