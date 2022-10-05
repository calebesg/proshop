import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import User from '../models/User'

interface JwtUser extends JwtPayload {
  id: string
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization

    if (!auth || !auth.startsWith('Bearer')) {
      throw new Error('Not authorized!')
    }

    try {
      const token = auth?.split(' ')[1] as string
      const secret = process.env.TOKEN_SECRET as string

      const decoded = jwt.verify(token, secret) as JwtUser

      const user = await User.findById(decoded.id).select('-password')

      req.body = { ...req.body, user }

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized!')
    }
  }
)

const admin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.user || !req.body.user.isAdmin) {
      res.status(401)
      throw new Error('Not authorized as an admin')
    }

    next()
  }
)

export { protect, admin }
