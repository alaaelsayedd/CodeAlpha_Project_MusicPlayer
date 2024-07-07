import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import { songsReducer } from "./SongsSlice";
import { playListReducer } from "./playListslice";
import { propReducer } from "./PropSlice";
import { musicReducer } from "./musicplaylistSlice";
import { endReducer } from "./endSlice";
import { playReducer } from "./PlaySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    songs: songsReducer,
    playLists: playListReducer,
    prop: propReducer,
    musicplay: musicReducer,
    end: endReducer,
    play: playReducer,
  },
});
