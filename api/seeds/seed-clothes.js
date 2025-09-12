import "dotenv/config"
import { connectDB, disconnectDB } from "../src/db/index.js"
import Type from "../src/models/Type.js"
import Clothing from "../src/models/Clothing.js"

async function main() {
  await connectDB()
  console.log("Seeding: clothes…")

  const allTypes = await Type.find()
  console.log("Type docs found:", allTypes.length)
  const typeMap = Object.fromEntries(allTypes.map((t) => [t.name, t._id]))
  console.log(typeMap)

  const neededTypes = [
    "Shorts",
    "Pants",
    "Skirts",
    "Tees",
    "Blouses",
    "Tanks",
    "Sweaters",
    "Dresses",
    "Jumpsuits",
    "Overalls",
    "Sneakers",
    "Boots",
    "Shoes",
    "Sandals",
    "Hats",
    "Belts",
    "Coats",
    "Jackets",
    "Gloves",
    "Vests"
  ]
  const missing = neededTypes.filter((n) => !typeMap[n])

  if (missing.length) {
    console.error("Missing Type(s):", missing)
    console.error("Available Type names:", allTypes.map((t) => t.name).sort())
    process.exit(1)
  }

  await Clothing.deleteMany({})
  const clothes = await Clothing.insertMany([
    {
      name: "Orange drawstring shorts",
      type: typeMap["Shorts"],
      imageUrl: "/placeholder-img.jpg",
      subtype: "Bermuda",
      colors: ["Orange"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 5,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Light wash jean shorts",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Shorts"],
      subtype: "Denim",
      colors: ["Blue"],
      size: "S",
      ratings: {
        comfort: 2,
        confidence: 4,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Blue running shorts",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Shorts"],
      subtype: "Athletic",
      colors: ["Blue"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 5,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Black spandex shorts",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Shorts"],
      subtype: "Spandex",
      colors: ["Black"],
      size: "S",
      ratings: {
        comfort: 4,
        confidence: 5,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Low-rise blue shorts",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Shorts"],
      subtype: "Low-rise",
      colors: ["Blue"],
      size: "S",
      ratings: {
        comfort: 2,
        confidence: 3,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "High-waisted white shorts",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Shorts"],
      subtype: "High-waisted",
      colors: ["White"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 4,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Blue jeans",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Pants"],
      subtype: "Jeans",
      colors: ["Blue"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 2,
        warmth: 3
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Khaki chinos",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Pants"],
      subtype: "Chinos",
      colors: ["Khaki"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 3,
        warmth: 3
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Olive cargo pants",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Pants"],
      subtype: "Cargo",
      colors: ["Olive"],
      size: "L",
      ratings: {
        comfort: 2,
        confidence: 5,
        warmth: 3
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Grey joggers",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Pants"],
      subtype: "Joggers",
      colors: ["Grey"],
      size: "L",
      ratings: {
        comfort: 5,
        confidence: 4,
        warmth: 3
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Grey leggings",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Pants"],
      subtype: "Leggings",
      colors: ["Grey"],
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
      name: "Pink mini skirt",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Skirts"],
      subtype: "Mini",
      colors: ["Pink"],
      size: "S",
      ratings: {
        comfort: 3,
        confidence: 3,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Black tennis skirt",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Skirts"],
      subtype: "Tennis",
      colors: ["Black"],
      size: "S",
      ratings: {
        comfort: 4,
        confidence: 3,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Brown maxi skirt",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Skirts"],
      subtype: "Maxi",
      colors: ["Brown"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 4,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Blue A-line skirt",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Skirts"],
      subtype: "A-line",
      colors: ["Blue"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 4,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Yellow skort",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Skirts"],
      subtype: "Skort",
      colors: ["Yellow"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 4,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "White graphic tee",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Tees"],
      subtype: "Graphic",
      colors: ["White"],
      size: "M",
      ratings: {
        comfort: 2,
        confidence: 4,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Red v-neck tee",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Tees"],
      subtype: "V-neck",
      colors: ["Red"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 4,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Teal crewneck tee",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Tees"],
      subtype: "Crewneck",
      colors: ["Teal"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 4,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Blue long sleeve tee",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Tees"],
      subtype: "Long sleeve",
      colors: ["Blue"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 4,
        warmth: 3
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "White button-down blouse",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Blouses"],
      subtype: "Button-down",
      colors: ["White"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 5,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Purple peplum blouse",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Blouses"],
      subtype: "Peplum",
      colors: ["Purple"],
      size: "M",
      ratings: {
        comfort: 1,
        confidence: 3,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Mauve wrap blouse",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Blouses"],
      subtype: "Wrap",
      colors: ["Mauve"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 3,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Pink sleeveless blouse",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Blouses"],
      subtype: "Sleeveless",
      colors: ["Pink"],
      size: "M",
      ratings: {
        comfort: 2,
        confidence: 4,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Red halter tank",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Tanks"],
      subtype: "Halter",
      colors: ["Red"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 4,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Black racerback tank",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Tanks"],
      subtype: "Racerback",
      colors: ["Black"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 5,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Taupe muscle tank",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Tanks"],
      subtype: "Muscle",
      colors: ["Taupe"],
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
      name: "Black spaghetti strap tank",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Tanks"],
      subtype: "Spaghetti strap",
      colors: ["Black"],
      size: "S",
      ratings: {
        comfort: 5,
        confidence: 4,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Rainbow cardigan sweater",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Sweaters"],
      subtype: "Cardigan",
      colors: ["Rainbow"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 4,
        warmth: 3
      },
      waterproof: false,
      workAppropriate: true
    },

    {
      name: "Teal pullover sweater",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Sweaters"],
      subtype: "Pullover",
      colors: ["Teal"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 5,
        warmth: 3
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Cream turtleneck sweater",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Sweaters"],
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
      name: "Grey crewneck sweater",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Sweaters"],
      subtype: "Crewneck",
      colors: ["Grey"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 4,
        warmth: 3
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Burgundy shift dress",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Dresses"],
      subtype: "Shift",
      colors: ["Burgundy"],
      size: "M",
      ratings: {
        comfort: 2,
        confidence: 4,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Little black dress",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Dresses"],
      subtype: "Little black",
      colors: ["Black"],
      size: "S",
      ratings: {
        comfort: 5,
        confidence: 3,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "White slip dress",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Dresses"],
      subtype: "Slip",
      colors: ["White"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 5,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Turquoise bodycon dress",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Dresses"],
      subtype: "Bodycon",
      colors: ["Turquoise"],
      size: "S",
      ratings: {
        comfort: 3,
        confidence: 5,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Blush ruffle dress",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Dresses"],
      subtype: "Ruffle",
      colors: ["Blush"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 3,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Navy romper jumpsuit",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Jumpsuits"],
      subtype: "Romper",
      colors: ["Navy"],
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
      name: "Black wide leg jumpsuit",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Jumpsuits"],
      subtype: "Wide leg",
      colors: ["Black"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 5,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Marine professional jumpsuit",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Jumpsuits"],
      subtype: "Professional",
      colors: ["Marine"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 4,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Forest green utility jumpsuit",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Jumpsuits"],
      subtype: "Utility",
      colors: ["Forest green"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 5,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Denim overalls",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Overalls"],
      subtype: "Denim",
      colors: ["Blue"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 4,
        warmth: 3
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Camel corduroy overalls",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Overalls"],
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
      name: "Black shortalls",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Overalls"],
      subtype: "Shortalls",
      colors: ["Black"],
      size: "S",
      ratings: {
        comfort: 4,
        confidence: 3,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "White low-top sneakers",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Sneakers"],
      subtype: "Low-top",
      colors: ["White"],
      size: "8",
      ratings: {
        comfort: 2,
        confidence: 4,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "White high-top sneakers",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Sneakers"],
      subtype: "High-top",
      colors: ["White"],
      size: "8",
      ratings: {
        comfort: 3,
        confidence: 5,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Red slip-on sneakers",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Sneakers"],
      subtype: "Slip-on",
      colors: ["Red"],
      size: "8",
      ratings: {
        comfort: 4,
        confidence: 5,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Grey running sneakers",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Sneakers"],
      subtype: "Running",
      colors: ["Grey"],
      size: "8",
      ratings: {
        comfort: 5,
        confidence: 2,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Brown cowboy boots",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Boots"],
      subtype: "Cowboy",
      colors: ["Brown"],
      size: "8",
      ratings: {
        comfort: 3,
        confidence: 3,
        warmth: 2
      },
      waterproof: true,
      workAppropriate: false
    },
    {
      name: "Black knee-high boots",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Boots"],
      subtype: "Knee-high",
      colors: ["Black"],
      size: "8",
      ratings: {
        comfort: 3,
        confidence: 4,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Tan steel-toed boots",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Boots"],
      subtype: "Steel-toed",
      colors: ["Tan"],
      size: "8",
      ratings: {
        comfort: 4,
        confidence: 3,
        warmth: 2
      },
      waterproof: true,
      workAppropriate: true
    },
    {
      name: "Blue snow boots",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Boots"],
      subtype: "Snow",
      colors: ["Blue"],
      size: "8",
      ratings: {
        comfort: 3,
        confidence: 3,
        warmth: 5
      },
      waterproof: true,
      workAppropriate: false
    },
    {
      name: "Grey oxfords",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Shoes"],
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
    },
    {
      name: "Blush heels",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Shoes"],
      subtype: "Heels",
      colors: ["Blush"],
      size: "8",
      ratings: {
        comfort: 5,
        confidence: 4,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Hot pink platforms",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Shoes"],
      subtype: "Platforms",
      colors: ["Hot pink"],
      size: "8",
      ratings: {
        comfort: 4,
        confidence: 4,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Red crocs",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Shoes"],
      subtype: "Crocs",
      colors: ["Red"],
      size: "8",
      ratings: {
        comfort: 3,
        confidence: 3,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Tan birks",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Sandals"],
      subtype: "Birks",
      colors: ["Tan"],
      size: "8",
      ratings: {
        comfort: 3,
        confidence: 3,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Nude espadrilles",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Sandals"],
      subtype: "Espadrilles",
      colors: ["Nude"],
      size: "8",
      ratings: {
        comfort: 0,
        confidence: 2,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Yellow flip-flops",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Sandals"],
      subtype: "Flip-flops",
      colors: ["Yellow"],
      size: "8",
      ratings: {
        comfort: 1,
        confidence: 3,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Charcoal slides",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Sandals"],
      subtype: "Slides",
      colors: ["Charcoal"],
      size: "8",
      ratings: {
        comfort: 4,
        confidence: 3,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Green baseball hat",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Hats"],
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
      name: "Yellow bucket hat",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Hats"],
      subtype: "Bucket",
      colors: ["Yellow"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 1,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Red beanie",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Hats"],
      subtype: "Beanie",
      colors: ["Red"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 5,
        warmth: 3
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Blue visor",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Hats"],
      subtype: "Visor",
      colors: ["Blue"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 5,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Black leather belt",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Belts"],
      subtype: "Leather",
      colors: ["Black"],
      size: "M",
      ratings: {
        comfort: 0,
        confidence: 5,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Off-white canvas belt",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Belts"],
      subtype: "Canvas",
      colors: ["Off-white"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 5,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Tan braided belt",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Belts"],
      subtype: "Braided",
      colors: ["Tan"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 3,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Brown buckled belt",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Belts"],
      subtype: "Buckled",
      colors: ["Brown"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 5,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Nude trench coat",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Coats"],
      subtype: "Trench",
      colors: ["Nude"],
      size: "M",
      ratings: {
        comfort: 2,
        confidence: 4,
        warmth: 4
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Black puffer coat",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Coats"],
      subtype: "Puffer",
      colors: ["Black"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 3,
        warmth: 4
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Sage green snow coat",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Coats"],
      subtype: "Snow",
      colors: ["Sage green"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 5,
        warmth: 5
      },
      waterproof: true,
      workAppropriate: false
    },
    {
      name: "Red parka",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Coats"],
      subtype: "Parka",
      colors: ["Red"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 4,
        warmth: 5
      },
      waterproof: true,
      workAppropriate: false
    },
    {
      name: "Brown bomber jacket",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Jackets"],
      subtype: "Bomber",
      colors: ["Brown"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 4,
        warmth: 4
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Brown leather jacket",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Jackets"],
      subtype: "Leather",
      colors: ["Brown"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 5,
        warmth: 4
      },
      waterproof: true,
      workAppropriate: false
    },
    {
      name: "Navy blazer",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Jackets"],
      subtype: "Blazer",
      colors: ["Navy"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 4,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: true
    },
    {
      name: "Blue jean jacket",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Jackets"],
      subtype: "Jean",
      colors: ["Blue"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 3,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Purple windbreaker",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Jackets"],
      subtype: "Windbreaker",
      colors: ["Purple"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 4,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Black leather gloves",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Gloves"],
      subtype: "Leather",
      colors: ["Black"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 5,
        warmth: 3
      },
      waterproof: true,
      workAppropriate: false
    },
    {
      name: "Grey wool gloves",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Gloves"],
      subtype: "Wool",
      colors: ["Grey"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 4,
        warmth: 3
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "White snow gloves",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Gloves"],
      subtype: "Snow",
      colors: ["White"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 2,
        warmth: 5
      },
      waterproof: true,
      workAppropriate: false
    },
    {
      name: "Black work gloves",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Gloves"],
      subtype: "Work",
      colors: ["Black"],
      size: "M",
      ratings: {
        comfort: 3,
        confidence: 3,
        warmth: 4
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Red puffer vest",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Vests"],
      subtype: "Puffer",
      colors: ["Red"],
      size: "M",
      ratings: {
        comfort: 4,
        confidence: 4,
        warmth: 2
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "White denim vest",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Vests"],
      subtype: "Denim",
      colors: ["White"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 5,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Olive utility vest",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Vests"],
      subtype: "Utility",
      colors: ["Olive"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 3,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    },
    {
      name: "Green quilted vest",
      imageUrl: "/placeholder-img.jpg",
      type: typeMap["Vests"],
      subtype: "Quilted",
      colors: ["Green"],
      size: "M",
      ratings: {
        comfort: 5,
        confidence: 3,
        warmth: 1
      },
      waterproof: false,
      workAppropriate: false
    }
  ])

  console.log(`Clothes inserted: ${clothes.length}`)
  await disconnectDB()
}

main().catch((e) => {
  console.error("Seed-clothes error:", e)
  process.exit(1)
})
