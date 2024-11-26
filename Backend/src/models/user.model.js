import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
    address_detail: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Address'
        }
    ],

    shopping_cart: [{
        type: mongoose.Schema.ObjectId,
        ref: 'cartProduct'
    }],

    order_history: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Order'
    }],
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


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}






export const User = mongoose.model('User', userSchema);