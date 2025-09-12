import "dotenv/config"
import { connectDB, disconnectDB } from "../src/db/index.js"
import Type from "../src/models/Type.js"

async function main() {
  await connectDB()
  console.log("Seeding: types…")

  await Type.deleteMany({})
  const types = await Type.insertMany([
    {
      name: "Shorts",
      subtypes: [
        "Bermuda",
        "Denim",
        "Athletic",
        "Spandex",
        "High-waisted",
        "Low-rise"
      ],
      drawer: "Bottoms",
      sufficient: false,
      necessity: 1
    },
    {
      name: "Pants",
      subtypes: ["Jeans", "Chinos", "Cargo", "Joggers", "Leggings"],
      drawer: "Bottoms",
      sufficient: false,
      necessity: 1
    },
    {
      name: "Skirts",
      subtypes: ["Mini", "Tennis", "Maxi", "Skort", "A-line"],
      drawer: "Bottoms",
      sufficient: false,
      necessity: 1
    },
    {
      name: "Tees",
      subtypes: ["Graphic", "V-neck", "Crewneck", "Long sleeve", "Crop"],
      drawer: "Tops",
      sufficient: false,
      necessity: 1
    },
    {
      name: "Blouses",
      subtypes: ["Button-down", "Peplum", "Wrap", "Sleeveless", "Ruffle"],
      drawer: "Tops",
      sufficient: false,
      necessity: 1
    },
    {
      name: "Tanks",
      subtypes: ["Halter", "Racerback", "Muscle", "Spaghetti strap"],
      drawer: "Tops",
      sufficient: false,
      necessity: 1
    },
    {
      name: "Sweaters",
      subtypes: ["Cardigan", "Pullover", "Turtleneck", "Crewneck"],
      drawer: "Tops",
      sufficient: false,
      necessity: 2
    },
    {
      name: "Dresses",
      subtypes: ["Shift", "Ruffle", "Little black", "Bodycon", "Slip"],
      drawer: "One-pieces",
      sufficient: true,
      necessity: 1
    },
    {
      name: "Jumpsuits",
      subtypes: ["Romper", "Professional", "Utility", "Wide leg"],
      drawer: "One-pieces",
      sufficient: true,
      necessity: 1
    },
    {
      name: "Overalls",
      subtypes: ["Denim", "Corduroy", "Shortalls"],
      drawer: "One-pieces",
      sufficient: false,
      necessity: 1
    },
    {
      name: "Sneakers",
      subtypes: ["Low-top", "High-top", "Slip-on", "Running"],
      drawer: "Shoes",
      sufficient: false,
      necessity: 1
    },
    {
      name: "Boots",
      subtypes: ["Snow", "Knee-high", "Steel-toed", "Cowboy"],
      drawer: "Shoes",
      sufficient: false,
      necessity: 1
    },
    {
      name: "Shoes",
      subtypes: ["Crocs", "Platforms", "Heels", "Oxfords"],
      drawer: "Shoes",
      sufficient: false,
      necessity: 1
    },
    {
      name: "Sandals",
      subtypes: ["Slides", "Birks", "Flip-flops", "Espadrilles"],
      drawer: "Shoes",
      sufficient: false,
      necessity: 1
    },
    {
      name: "Hats",
      subtypes: ["Baseball", "Beanie", "Visor", "Bucket"],
      drawer: "Accessories",
      sufficient: false,
      necessity: 3
    },
    {
      name: "Belts",
      subtypes: ["Leather", "Canvas", "Braided", "Buckled"],
      drawer: "Accessories",
      sufficient: false,
      necessity: 3
    },
    {
      name: "Coats",
      subtypes: ["Trench", "Puffer", "Peacoat", "Parka", "Snow"],
      drawer: "Outerwear",
      sufficient: false,
      necessity: 3
    },
    {
      name: "Jackets",
      subtypes: ["Bomber", "Jean", "Blazer", "Windbreaker", "Leather"],
      drawer: "Outerwear",
      sufficient: false,
      necessity: 3
    },
    {
      name: "Gloves",
      subtypes: ["Leather", "Wool", "Work", "Snow"],
      drawer: "Outerwear",
      sufficient: false,
      necessity: 3
    },
    {
      name: "Vests",
      subtypes: ["Puffer", "Denim", "Utility", "Quilted"],
      drawer: "Outerwear",
      sufficient: false,
      necessity: 3
    }
  ])

  console.log(`Types inserted: ${types.length}`)
  await disconnectDB()
}

main().catch((e) => {
  console.error("Seed-types error:", e)
  process.exit(1)
})
