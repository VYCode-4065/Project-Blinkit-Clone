import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: []
}

const addressSlice = createSlice({
    name: 'address',
    initialState: initialState,
    reducers: {
        addAddress: (state, action) => {
            state.address = action.payload;
        }
    }
})

export const { addAddress } = addressSlice.actions

export default addressSlice.reducer