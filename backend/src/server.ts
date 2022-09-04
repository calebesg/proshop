import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import connectDB from './config/db'
import productRoutes from './routes/productRoutes'

dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('API running...')
})

app.get('/api/products', productRoutes)

app.listen(3333, () => console.log('SERVER RUNNING: POST 3333'))
