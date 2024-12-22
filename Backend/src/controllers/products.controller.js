import { asynchandler } from '../utils/asynchandler.js'
import { Product } from '../models/product.model.js'
import { ApiResponse } from '../utils/ApiResponse.js';

const AddProductController = asynchandler(async (req, res) => {

    const { name, image, category_id, subCategory, unit, stock, price, discount, description, more_details, publish } = req.body;

    if (!name || !image || !category_id || !subCategory || !unit || !stock || !price || !description) {
        return res.status(400)
            .json(new ApiResponse(400, {}, "Privide all details "));
    }

    const payload = {
        name,
        image,
        category_id,
        subCategory,
        unit,
        stock,
        price,
        discount,
        description,
        more_details,
        publish
    }

    const newProduct = await Product.create(payload);

    if (!newProduct) {
        return res.status(400)
            .json(new ApiResponse(400, {}, 'Unable to add product '))
    }


    return res.status(200)
        .json(new ApiResponse(200, newProduct, 'Product added successfully!'))
})


const getProductControler = asynchandler(async (req, res) => {
    let { page, limit, search } = req.body;

    if (!page) {
        page = 1;
    }
    if (!limit) {
        limit = 10;
    }
    const startIndex = (page - 1) * limit;

    const query = search ? {
        $text: {
            $search: search
        }
    } : {};

    const [data, totalCount] = await Promise.all([
        Product.find(query).sort({ createdAt: -1 }).skip(startIndex).limit(limit),
        Product.countDocuments(query),
    ])

    if (!data) {
        return res.status(500)
            .json(new ApiResponse(500, {}, 'Unable to get products '))
    }

    return res.status(200)
        .json(new ApiResponse(200, {
            data,
            totalPage: Math.ceil(totalCount / limit)
        }, "Product Details fetched successfully"))
})

const getProductByCategoryController = asynchandler(async (req, res) => {

    const { id } = req.body;

    if (!id) {
        return res.status(400)
            .json(new ApiResponse(400, {}, "Provide category id "))
    }

    const productByCategory = await Product.find({
        category_id: {
            $in: id
        }
    });

    if (!productByCategory) {
        return res.status(500)
            .json(new ApiResponse(500, {}, "Unable to get product at this moment !"))
    }

    return res.status(200)
        .json(new ApiResponse(200, productByCategory, "Product fetched successfully !"))
})

const getProductByCategoryAndSubCategoryController = asynchandler(async (req, res) => {

    let { subCat, cat, page, limit } = req.body;


    if (!subCat || !cat) {
        return res.status(400)
            .json(new ApiResponse(200, {}, "Insufficient credential !"))
    }

    if (!page) {
        page = 1;
    }

    if (!limit) {

        limit = 12;
    }

    const skip = (page - 1) * limit;
    const query = {
        $and: [
            {
                category_id: {
                    $in: cat
                }
            },
            {
                subCategory: {
                    $in: subCat
                }
            }
        ]
    }
    const [product, totalCount] = await Promise.all([
        Product.find(query).skip(skip).limit(limit),
        Product.countDocuments(query)
    ])

    if (!product) {
        return res.status(402, {}, "Incorrect credential ")
    }

    return res.status(200)
        .json(new ApiResponse(200, { product, totalCount, page, limit }, "Product fetched successfully !"))
})

const getProductByIdController = asynchandler(async (req, res) => {

    const { _id } = req.body;

    if (!_id) {
        return res.status(400)
            .json(new ApiResponse(400, {}, "Provide product id !"))
    }

    const product = await Product.findById(_id);

    if (!product) {
        return res.status(500)
            .json(new ApiResponse(500, {}, "Unable to fetch product details !"))
    }

    return res.json(new ApiResponse(200, product, "Product details fetched successfully !"))
})

const updateProductController = asynchandler(async (req, res) => {

    const { _id, name, image, category_id, subCategory, unit, stock, price, discount, description } = req.body;

    if (!_id) {
        return res.status(400)
            .json(new ApiResponse(400, {}, "Unauthorized access "))
    }

    if (!name || !image || !category_id || !subCategory || !unit || !stock || !price || !description) {
        return res.status(400)
            .json(new ApiResponse(400, {}, "Privide at least one field to update "));
    }

    const updatedProduct = await Product.findOneAndUpdate({ _id: _id }, {
        $set: {

            name: name,
            image: image,
            category_id: category_id,
            subCategory: subCategory,
            unit: unit,
            stock: stock,
            discount: discount,
            description: description

        }
    })

    if (!updatedProduct) {
        return res.status(500)
            .json(new ApiResponse(500, {}, "Unable to update product"))
    }

    return res.status(200)
        .json(new ApiResponse(200, updatedProduct, "Product details updated successfully !"))

})

const deleteProductController = asynchandler(async (req, res) => {

    const { _id } = req.body;
    if (!_id) {
        return res.status(400)
            .json(new ApiResponse(400, {}, "Unauthorized access "))
    }

    const deletedProduct = await Product.findByIdAndDelete(_id);

    if (!deletedProduct) {
        return res.status(500)
            .json(new ApiResponse(500, {}, "Unable to delete product"));
    }

    return res.status(200)
        .json(new ApiResponse(200, deletedProduct, "Product deleted successfully "))

})
export {
    AddProductController,
    getProductControler,
    updateProductController,
    deleteProductController,
    getProductByCategoryController,
    getProductByCategoryAndSubCategoryController,
    getProductByIdController
}