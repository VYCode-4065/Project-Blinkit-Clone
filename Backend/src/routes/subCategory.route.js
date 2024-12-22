import { Router } from 'express'
import { AuthenticatedUser } from '../middleware/auth.middleware.js'
import { addSubCategoryController, deleteSubCategoryController, getSubCategoryByCategoryController, getSubCategoryController, updateSubCategoryController } from '../controllers/subcategory.controller.js';

const subCategoryRouter = Router()

subCategoryRouter.post('/create', AuthenticatedUser, addSubCategoryController)
subCategoryRouter.get('/get', getSubCategoryController)
subCategoryRouter.post('/get-by-cat', getSubCategoryByCategoryController)
subCategoryRouter.put('/update', AuthenticatedUser, updateSubCategoryController)
subCategoryRouter.delete('/delete', AuthenticatedUser, deleteSubCategoryController)

export default subCategoryRouter;