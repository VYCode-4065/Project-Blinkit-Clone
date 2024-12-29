import { Router } from 'express'
import { AuthenticatedUser } from '../middleware/auth.middleware.js';
import { addCartProductController, deleteCartProductController, getCartProductController, updateCartProductQtyController } from '../controllers/cart.controller.js';

const cartRouter = Router()

cartRouter.post('/create', AuthenticatedUser, addCartProductController)
cartRouter.get('/get', AuthenticatedUser, getCartProductController)
cartRouter.put('/update-qty', AuthenticatedUser, updateCartProductQtyController)
cartRouter.delete('/delete', AuthenticatedUser, deleteCartProductController)

export default cartRouter;