import { createSlice } from "@reduxjs/toolkit";


const initialValue = {
    allCategory: [],
    allSubCategory: [],
    product: []
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
        }
    }
})

export const { setCategory, setSubCategory } = productCategorySlice.actions;
export default productCategorySlice.reducer;