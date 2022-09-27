import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/Order'

// @desc    Create new Order
// @route   POST /api/orders
// @access  Pivate
const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  const {
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  }

  const order = new Order({
    orderItems,
    user: user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  })

  const createdOrder = await order.save()

  res.status(201).json(createdOrder)
})

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Pivate
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  res.json(order)
})

export { addOrderItems, getOrderById }
