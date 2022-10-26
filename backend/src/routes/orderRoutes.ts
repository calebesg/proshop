import express from 'express'
const routes = express.Router()

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getOrdersFromLoggedUser,
  getOrders,
} from '../controllers/orderController'
import { protect, admin } from '../middleware/authMiddleware'

routes.post('/', protect, addOrderItems)
routes.get('/', protect, admin, getOrders)
routes.get('/myorders', protect, getOrdersFromLoggedUser)
routes.get('/:id', protect, getOrderById)
routes.put('/:id/pay', protect, updateOrderToPaid)

export default routes
