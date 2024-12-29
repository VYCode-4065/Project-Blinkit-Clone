import { Order } from '../models/order.model.js'
import { User } from '../models/user.model.js'
import { cartProduct } from '../models/cartProduct.model.js'
import { asynchandler } from '../utils/asynchandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import mongoose from 'mongoose'

const CashOnDeliveryOrderController = asynchandler(async (req, res) => {

    const userId = req.user?._id;

    const { list_items, totalPrice, subTotalPrice, addressId } = req.body;

    if (!list_items || !totalPrice || !addressId) {
        return res.status(400).json(new ApiResponse(400, {}, "Provide list_item totalprice and address"))
    }

    const payload = list_items?.map(el => {
        return {
            userId: userId,
            product_details: {
                name: el?.productId?.name,
                image: el?.productId?.image,
            },
            orderId: `ORD-${new mongoose.Types.ObjectId()}`,
            totalAmt: totalPrice,
            subTotalAmt: subTotalPrice,
            delivery_address: addressId,
            paymentId: '',
            paymentStatus: 'COD'
        }
    })

    const generateOrder = await Order.insertMany(payload)

    const removeFromCart = await cartProduct.deleteMany({ userId: userId })

    const updateUserShoppingCart = await User.updateOne({ _id: userId }, {
        shopping_cart: []
    })

    return res.json(new ApiResponse(200, generateOrder, "Order placed successfully "))
})

const pricewithdiscount = (price, dis) => {
    let actualAmt = Number(price);


    if (Number(dis) !== 0) {

        const discountAmt = Math.ceil((Number(price) * Number(dis)) / 100);
        actualAmt = Number(price) - discountAmt;
    }
    return actualAmt;
}





export {
    CashOnDeliveryOrderController,
}