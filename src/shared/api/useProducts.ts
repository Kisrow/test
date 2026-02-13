import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts, type SortBy, type SortOrder } from "../api/products";
import type { ProductsResponse } from "../../features/products/products.schema";

type Params = {
  q: string;
  page: number;
  limit: number;
  sortBy?: SortBy;
  order?: SortOrder;
};

export const useProducts = ({ q, page, limit, sortBy, order }: Params) => {
  const skip = (page - 1) * limit;

  return useQuery<ProductsResponse>({
    queryKey: ["products", { q, page, limit, sortBy, order }],
    queryFn: () => getProducts({ q, limit, skip, sortBy, order }),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
};
