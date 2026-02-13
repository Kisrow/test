import z from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string().catch("-"),
  category: z.string().catch(""),
  brand: z.string().catch("-"),
  sku: z.string().catch("-"),

  rating: z.number().catch(NaN),

  price: z
    .number()
    .transform((val) => val * 77)
    .catch(NaN),

  thumbnail: z.url().catch(""),
});

export const CreateProductSchema = z.object({
  title: z.string().min(1, "Введите название"),
  category: z.string().min(1, "Введите категорию"),
  brand: z.string().min(1, "Введите бренд"),
  sku: z.string().min(1, "Введите SKU"),
  rating: z.number().min(0, "0–5").max(5, "0–5"),
  price: z.number().min(0, "Не может быть меньше 0"),
  thumbnail: z.string().url("Нужен корректный URL"),
});

export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema).catch([]),
  total: z.number().catch(0),
  skip: z.number().catch(0),
  limit: z.number().catch(0),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
