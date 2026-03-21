import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        value: "Light"
    },
    reducers: {
        changeThemeToLight: (state) => {
            state.value = 'light'
        },
        changeThemeToDark: (state) => {
            state.value = 'dark'
        }
    }
})

export default themeSlice.reducer
export const { changeThemeToLight, changeThemeToDark } = themeSlice.actions