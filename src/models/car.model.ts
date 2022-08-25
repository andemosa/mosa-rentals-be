import { Schema, model, Types } from "mongoose";
import { IUser } from "./user.model";

interface IReview {
  rating: number;
  comment: string;
  user: Types.ObjectId;
}

interface ICar {
  brand: string;
  name: string;
  headline: string;
  tagline: string;
  description: string;
  transmission: "Manual" | "Automatic";
  capacity: number;
  gasoline: number;
  price: number;
  reviews?: Types.DocumentArray<IReview>;
  images?: string[];
  discount?: number | undefined;
  likes?: Types.DocumentArray<IUser>;
}

const reviewSchema = new Schema(
  {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const carSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  transmission: {
    type: String,
    required: true,
    enum: ["Manual", "Automatic"],
  },
  capacity: {
    type: Number,
    required: true,
  },
  gasoline: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
  },
  reviews: [reviewSchema],
  images: [String],
});

const Review = model<IReview>("Review", reviewSchema);

const Car = model<ICar>("Car", carSchema);

export { Review, Car, ICar, IReview };
