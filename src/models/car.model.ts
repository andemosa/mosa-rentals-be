import { Schema, model, Types } from "mongoose";

interface IReview {
  rating: number;
  comment: string;
  user: Types.ObjectId;
}

interface ICar {
  type: string;
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
  type: {
    type: String,
    required: true,
  },
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
