import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],

    },
    mobile: {
        type: Number,
        default: null
    },
    avatar: {
        type: String,
        default: ''
    },
    refresh_token: {
        type: String,
        default: ''
    },
    verfy_email: {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: ''
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended'],
        default: 'Active'
    },
    address_detail: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address'
    },

    shopping_cart: {
        type: mongoose.Schema.ObjectId,
        ref: 'cartProduct'
    },

    order_history: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order'
    },
    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expiry: {
        type: Date,
        default: ''
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    }


}, { timestamps: true })


export const User = mongoose.model('User', userSchema);