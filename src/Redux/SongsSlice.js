import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";
 const initialState={
    songs:data
 }

const songsSlice= createSlice({
    name:"songs",
    initialState,
    reducers:{
        setSongs:(state,action)=>{
            state.songs=action.payload
        }
    }

})
export const songsReducer= songsSlice.reducer
export const {setSongs}= songsSlice.actions
