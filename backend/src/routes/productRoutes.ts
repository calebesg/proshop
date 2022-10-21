import express from 'express'
const routes = express.Router()

import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../controllers/productController'
import { protect, admin } from '../middleware/authMiddleware'

routes.get('/', getProducts)
routes.post('/', protect, admin, createProduct)
routes.get('/:id', getProductById)
routes.delete('/:id', protect, admin, deleteProduct)
routes.put('/:id', protect, admin, updateProduct)

export default routes
