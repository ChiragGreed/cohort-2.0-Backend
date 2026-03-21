import counterReducer from './slices/counterSlice.js'
import themeReducer from './slices/themeSlice.js'

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        theme: themeReducer
    }
});