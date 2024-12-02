import mongoose, { Schema } from 'mongoose'

const subCategorySchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: '',
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        }
    ]
})

export const subCategory = mongoose.model('subCategory', subCategorySchema);