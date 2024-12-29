import { cartProduct } from "../models/cartProduct.model.js";
import { User } from '../models/user.model.js'
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from '../utils/asynchandler.js'

const addCartProductController = asynchandler(async (req, res) => {

    const user = req.user;

    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json(new ApiResponse(400, {}, "Provide product id "))
    }

    const payload = {
        productId: productId,
        quantity: 1,
        userId: user._id
    }

    const existedProduct = await cartProduct.findOne({ productId: productId }, { userId: user?._id })

    if (existedProduct) {
        return res.status(400).json(new ApiResponse(400, {}, "Product already in cart "))
    }
    const newCartProduct = await cartProduct.create(payload)

    if (!newCartProduct) {
        return res.status(500).json(new ApiResponse(500, {}, "Unable to add product in cart at this moment"))
    }

    const shopingCartUser = await User.updateOne({ _id: user._id }, {
        $push: {
            shopping_cart: productId
        }
    })

    return res.json(new ApiResponse(200, newCartProduct, "Product added successfully !"))
})

const getCartProductController = asynchandler(async (req, res) => {
    const userId = req?.user?._id

    if (!userId) {
        return res.status(400).json(400, {}, "Login first to see you cart !")
    }
    const cartproduct = (await cartProduct.find({ userId: userId }).populate('productId'))

    return res.json(new ApiResponse(200, cartproduct, 'cart product fetched !'))
})

const updateCartProductQtyController = asynchandler(async (req, res) => {

    const { _id, quantity } = req.body;

    if (!_id || !quantity) {
        return res.status(400).json(new ApiResponse(400, {}, "Provide all details "))
    }

    const updatedCartProduct = await cartProduct.updateOne({ _id: _id }, {
        quantity: quantity
    })

    return res.json(new ApiResponse(200, updatedCartProduct, "Quantity updated successfully !"))
})

const deleteCartProductController = asynchandler(async (req, res) => {

    const user = req.user;
    const { _id } = req.body;

    if (!_id) {
        return res.status(400).json(new ApiResponse(400, {}, "Provide id to delete "))
    }

    const deleteFromCart = await cartProduct.deleteOne({ _id: _id, userId: user?._id });


    const deleteFromUserShoppingCart = await User.updateOne({ _id: user?._id }, {
        $pull: {
            shopping_cart: deleteFromCart?.productId?._id
        }
    })

    return res.json(new ApiResponse(200, deleteFromCart, "Product from from cart successfully !"))
})

export {
    addCartProductController,
    getCartProductController,
    updateCartProductQtyController,
    deleteCartProductController
}