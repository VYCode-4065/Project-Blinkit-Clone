import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import categoryReducer from './productCategory'
import cartProductReducer from './cartSlice'
import addressReducer from './addressSlice'

const store = configureStore({
    reducer: {

        userDetails: userReducer,
        categoryDetails: categoryReducer,
        cartProductDetails: cartProductReducer,
        addressDetails: addressReducer

    },
})

export default store;