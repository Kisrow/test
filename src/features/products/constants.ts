import type { SortBy } from "../../shared/api/products";

type Column = {
  key: SortBy;
  label: string;
  sortable?: boolean;
};

export const columns: Column[] = [
  { key: "title", label: "Наименование", sortable: true },
  { key: "brand", label: "Вендор", sortable: true },
  { key: "sku", label: "Артикул", sortable: true },
  { key: "rating", label: "Оценка", sortable: true },
  { key: "price", label: "Цена, ₽", sortable: true },
];
