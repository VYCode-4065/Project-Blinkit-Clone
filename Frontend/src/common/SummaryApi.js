export const baseURL = "http://localhost:3030"

const SummaryApi = {
    register: {
        url: '/api/user/register',
        method: 'post'
    },
    login: {
        url: '/api/user/login',
        method: 'post'
    },
    forgot_password: {
        url: "/api/user/forgot-password",
        method: 'put'
    },
    forgot_password_otp_verification: {
        url: 'api/user/verify-otp',
        method: 'post'
    },
    resetPassword: {
        url: "/api/user/reset-password",
        method: 'post'
    },
    refreshToken: {
        url: 'api/user/refresh-token',
        method: 'post'
    },
    userDetails: {
        url: 'api/user/user-details',
        method: "get"
    },
    logout: {
        url: "/api/user/logout",
        method: 'post'
    },
    uploadAvatar: {
        url: "/api/user/upload",
        method: 'post'
    },
    updateUserDetails: {
        url: '/api/user/update-user',
        method: 'put'
    },
    addCategory: {
        url: '/api/category/add-category',
        method: 'post'
    },
    uploadImage: {
        url: '/api/file/upload',
        method: 'post'
    },
    getCategory: {
        url: '/api/category/get-category',
        method: 'get'
    },
    updateCategory: {
        url: '/api/category/update-category',
        method: 'put'
    },
    deleteCategory: {
        url: '/api/category/delete-category',
        method: 'delete'
    },
    createSubCategory: {
        url: '/api/subcategory/create',
        method: 'post'
    },
    getSubCategory: {
        url: '/api/subcategory/get',
        method: 'get'
    },
    updateSubCategory: {
        url: '/api/subcategory/update',
        method: 'put'
    },
    deleteSubCategory: {
        url: '/api/subcategory/delete',
        method: 'delete'
    },
    createProduct: {
        url: '/api/product/create',
        method: 'post'
    },
    getProduct: {
        url: '/api/product/get',
        method: 'post'
    },
    getProductByCategory: {
        url: '/api/product/get-by-category',
        method: 'post'
    },
    getProductByCategoryAndSubCategory: {
        url: '/api/product/get-by-cat-subcat',
        method: 'post'
    },
    getProductDetails: {
        url: '/api/product/get-by-id',
        method: 'post'
    },
    updateProductDetails: {
        url: "/api/product/update",
        method: 'put'
    },
    deleteProduct: {
        url: "/api/product/delete",
        method: 'delete'
    },
    searchProduct: {
        url: '/api/product/search-product',
        method: 'post'
    },
    addTocart: {
        url: "/api/cart/create",
        method: 'post'
    },
    getCartItem: {
        url: '/api/cart/get',
        method: 'get'
    },
    updateCartItemQty: {
        url: '/api/cart/update-qty',
        method: 'put'
    },
    deleteCartItem: {
        url: '/api/cart/delete',
        method: 'delete'
    },
    createAddress: {
        url: '/api/address/create',
        method: 'post'
    },
    getAddress: {
        url: '/api/address/get',
        method: 'get'
    },
    updateAddress: {
        url: '/api/address/update',
        method: 'put'
    },
    deleteAddress: {
        url: '/api/address/delete',
        method: 'delete'
    },
    CashOnDeliveryOrder: {
        url: "/api/order/cash-on-delivery",
        method: 'post'
    },
    payment_url: {
        url: "/api/order/online-payment",
        method: 'post'
    },
    getOrderItems: {
        url: '/api/order/order-list',
        method: 'get'
    }
}

export default SummaryApi