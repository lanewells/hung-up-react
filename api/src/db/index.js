import mongoose from "mongoose"

const { MONGO_URI } = process.env

export async function connectDB() {
  if (!MONGO_URI) throw new Error("MONGO_URI is missing")
  if (mongoose.connection.readyState === 1) return mongoose.connection
  await mongoose.connect(MONGO_URI)
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
