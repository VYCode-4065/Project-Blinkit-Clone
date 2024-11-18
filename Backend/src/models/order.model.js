import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    orderId: {
        type: String,
        required: true,
        default: null
    },
    product_details: {
        name: String,
        image: Array

    },
    paymentId: {
        type: String,
        default: '',
    },
    paymentStatus: {
        type: String,
        default: "",
    },
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address'
    },
    subTotalAmt: {
        type: Number,
        default: 0
    },
    totalAmt: {
        type: Number,
        default: 0
    },
    invoice_receipt: {
        type: String,
        default: "",
    }

}, {
    timestamps: true
})

export const Order = mongoose.model('Order', orderSchema);