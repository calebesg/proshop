import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/Product'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const products = await Product.find({ ...keyword })

  res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id
  const product = await Product.findById(id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  res.json(product)
})

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id
  const product = await Product.findById(id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  await product.remove()

  res.status(204).send()
})

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.body.user._id,
    image: '/image/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()

  res.status(201).json(createdProduct)
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found!')
  }

  product.name = name
  product.price = price
  product.image = image
  product.band = brand
  product.category = category
  product.countInStock = countInStock
  product.numReviews = numReviews
  product.description = description

  const updatedProduct = await product.save()

  res.json(updatedProduct)
})

// @desc    Create product review
// @route   POST /api/products/:id/review
// @access  Private/Admin
const createProductReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(404)
      throw new Error('Product not found!')
    }

    const alreadyReviewed = product.reviews.find(
      r => r.user?.toString() === req.body.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed!')
    }

    const review = {
      name: req.body.user.name,
      rating: +rating,
      comment,
      user: req.body.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()

    res.status(201).send()
  }
)

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
}
