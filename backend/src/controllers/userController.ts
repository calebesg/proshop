import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import User from '../models/User'
import generateToken from '../utils/generateToken'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(String(user._id))

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    })
  }

  res.status(401)
  throw new Error('Invalid email or password')
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('User already exists!')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (!user?.name) {
    res.status(400)
    throw new Error('Invalid user data!')
  }

  const token = generateToken(String(user._id))

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  })
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.body._id)

  if (!user) {
    res.status(404)
    throw new Error('User Not Found!')
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  })
})

export { authUser, getUserProfile, registerUser }
