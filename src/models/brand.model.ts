import { Schema, model } from "mongoose";

interface IBrand {
  name: string;
}

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

const Brand = model<IBrand>("Brand", schema);

export { Brand, IBrand };
