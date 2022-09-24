import express from 'express'
const routes = express.Router()

import { addOrderItems } from '../controllers/orderController'
import { protect } from '../middleware/authMiddleware'

routes.post('/', protect, addOrderItems)

export default routes
