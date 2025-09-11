import "dotenv/config"
import { connectDB, disconnectDB } from "../src/db/index.js"
import Clothing from "../src/models/Clothing.js"

async function main() {
  await connectDB()
  console.log("Seeding clothes...")

  await Clothing.deleteMany({})

  const clothes = await Clothing.insertMany([
    {
      name: "Cream turtleneck sweater",
      imageUrl: "/placeholder-img.jpg",
      type: "Sweaters",
      subtype: "Turtleneck",
      colors: ["Cream"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 5,
        warmth: 3
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Green baseball hat",
      imageUrl: "/placeholder-img.jpg",
      type: "Hats",
      subtype: "Baseball",
      colors: ["Green"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 4,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Camel corduroy overalls",
      imageUrl: "/placeholder-img.jpg",
      type: "Overalls",
      subtype: "Corduroy",
      colors: ["Camel"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 3,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Grey oxfords",
      imageUrl: "/placeholder-img.jpg",
      type: "Specialty Shoes",
      subtype: "Oxfords",
      colors: ["Grey"],
      size: "8",
      ratings: {
        comfort: 4,
        confidence: 3,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: true
    }
  ])

  console.log(`Added ${clothes.length} clothes documents`)

  await disconnectDB()
}

main().catch((err) => {
  console.error("Clothes seed error:", err)
  process.exit(1)
})
