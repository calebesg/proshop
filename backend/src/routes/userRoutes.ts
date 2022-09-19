import express from 'express'
const routes = express.Router()

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController'
import { protect } from '../middleware/authMiddleware'

routes.post('/', registerUser)
routes.post('/login', authUser)
routes.get('/profile', protect, getUserProfile)
routes.put('/profile', protect, updateUserProfile)

export default routes
