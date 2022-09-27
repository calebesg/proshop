import express from 'express'
const routes = express.Router()

import { addOrderItems, getOrderById } from '../controllers/orderController'
import { protect } from '../middleware/authMiddleware'

routes.post('/', protect, addOrderItems)
routes.get('/:id', protect, getOrderById)

export default routes
