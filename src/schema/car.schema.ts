import { number, object, string, TypeOf, enum as Enum } from "zod";

export const createCarSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    headline: string({
      required_error: "Headline is required",
    }),
    tagline: string({
      required_error: "Tagline is required",
    }),
    description: string({
      required_error: "Description is required",
    }),
    brand: string({
      required_error: "Brand is required",
    }),
    transmission: Enum(["Manual", "Automatic"], {
      required_error: "Transmission is required",
    }),
    capacity: number({
      required_error: "Capacity is required",
    }),
    gasoline: number({
      required_error: "Gasoline is required",
    }),
    price: number({
      required_error: "Price is required",
    }),
  }),
});

export type CreateCarInput = TypeOf<typeof createCarSchema>;
