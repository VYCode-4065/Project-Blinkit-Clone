import { Router } from 'express'
import { AuthenticatedUser } from '../middleware/auth.middleware.js'
import { CashOnDeliveryOrderController, getOrderDetailsController, OnlinePaymentOrderController, WebhookStripe } from '../controllers/order.controller.js'

const orderRouter = Router()

orderRouter.post('/cash-on-delivery', AuthenticatedUser, CashOnDeliveryOrderController)
orderRouter.post('/online-payment', AuthenticatedUser, OnlinePaymentOrderController)
orderRouter.post('/webhook', WebhookStripe)
orderRouter.get('/order-list', AuthenticatedUser, getOrderDetailsController)
export default orderRouter