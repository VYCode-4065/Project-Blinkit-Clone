import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: 'cartItem',
    initialState: initialState,
    reducers: {
        addProductToCart: (state, action) => {
            state.cart = action.payload;
        }
    }
})

export const { addProductToCart } = cartSlice.actions

export default cartSlice.reducer