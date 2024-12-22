import { Product } from '../models/product.model.js';
import { subCategory } from '../models/sub_category.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asynchandler } from '../utils/asynchandler.js';

const addSubCategoryController = asynchandler(async (req, res) => {

    const { name, image, category } = req.body;

    if (!name || !image || !category[0]) {
        return res.status(400)
            .json(new ApiResponse(400, {}, "Provide all credentials "))
    }

    const payload = {
        name: name,
        image: image,
        category: [...category]
    }
    const createSubcategory = await subCategory.create(payload)

    if (!createSubcategory) {

        return res.status(500)
            .json(new ApiResponse(500, {}, "Unable to create sub-category"))
    }


    return res.status(200)
        .json(new ApiResponse(200, createSubcategory, "Sub-Category added successfully !"))
})

const getSubCategoryController = asynchandler(async (req, res) => {

    const allSubCategory = await subCategory.find().sort({ _id: -1 }).populate('category');

    if (!allSubCategory) {
        return res.status(500)
            .json(new ApiResponse(500, {}, 'Unable to get subcategory '))
    }

    return res.status(200)
        .json(new ApiResponse(200, allSubCategory, 'All sub categories fetched successfully '))
})

const getSubCategoryByCategoryController = asynchandler(async (req, res) => {
    const { categoryId } = req.body;

    if (!categoryId) {
        return res.status(400)
            .json(new ApiResponse(400, {}, 'Provide category id '))
    }

    const subCat = await subCategory.find({
        category: {
            $in: categoryId
        }
    })

    if (!subCat) {
        return res.status(500)
            .json(new ApiResponse(500, {}, 'Unable to fetch sub category '))
    }
    return res.status(200)
        .json(new ApiResponse(400, subCat, 'Sub category fetched successfully !'))
})

const updateSubCategoryController = asynchandler(async (req, res) => {
    const { _id, name, image, category } = req.body;


    if (!name && !image && !category) {

        return res.status(400)
            .json(new ApiResponse(400, {}, 'Please provide atleast one field to update '))
    }

    const updatedSubCategory = await subCategory.findOneAndUpdate({ _id: _id }, {
        name: name && name,
        image: image && image,
        category: category && category
    })

    if (!updatedSubCategory) {

        return res.status(400)
            .json(new ApiResponse(400, {}, 'Invalid request '))
    }


    return res.status(200)
        .json(new ApiResponse(200, updatedSubCategory, 'Subcategory updated successfully '))
})

const deleteSubCategoryController = asynchandler(async (req, res) => {
    const { _id } = req.body;

    if (!_id) {

        return res.status(400)
            .json(new ApiResponse(400, {}, 'Invalid request '))
    }

    const productCategory = await Product.find({
        subCategory: {
            "$in": [_id]
        }
    })


    if (productCategory[0]) {
        return res.status(400)
            .json(new ApiResponse(400, productCategory, 'Subcategory have product !'))
    }
    const deletedSubCategory = await subCategory.findOneAndDelete({ _id: _id })

    if (!deletedSubCategory) {

        return res.status(400)
            .json(new ApiResponse(400, {}, 'Invalid request '))
    }


    return res.status(200)
        .json(new ApiResponse(200, deletedSubCategory, 'Subcategory deleted successfully !'))
})
export {
    addSubCategoryController,
    getSubCategoryController,
    updateSubCategoryController,
    deleteSubCategoryController,
    getSubCategoryByCategoryController

}