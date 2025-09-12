import mongoose from "mongoose"

const TypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    subtypes: [{ type: String }],
    drawer: { type: String },
    sufficient: { type: Boolean, default: false },
    necessity: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export default mongoose.model("Type", TypeSchema)
