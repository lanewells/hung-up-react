import "dotenv/config"
import { connectDB, disconnectDB } from "../src/db/index.js"
import Type from "../src/models/Type.js"

async function main() {
  await connectDB()
  console.log("Seeding types...")

  await Type.deleteMany({})

  const types = await Type.insertMany([
    {
      type: "Sweaters",
      subtypes: ["Cardigan", "Pullover", "Turtleneck", "Crewneck"],
      category: "Tops",
      sufficient: false,
      necessity: 2,
      clothing: sweaters
    },
    {
      type: "Hats",
      subtypes: ["Baseball", "Beanie", "Visor", "Bucket"],
      category: "Accessories",
      sufficient: false,
      necessity: 3,
      clothing: hats
    },
    {
      type: "Overalls",
      subtypes: ["Denim", "Corduroy", "Shortalls"],
      category: "One-pieces",
      sufficient: true,
      necessity: 2,
      clothing: overalls
    },
    {
      type: "Specialty Shoes",
      subtypes: ["Crocs", "Platforms", "Heels", "Oxfords"],
      category: "Shoes",
      sufficient: false,
      necessity: 1,
      clothing: specialtyShoes
    }
  ])

  console.log(`Added ${types.length} types documents`)

  await disconnectDB()
}

main().catch((err) => {
  console.error("Types seed error:", err)
  process.exit(1)
})
