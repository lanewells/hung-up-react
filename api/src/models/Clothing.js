import mongoose from "mongoose"

const ClothingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Type", required: true },
    imageUrl: { type: String, required: true },
    subtype: { type: String, required: true },
    colors: [{ type: String, required: true }],
    size: { type: String, required: false },
    ratings: {
      comfort: { type: Number, required: true, min: 0, max: 5 },
      confidence: { type: Number, required: true, min: 0, max: 5 },
      warmth: { type: Number, required: true, min: 0, max: 5 }
    },
    waterproof: { type: Boolean, required: true },
    workAppropriate: { type: Boolean, required: false }
  },
  { timestamps: true }
)

export default mongoose.model("Clothing", ClothingSchema)
