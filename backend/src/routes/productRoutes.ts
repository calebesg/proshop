import express from 'express'
const routes = express.Router()

import { getProductById, getProducts } from '../controllers/productController'

routes.get('/', getProducts)
routes.get('/:id', getProductById)

export default routes
