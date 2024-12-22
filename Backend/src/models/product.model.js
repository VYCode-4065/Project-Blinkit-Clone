import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
    },
    image: {
        type: Array,
        default: '',
    },
    category_id: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        }
    ],
    subCategory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'subCategory'
        }
    ],
    unit: {
        type: String,
        default: null
    },
    stock: {
        type: Number,
        default: null
    },
    price: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        default: ''
    },
    more_details: {
        type: Object,
        default: {}
    },
    public: {
        type: Boolean,
        default: true
    },
    publish: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

productSchema.index({
    name: 'text',
    description: 'text',
    more_details: 'text'
}, {
    name: 10,
    description: 5,
    more_details: 3
})

export const Product = mongoose.model('Product', productSchema);
