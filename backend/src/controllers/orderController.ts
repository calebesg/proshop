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
    return
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

export { addOrderItems }
