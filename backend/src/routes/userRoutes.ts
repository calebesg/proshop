import express from 'express'
const routes = express.Router()

import { authUser, getUserProfile } from '../controllers/userController'
import { protect } from '../middleware/authMiddleware'

routes.post('/login', authUser)
routes.get('/profile', protect, getUserProfile)

export default routes
