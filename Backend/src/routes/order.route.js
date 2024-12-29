import { Router } from 'express'
import { AuthenticatedUser } from '../middleware/auth.middleware.js'
import { CashOnDeliveryOrderController } from '../controllers/order.controller.js'

const orderRouter = Router()

orderRouter.post('/cash-on-delivery', AuthenticatedUser, CashOnDeliveryOrderController)

export default orderRouter