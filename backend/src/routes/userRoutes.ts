import express from 'express'
const routes = express.Router()

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
} from '../controllers/userController'

import { protect, admin } from '../middleware/authMiddleware'

routes.post('/', registerUser)
routes.get('/', protect, admin, getUsers)
routes.get('/:id', protect, admin, getUserById)
routes.post('/login', authUser)
routes.get('/profile', protect, getUserProfile)
routes.put('/profile', protect, updateUserProfile)
routes.delete('/:id', protect, deleteUser)

export default routes
