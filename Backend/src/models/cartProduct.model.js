import mongoose, { Schema } from "mongoose";

const cartProductSchema = new Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
})

export const cartProduct = mongoose.model('cartProduct', cartProductSchema);