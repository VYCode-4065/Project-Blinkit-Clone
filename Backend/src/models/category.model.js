import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        default: null,
        required: true
    },
    image: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

export const Category = mongoose.model('Category', categorySchema);