import { Request, Response } from 'express'
import Product from '../models/Product'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find({})
  res.json(products)
}

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req: Request, res: Response) => {
  const id = req.params.id
  const product = await Product.findById(id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  res.json(product)
}

export { getProducts, getProductById }
