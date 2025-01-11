import { Order } from '../models/order.model.js'
import { User } from '../models/user.model.js'
import { cartProduct } from '../models/cartProduct.model.js'
import { asynchandler } from '../utils/asynchandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import mongoose from 'mongoose'
import StripeValue from '../utils/Stripe.js'


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

const OnlinePaymentOrderController = asynchandler(async (req, res) => {

    try {
        const userValue = req?.user; // auth middleware 


        const { list_items, totalAmt, addressId, subTotalAmt } = req.body


        const line_items = list_items.map(item => {
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.productId?.name,
                        images: item.productId.image,
                        metadata: {
                            productId: item.productId?._id
                        }
                    },
                    unit_amount: pricewithdiscount(item.productId.price, item.productId.discount) * 100
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                },
                quantity: item.quantity
            }
        })



        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            customer_email: userValue.email,
            metadata: {
                userId: userValue?._id?.toString(),
                addressId: addressId,
                productId: line_items?.toString(),
            },
            line_items: line_items,
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        }

        const session = await StripeValue.checkout.sessions.create(params)

        return res.status(200).json(session)

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
})

const getOrderProductItems = async ({ lineItems, userId, addressId, paymentId, payment_status }) => {
    const productItems = lineItems.data.map(item => {
        return {
            // userId: userId,
            product_details: {
                userId: userId,
                name: item.description,
                image: item?.images
            },
            orderId: `ORD-${new mongoose.Types.ObjectId()}`,
            totalAmt: item.amount_total / 100,
            subTotalAmt: item.amount_subtotal / 100,
            delivery_address: addressId,
            paymentId: paymentId,
            paymentStatus: payment_status
        }
    })

    return productItems;
}

const WebhookStripe = asynchandler(async (req, res) => {
    const event = req.body;
    console.log(event);


    const endPoint = process.env.WEBHOOK_SECRET_KEY;

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const lineItems = await StripeValue.checkout.sessions.listLineItems(session.id)


            console.log(lineItems.price_data.product_data.metadata);

            const userId = session?.metadata?.userId


            const orderProduct = await getOrderProductItems(
                {
                    lineItems: lineItems,
                    userId: userId,
                    addressId: session.metadata.addressId,
                    paymentId: session.payment_intent,
                    payment_status: session.payment_status,
                })

            const order = await Order.insertMany(orderProduct)

            if (Boolean(order)) {
                const removeCartItems = await User.findByIdAndUpdate(userId, {
                    shopping_cart: []
                })
                const removeCartProductDB = await cartProduct.deleteMany({ userId: userId })
            }
            break;



        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
})

const getOrderDetailsController = asynchandler(async (req, res) => {
    try {
        const userId = req.userId // order id

        const orderlist = await Order.find({ userId: userId }).sort({ createdAt: -1 }).populate('delivery_address')

        return res.json({
            message: "order list",
            data: orderlist,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
})


export {
    CashOnDeliveryOrderController,
    OnlinePaymentOrderController,
    WebhookStripe,
    getOrderDetailsController
}


