import {
  Box,
  Checkbox,
  Group,
  Image,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconDots, IconPlus } from "@tabler/icons-react";
import type { Product } from "../products.schema";
import styles from "../Products.module.css";
import { fonts } from "@/shared/config/fonts";

type Props = Product & {
  isSelected: boolean;
  onSelectedChange: (checked: boolean) => void;
};

export const TableRow = ({
  title,
  category,
  brand,
  sku,
  rating,
  price,
  thumbnail,
  isSelected,
  onSelectedChange,
}: Props) => {
  return (
    <Table.Tr>
      <Table.Td w={44} className={isSelected ? styles.table : undefined}>
        <Checkbox
          icon={() => null}
          aria-label="Выбрать"
          color="indigo.9"
          styles={{
            input: { border: "1px solid #b2b3b9", cursor: "pointer" },
          }}
          checked={isSelected}
          onChange={(e) => onSelectedChange(e.currentTarget.checked)}
        />
      </Table.Td>

      <Table.Td>
        <Group gap={12} wrap="nowrap">
          <Box
            w={48}
            h={48}
            style={{
              borderRadius: 8,
              backgroundColor: "#C4C4C4",
              border: "1px solid #ECECEB",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Image src={thumbnail} alt={title} w={48} h={48} fit="cover" />
          </Box>

          <Box ff={fonts.primary}>
            <Text fw={700} lineClamp={1} c={"#161919"}>
              {title}
            </Text>
            <Text fw={400} size="sm" c="dimmed" lineClamp={1}>
              {category}
            </Text>
          </Box>
        </Group>
      </Table.Td>

      <Table.Td ff={fonts.secondary} fw={700}>
        <Text>{brand}</Text>
      </Table.Td>

      <Table.Td ff={fonts.secondary} fw={400}>
        <Text>{sku}</Text>
      </Table.Td>

      <Table.Td ff={fonts.secondary} fw={400}>
        {!Number.isNaN(rating) ? (
          <Text>
            <Text
              ff={fonts.secondary}
              fw={400}
              component="span"
              c={rating <= 3 ? "red" : undefined}
            >
              {rating}
            </Text>
            /5
          </Text>
        ) : (
          "-"
        )}
      </Table.Td>

      <Table.Td ff={fonts.mono} fw={400}>
        <Text>
          {!Number.isNaN(price)
            ? new Intl.NumberFormat("ru-RU", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(price)
            : "-"}
        </Text>
      </Table.Td>

      <Table.Td w={140}>
        <Group justify="flex-end" gap={12} wrap="nowrap">
          <UnstyledButton
            style={{
              width: 44,
              height: 24,
              borderRadius: 999,
              background: "#242EDB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Добавить"
          >
            <IconPlus size={16} color="#fff" stroke={2} />
          </UnstyledButton>

          <UnstyledButton
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              border: "1px solid #ECECEB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Меню"
          >
            <IconDots size={18} color="#8C8C8C" />
          </UnstyledButton>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};
