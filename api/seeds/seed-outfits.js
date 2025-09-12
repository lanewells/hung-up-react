import "dotenv/config"
import { connectDB, disconnectDB } from "../src/db/index.js"
import Clothing from "../src/models/Clothing.js"
import Outfit from "../src/models/Outfit.js"

async function main() {
  await connectDB()
  console.log("Seeding: outfits…")

  const allClothes = await Clothing.find()
  const clothesMap = Object.fromEntries(allClothes.map((c) => [c.name, c._id]))

  const need = (names) => {
    const ids = names.map((n) => clothesMap[n]).filter(Boolean)
    const missing = names.filter((n) => !clothesMap[n])
    if (missing.length)
      throw new Error(`Missing clothing: ${missing.join(", ")}`)
    return ids
  }

  await Outfit.deleteMany({})
  await Outfit.insertMany([
    {
      title: "Campfire Vibes",
      imageUrl: "/placeholder-img.jpg",
      occasion: "Outdoor Bonfire",
      weather: "Starry, Cool, Evening",
      favorite: true,
      items: need([
        "Cream turtleneck sweater",
        "Green baseball hat",
        "Camel corduroy overalls",
        "Grey oxfords"
      ])
    },
    {
      title: "Beach Day",
      imageUrl: "/placeholder-img.jpg",
      occasion: "Swimming at the beach or pool",
      weather: "Sunny, Warm",
      favorite: true,
      items: need([
        "Yellow bucket hat",
        "Black spaghetti strap tank",
        "Yellow flip-flops",
        "Yellow skort"
      ])
    },
    {
      title: "Autumn Casual",
      imageUrl: "/placeholder-img.jpg",
      occasion: "Casual hanging out, weekend",
      weather: "Mild",
      favorite: true,
      items: need([
        "White denim vest",
        "Tan steel-toed boots",
        "Forest green utility jumpsuit"
      ])
    },
    {
      title: "Country Look",
      imageUrl: "/placeholder-img.jpg",
      occasion: "Weekend at Mom's in the country",
      weather: "Varied, Cloudy",
      favorite: true,
      items: need([
        "Brown bomber jacket",
        "Blue jeans",
        "Brown buckled belt",
        "Brown cowboy boots",
        "Blue long sleeve tee"
      ])
    },
    {
      title: "Formal",
      imageUrl: "/placeholder-img.jpg",
      occasion: "Gala, fancy event",
      weather: "Cool, Indoors",
      favorite: true,
      items: need([
        "Turquoise bodycon dress",
        "Black knee-high boots",
        "Black leather belt",
        "Black leather gloves"
      ])
    },
    {
      title: "Going Out",
      imageUrl: "/placeholder-img.jpg",
      occasion: "Date night, going out, party",
      weather: "Cool, Evening",
      favorite: false,
      items: need(["Burgundy shift dress", "Blush heels", "Nude trench coat"])
    },
    {
      title: "Summer Casual",
      imageUrl: "/placeholder-img.jpg",
      occasion: "Summer, vacation, hanging out",
      weather: "Sunny",
      favorite: false,
      items: need([
        "Blue jean jacket",
        "Red v-neck tee",
        "Light wash jean shorts",
        "White low-top sneakers"
      ])
    },
    {
      title: "Sporty Look",
      imageUrl: "/placeholder-img.jpg",
      occasion: "Jogging, working out at the gym",
      weather: "Warm",
      favorite: false,
      items: need([
        "White graphic tee",
        "Blue running shorts",
        "Grey running sneakers"
      ])
    },
    {
      title: "Feminine Casual",
      imageUrl: "/placeholder-img.jpg",
      occasion: "Picnic in the park, brewery, themepark outing",
      weather: "Sunny",
      favorite: false,
      items: need([
        "Red halter tank",
        "Pink mini skirt",
        "Hot pink platforms",
        "White button-down blouse"
      ])
    },
    {
      title: "Snow Day",
      imageUrl: "/placeholder-img.jpg",
      occasion: "Winter, snow day in the mountains",
      weather: "Snowy, Cold",
      favorite: false,
      items: need([
        "Red beanie",
        "White snow gloves",
        "Blue snow boots",
        "Sage green snow coat",
        "Grey joggers"
      ])
    },
    {
      title: "Rainy Day",
      imageUrl: "/placeholder-img.jpg",
      occasion: "Rainy day, sprinkling, running errands",
      weather: "Rainy, Cool, Cloudy",
      favorite: false,
      items: need([
        "Blue visor",
        "Grey crewneck sweater",
        "Purple windbreaker",
        "Grey leggings",
        "White low-top sneakers"
      ])
    },
    {
      title: "Professional",
      imageUrl: "/placeholder-img.jpg",
      occasion: "Work, conference, business casual event",
      weather: "Mild, Indoors",
      favorite: false,
      items: need([
        "Off-white canvas belt",
        "Nude espadrilles",
        "Marine professional jumpsuit",
        "Navy blazer"
      ])
    }
  ])

  console.log("Outfits inserted: 1")
  await disconnectDB()
}

main().catch((e) => {
  console.error("Seed-outfits error:", e)
  process.exit(1)
})
