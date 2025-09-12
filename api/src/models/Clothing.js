import mongoose from "mongoose"

const ClothingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Type", required: true },
    imageUrl: { type: String },
    subtype: { type: String },
    colors: [{ type: String }],
    size: { type: String },
    ratings: {
      comfort: { type: Number, min: 0, max: 5 },
      confidence: { type: Number, min: 0, max: 5 },
      warmth: { type: Number, min: 0, max: 5 }
    },
    waterproof: { type: Boolean },
    workAppropriate: { type: Boolean }
  },
  { timestamps: true }
)

export default mongoose.model("Clothing", ClothingSchema)
