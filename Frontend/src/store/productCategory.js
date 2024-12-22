import { createSlice } from "@reduxjs/toolkit";


const initialValue = {
    allCategory: [],
    allSubCategory: [],
    product: [],
    loadingProduct: false

}

const productCategorySlice = createSlice({
    name: 'category',
    initialState: initialValue,
    reducers: {
        setCategory: (state, action) => {


            state.allCategory = [...action.payload];

        },
        setSubCategory: (state, action) => {

            state.allSubCategory = [...action.payload]
        },
        setProduct: (state, action) => {
            state.product = [...action.payload]
        },
        setLoadingProduct: (state, action) => {
            state.loadingProduct = action.payload;
        }
    }
})

export const { setCategory, setSubCategory, setProduct, setLoadingProduct } = productCategorySlice.actions;
export default productCategorySlice.reducer;