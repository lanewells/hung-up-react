import mongoose from "mongoose"

const TypeSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    subtypes: [{ type: String, required: true }],
    drawer: { type: String, required: true },
    sufficient: { type: Boolean, required: true },
    necessity: { type: Number, required: false, min: 1, max: 3 },
    clothing: [{ type: Schema.Types.ObjectId, ref: "Clothing" }]
  },
  { timestamps: true }
)

export default mongoose.model("Type", TypeSchema)
