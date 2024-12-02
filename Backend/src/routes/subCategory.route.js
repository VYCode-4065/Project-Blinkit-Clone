import { Router } from 'express'
import { AuthenticatedUser } from '../middleware/auth.middleware.js'
import { addSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from '../controllers/subcategory.controller.js';

const subCategoryRouter = Router()

subCategoryRouter.post('/create', AuthenticatedUser, addSubCategoryController)
subCategoryRouter.get('/get', AuthenticatedUser, getSubCategoryController)
subCategoryRouter.put('/update', AuthenticatedUser, updateSubCategoryController)
subCategoryRouter.delete('/delete', AuthenticatedUser, deleteSubCategoryController)

export default subCategoryRouter;