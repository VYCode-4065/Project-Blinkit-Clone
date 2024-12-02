import express, { Router } from 'express'
import { AddCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from '../controllers/category.controller.js';
import { AuthenticatedUser } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js'
import multer from 'multer';
import uploadImage from '../utils/uploadImage.js';


const categoryRouter = Router();

categoryRouter.post('/add-category', AuthenticatedUser, AddCategoryController)
categoryRouter.get('/get-category', AuthenticatedUser, getCategoryController)
categoryRouter.put('/update-category', AuthenticatedUser, updateCategoryController)
categoryRouter.delete('/delete-category', AuthenticatedUser, deleteCategoryController)


export default categoryRouter;