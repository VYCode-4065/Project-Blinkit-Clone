import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "User",
    initialState: {
        _id: "",
        name: "",
        email: "",
        avatar: "",
        mobile: "",
        verify_email: "",
        last_login_date: "",
        role: "",
        status: "",
        address_detail: [],
        shopping_cart: [],
        order_history: [],
        createdAt: "",
        updatedAt: ""

    },
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload?._id;
            state.name = action.payload?.name;
            state.email = action.payload?.email;
            state.mobile = action.payload?.mobile;
            state.avatar = action.payload?.avatar;
            state.verify_email = action.payload?.verify_email;
            state.last_login_date = action.payload?.last_login_date;
            state.role = action.payload?.role;
            state.status = action.payload?.status;
            state.address_detail = action.payload?.address_detail;
            state.shopping_cart = action.payload?.shopping_cart;
            state.order_history = action.payload?.order_history;
            state.createdAt = action.payload?.createdAt;
            state.updatedAt = action.payload?.updatedAt;

        },
        updateAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        updateUserDetail: (state, action) => {
            state.name = action.payload.name ? action.payload.name : state.name;
            state.email = action.payload.email ? action.payload.email : state.email;
            state.mobile = action.payload.mobile ? action.payload.mobile : state.mobile;
        },
        resetUser: (state, action) => {

            state._id = "";
            state.name = ""
            state.email = ''
            state.mobile = ' '
            state.avatar = ''
            state.verify_email = ''
            state.last_login_date = ''
            state.role = ''
            state.status = ''
            state.address_detail = []
            state.shopping_cart = []
            state.order_history = []
            state.createdAt = ''
            state.updatedAt = ''
        }
    }
})


export const { setUser, resetUser, updateAvatar, updateUserDetail } = userSlice.actions;
export default userSlice.reducer;