import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import connectDB from './config/db'
import productRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoutes'
import orderRoutes from './routes/orderRoutes'
import { errorHandler, notFound } from './middleware/errorMiddleware'

dotenv.config() //uPDATE

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(3333, () => console.log('SERVER RUNNING: PORT 3333'))
