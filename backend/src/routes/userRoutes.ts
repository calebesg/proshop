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
  updateUser,
} from '../controllers/userController'

import { protect, admin } from '../middleware/authMiddleware'

routes.post('/', registerUser)
routes.get('/', protect, admin, getUsers)
routes.delete('/:id', protect, deleteUser)
routes.get('/:id', protect, admin, getUserById)
routes.put('/:id', protect, admin, updateUser)

routes.post('/login', authUser)

routes.get('/profile', protect, getUserProfile)
routes.put('/profile', protect, updateUserProfile)

export default routes
