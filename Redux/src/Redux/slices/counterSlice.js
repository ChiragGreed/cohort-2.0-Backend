import { createSlice } from "@reduxjs/toolkit"

export const counterSlice = createSlice({
    name: "Counter",
    initialState: {
        value: 0
    },
    reducers: {
        Increment: (state) => {
            state.value++
        },
        Decrement: (state) => {
            state.value--
        },
        IncrementBy5: (state) => {
            state.value += 5
        }
    }
})

export default counterSlice.reducer
export const { Increment, Decrement, IncrementBy5 } = counterSlice.actions;