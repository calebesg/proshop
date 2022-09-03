import mongoose from 'mongoose'
import dotenv from 'dotenv'

import connectDB from './config/db'
import users from './data/users'
import products from './data/products'
import User from './models/User'
import Product from './models/Product'
import Order from './models/Order'

dotenv.config()

connectDB()

async function importData() {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('IMPORT DATA!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

async function destroyData() {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('DATA DESTROYED!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
