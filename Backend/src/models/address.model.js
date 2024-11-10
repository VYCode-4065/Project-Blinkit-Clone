import mongoose, { Schema } from "mongoose";


const addressSchema = new Schema({
    address_line: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: ''
    },
    state: {
        type: String,
    },
    pincode: {
        type: String
    },
    country: {
        type: String
    },
    mobile: {
        type: Number,
        default: null
    }
}, { timestamps: true })

export const Address = mongoose.model('Address', addressSchema);