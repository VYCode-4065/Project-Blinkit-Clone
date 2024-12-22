import { Router } from 'express'
import { AddProductController, deleteProductController, getProductByCategoryAndSubCategoryController, getProductByCategoryController, getProductByIdController, getProductControler, updateProductController } from '../controllers/products.controller.js'
import { AuthenticatedUser } from '../middleware/auth.middleware.js'

const productRouter = Router()

productRouter.post('/create', AuthenticatedUser, AddProductController);
productRouter.post('/get', getProductControler);
productRouter.post('/get-by-id', getProductByIdController)
productRouter.post('/get-by-category', getProductByCategoryController);
productRouter.post('/get-by-cat-subcat', getProductByCategoryAndSubCategoryController);
productRouter.put('/update', updateProductController);
productRouter.delete('/delete', deleteProductController);


export default productRouter;