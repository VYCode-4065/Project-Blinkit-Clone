import { createSlice } from "@reduxjs/toolkit";


const initialValue = {
    allCategory: [],
    allSubCategory: [],
    product: [],
    loadingProduct: false,
    productTotalPrice: 0

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
        },
        setProductTotalPrice: (state, action) => {
            state.productTotalPrice = action.payload
        }
    }
})

export const { setCategory, setSubCategory, setProduct, setLoadingProduct, setProductTotalPrice } = productCategorySlice.actions;
export default productCategorySlice.reducer;