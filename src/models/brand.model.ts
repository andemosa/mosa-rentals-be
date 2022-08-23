import { Schema, InferSchemaType, model } from "mongoose";

// Schema
const schema = new Schema(
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

type BrandType = InferSchemaType<typeof schema>;

const Brand = model<BrandType>("Brand", schema);

export { Brand };
