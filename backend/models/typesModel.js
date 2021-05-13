import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const typeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Types = mongoose.model("productTypes", typeSchema);

export default Types;
