import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import categoryReducer from './productCategory'

const store = configureStore({
    reducer: {

        userDetails: userReducer,
        categoryDetails: categoryReducer,

    },
})

export default store;