import mongoose from "mongoose"

const { MONGODB_URI } = process.env

export async function connectDB() {
  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing")
  if (mongoose.connection.readyState === 1) return mongoose.connection
  await mongoose.connect(MONGODB_URI)
  console.log("Mongo connected")
  return mongoose.connection
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
    console.log("Mongo disconnected")
  }
}

export { mongoose }
