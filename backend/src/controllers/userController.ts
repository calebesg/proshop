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
  const user = await User.findById(req.body.user._id)

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

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.body.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User Not Found!')
  }

  user.name = req.body.name || user.name
  user.email = req.body.email || user.email

  if (req.body.password) {
    user.password = req.body.password
  }

  const updatedUser = await user.save()

  const token = generateToken(String(updatedUser._id))

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token,
  })
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user by id
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found!')
  }

  await user.remove()

  res.status(204).send()
})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-password')

  if (!user) {
    res.status(404)
    throw new Error('User not found!')
  }

  res.json(user)
})

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
}
