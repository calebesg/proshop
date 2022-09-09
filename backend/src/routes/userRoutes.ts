import express from 'express'
const routes = express.Router()

import { authUser } from '../controllers/userController'

routes.post('/login', authUser)

export default routes
