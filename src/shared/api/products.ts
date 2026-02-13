import {
  ProductsResponseSchema,
  type Product,
  type ProductsResponse,
} from "../../features/products/products.schema";

const BASE_URL = "https://dummyjson.com";

const SELECT = "id,title,category,brand,sku,rating,price,thumbnail";

export type SortOrder = "asc" | "desc";
export type SortBy = keyof Omit<Product, "id" | "thumbnail">;

type GetProductsParams = {
  q?: string;
  sortBy?: SortBy;
  order?: SortOrder;
  limit: number;
  skip: number;
};

export const buildProductsUrl = ({
  q,
  sortBy,
  order,
  limit,
  skip,
}: GetProductsParams) => {
  const path = q?.trim() ? "/products/search" : "/products";

  const url = new URL(path, BASE_URL);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));
  url.searchParams.set("select", SELECT);

  if (q?.trim()) url.searchParams.set("q", q.trim());
  if (sortBy) url.searchParams.set("sortBy", sortBy);
  if (order) url.searchParams.set("order", order);

  return url;
};

export const getProducts = async (
  params: GetProductsParams,
): Promise<ProductsResponse> => {
  const url = buildProductsUrl(params);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Произошла ошибка во время запроса");

  return ProductsResponseSchema.parse(await res.json());
};
