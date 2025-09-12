import mongoose from "mongoose"

const OutfitSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Clothing" }],
    imageUrl: { type: String },
    occasion: { type: String },
    weather: { type: String },
    favorite: { type: Boolean, default: false }
  },
  { timestamps: true }
)

export default mongoose.model("Outfit", OutfitSchema)
