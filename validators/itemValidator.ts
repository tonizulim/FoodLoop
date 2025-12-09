import { z } from "zod";

export const itemSchema = z
  .object({
    shop_id: z
      .number()
      .int()
      .positive()
      .refine((val) => val !== undefined, { message: "Shop ID is required" }),

    food_id: z
      .number()
      .int()
      .positive()
      .refine((val) => val !== undefined, { message: "Food ID is required" }),

    title: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title must be less than 255 characters")
      .trim(),

    description: z
      .string()
      .max(1000, "Description must be less than 1000 characters")
      .trim()
      .optional()
      .nullable(),

    image: z
      .string()
      .url("Image must be a valid URL")
      .max(500, "Image URL must be less than 500 characters")
      .optional()
      .nullable(),

    published_at: z.string().datetime(),

    expires_at: z.string().datetime(),
  })
  .refine(
    (data) => {
      if (!data.published_at || !data.expires_at) return true;

      const published = new Date(data.published_at).getTime() + 60 * 60 * 1000;
      const expires = new Date(data.expires_at).getTime();
      return expires > published;
    },
    {
      message: "Expiration time must be at least 1h",
      path: ["expires_at"],
    }
  );
