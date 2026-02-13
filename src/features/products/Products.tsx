import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Container,
  Group,
  Pagination,
  Paper,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconPlus, IconRefresh } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { columns } from "./constants";
import { useProducts } from "../../shared/api/useProducts";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { TableRow } from "./ui/TableRow";
import type { SortBy, SortOrder } from "../../shared/api/products";
import { Spinner } from "./ui/Spinner";
import { Header } from "./ui/Header";
import type { CreateProduct } from "./products.schema";
import { notifications } from "@mantine/notifications";
import { ProductModal } from "./ui/Modal";

const LIMIT = 20;

export const Products = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [q] = useDebouncedValue(search, 300);

  const [sortBy, setSortBy] = useState<SortBy>();
  const [order, setOrder] = useState<SortOrder>();

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const [modalOpened, modal] = useDisclosure(false);

  const toggleSort = (field: SortBy) => {
    setPage(1);

    setSortBy((prevField) => {
      if (prevField !== field) {
        setOrder("asc");
        return field;
      }

      setOrder((prevOrder) => {
        if (prevOrder === "asc") return "desc";
        if (prevOrder === "desc") return undefined;
        return "asc";
      });

      if (order === "desc") return undefined;
      return field;
    });
  };

  const { data, isFetching, isPlaceholderData } = useProducts({
    q,
    page,
    limit: LIMIT,
    sortBy,
    order,
  });

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, Math.ceil(data.total / LIMIT));
  }, [data]);

  const shownText = useMemo(() => {
    if (!data || data.total === 0) return "Показано 0–0 из 0";
    const from = data.skip + 1;
    const to = Math.min(data.skip + data.limit, data.total);
    return `Показано ${from}-${to} из ${data.total}`;
  }, [data]);

  const products = data?.products ?? [];

  const allSelected =
    products.length > 0 && products.every((p) => selectedIds.has(p.id));

  const toggleAllOnPage = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (allSelected) {
        products.forEach((p) => next.delete(p.id));
        return next;
      }

      products.forEach((p) => next.add(p.id));
      return next;
    });
  };

  const toggleOne = (id: number, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleCreateProduct = (values: CreateProduct) => {
    console.log("CREATE PRODUCT (mock):", values);

    notifications.show({
      title: "Готово",
      message: `Товар "${values.title}" создан (имитация)`,
    });
  };

  return (
    <Box py={"lg"}>
      <Header search={search} setPage={setPage} setSearch={setSearch} />
      <Container px={0} size={1920}>
        <Paper p={30} bg="#FFFFFF" radius="md">
          <Group justify="space-between">
            <Title order={4}>Все позиции</Title>
            <Group justify="flex-end" gap={8}>
              <ActionIcon
                size={42}
                radius={8}
                variant="outline"
                styles={{
                  root: {
                    backgroundColor: "#FFFFFF",
                    borderColor: "#ECECEB",
                  },
                }}
              >
                <IconRefresh
                  style={{ transform: "scaleY(-1)" }}
                  size={20}
                  stroke={1.5}
                  color="#6B6B6B"
                />
              </ActionIcon>
              <Button
                onClick={modal.open}
                h={42}
                radius={6}
                styles={{
                  root: {
                    backgroundColor: "#242EDB",
                    color: "#FFFFFF",
                    paddingLeft: 20,
                    paddingRight: 24,
                  },
                  label: { fontWeight: 600 },
                }}
                leftSection={
                  <Box
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      border: "2px solid #FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconPlus size={16} stroke={2} color="#FFFFFF" />
                  </Box>
                }
              >
                Добавить
              </Button>
            </Group>
          </Group>
          <Box py={40}>
            <Table
              withColumnBorders={false}
              highlightOnHover={true}
              verticalSpacing="md"
              styles={{
                tbody: { position: "relative" },
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th w={44}>
                    <Checkbox
                      icon={() => null}
                      color="indigo.9"
                      styles={{
                        input: {
                          border: "1px solid #b2b3b9",
                          cursor: "pointer",
                        },
                      }}
                      checked={allSelected}
                      aria-label="Выбрать все"
                      onChange={toggleAllOnPage}
                    />
                  </Table.Th>
                  {columns.map(({ key, label, sortable }) => (
                    <Table.Th key={key}>
                      <Text
                        onClick={() => sortable && toggleSort(key)}
                        size="sm"
                        fw={700}
                        c="#b2b3b9"
                        styles={{ root: { cursor: "pointer" } }}
                      >
                        {label}
                      </Text>
                    </Table.Th>
                  ))}
                  <Table.Th w={140} />
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {isFetching && isPlaceholderData && <Spinner />}

                {data?.products.map((product) => (
                  <TableRow
                    key={product.id}
                    {...product}
                    isSelected={selectedIds.has(product.id)}
                    onSelectedChange={(checked) =>
                      toggleOne(product.id, checked)
                    }
                  />
                ))}
              </Table.Tbody>
            </Table>
          </Box>
          <Group justify="space-between" mt={24}>
            <Text c="dimmed">{shownText}</Text>
            <Pagination
              total={totalPages}
              value={page}
              onChange={setPage}
              radius="sm"
            />
          </Group>
        </Paper>
      </Container>
      <ProductModal
        opened={modalOpened}
        onClose={modal.close}
        onSubmit={handleCreateProduct}
      />
    </Box>
  );
};
