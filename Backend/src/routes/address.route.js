import { Router } from 'express'
import { AuthenticatedUser } from '../middleware/auth.middleware.js'
import { addAddressController, deleteAddressController, getAddressController, updateAddressController } from '../controllers/address.controller.js'

const addressRouter = Router()

addressRouter.post('/create', AuthenticatedUser, addAddressController)
addressRouter.get('/get', AuthenticatedUser, getAddressController)
addressRouter.put('/update', AuthenticatedUser, updateAddressController)
addressRouter.delete('/delete', AuthenticatedUser, deleteAddressController)

export default addressRouter