import express from 'express'
const routes = express.Router()

import {
  getProductById,
  getProducts,
  deleteProduct,
} from '../controllers/productController'
import { protect, admin } from '../middleware/authMiddleware'

routes.get('/', getProducts)
routes.get('/:id', getProductById)
routes.delete('/:id', protect, admin, deleteProduct)

export default routes
