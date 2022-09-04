import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import connectDB from './config/db'
import productRoutes from './routes/productRoutes'
import { errorHandler, notFound } from './middleware/errorMiddleware'

dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.use('/api/products', productRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(3333, () => console.log('SERVER RUNNING: PORT 3333'))
