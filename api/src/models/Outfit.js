import mongoose from "mongoose"

const OutfitSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    occasion: { type: String, required: true },
    weather: { type: String, required: true },
    favorite: { type: Boolean, required: false },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Clothing" }]
  },
  { timestamps: true }
)

export default mongoose.model("Outfit", OutfitSchema)
