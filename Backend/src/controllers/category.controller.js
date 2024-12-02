import { Category } from "../models/category.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from '../utils/asynchandler.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { subCategory } from '../models/sub_category.model.js'

const AddCategoryController = asynchandler(async (req, res) => {

    const { name, image } = req.body;
    console.log(req.body);





    if (!name || !image) {
        return res.status(400).json(new ApiResponse(400, {}, 'Provide all credentials !'))
    }


    const payload = {
        name: name,
        image: image
    }

    const newCategory = await Category.create(payload)

    if (!newCategory) {
        return res.status(500).json(new ApiResponse(500, newCategory, 'Unable to upload new category '))
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            newCategory,
            'New Category added successfully !'
        )
    )
})

const getCategoryController = asynchandler(async (req, res) => {

    const category = await Category.find().sort({ createdAt: -1 })

    if (!category) {
        return res.status(400)
            .json(new ApiResponse(400, category, 'No category found !'))
    }

    return res.status(200)
        .json(new ApiResponse(200, category, 'All categories fetched successfully '))
})

const updateCategoryController = asynchandler(async (req, res) => {
    const { categoryId, name, image } = req.body;

    if (!categoryId || !name || !image) {
        return res.status(400)
            .json(new ApiResponse(400, {}, 'Provide all credentials '))
    }

    if (!categoryId) {

        return res.status(400)
            .json(new ApiResponse(400, {}, 'Provide category Id '))
    }

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
        $set: {
            name: name && name,
            image: image && image
        }
    })

    if (!updatedCategory) {
        return res.status(500)
            .json(new ApiResponse(500, updatedCategory, 'Unable to update category '))
    }


    return res.status(200)
        .json(new ApiResponse(200, updatedCategory, 'Category updated successfully !'))
})

const deleteCategoryController = asynchandler(async (req, res) => {
    const { _id } = req.body;



    if (!_id) {
        return res.status(400)
            .json(new ApiResponse(400, {}, 'Provide category id to delete !'))
    }

    const isInSubCategory = await subCategory.find({
        categoryId: {
            "$in": [_id]
        }
    }).countDocuments()

    const isInProduct = await subCategory.find({
        categoryId: {
            "$in": [_id]
        }
    }).countDocuments()

    if ((isInSubCategory > 0) || (isInProduct > 0)) {

        return res.status(400)
            .json(new ApiResponse(400, {}, 'Category already in use can not delete it !'))
    }


    const deletedCategory = await Category.findOneAndDelete({ _id: _id })

    if (!deletedCategory) {
        return res.status(500)
            .json(new ApiResponse(500, {}, 'Unable to delete category !'))
    }


    return res.status(200)
        .json(new ApiResponse(200, deletedCategory, 'Category deleted successfully'))
})
export {
    AddCategoryController,
    getCategoryController,
    updateCategoryController,
    deleteCategoryController
}