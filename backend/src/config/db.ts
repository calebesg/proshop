import mongoose from 'mongoose'

async function connectDB() {
  try {
    const uriConnection = process.env.MONGODB_URI as string

    const db = await mongoose.connect(uriConnection)
    console.log(`${db.connection.host}`)
  } catch (error) {
    console.warn(`${error}`)
    process.exit(1)
  }
}

export default connectDB
