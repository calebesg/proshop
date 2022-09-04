import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/Product'

const routes = express.Router()

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
routes.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
routes.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id)

    if (!product) {
      res.status(404)
      throw new Error('Product not found')
    }

    res.json(product)
  })
)

export default routes
