import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import products from './data/products'
import connectDB from './config/db'

dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('API running...')
})

app.get('/api/product', (req, res) => {
  res.json(products)
})

app.get('/api/product/:id', (req, res) => {
  const id = req.params.id
  const product = products.find(item => item._id === id)
  res.json(product)
})

app.listen(3333, () => console.log('SERVER RUNNING: POST 3333'))
