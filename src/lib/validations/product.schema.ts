import z from "zod";

export const productSchema = z
  .object({
    name: z.string().min(3, "Name is too short").max(80, "Name is too long"),
    description: z
      .string()
      .min(20, "Give shoppers more detail")
      .max(2000, "Description is too long"),
    category: z.string().min(1, "Pick a category"),
    price: z.coerce.number().positive("Must be greater than 0"),
    compareAtPrice: z.coerce.number().positive().optional(),
    sku: z
      .string()
      .regex(/^[A-Z0-9-]{4,}$/, "Format: ABC-1234 (uppercase, numbers, hyphens only)"),
    stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
    images: z
      .union([
        z.array(z.instanceof(File)).max(6, "Maximum 6 images allowed"),
        z.array(z.string()),
        z.undefined(),
      ])
      .optional(),
    variants: z
      .array(
        z.object({
          color: z.string().optional(),
          size: z.string().optional(),
          stock: z.coerce.number().int().min(0),
        })
      )
      .optional(),
  })
  .refine(
    (data) => !data.compareAtPrice || data.compareAtPrice > data.price,
    {
      message: "Compare-at price must be higher than the sale price",
      path: ["compareAtPrice"],
    }
  );

export type ProductFormData = z.infer<typeof productSchema>;
