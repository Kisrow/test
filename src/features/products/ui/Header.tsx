import { Box, Container, Paper, TextInput, Title } from "@mantine/core";
import styles from "../Products.module.css";
import { IconSearch } from "@tabler/icons-react";
import { useRef } from "react";
import { fonts } from "@/shared/config/fonts";

type Props = {
  search: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};
export const Header = ({ search, setPage, setSearch }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Container size={1920} p={0}>
      <Paper px={30} py={26} mb={30} bg="#FFFFFF" radius="md">
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "1fr minmax(0, 1023px) 1fr",
            alignItems: "center",
          }}
        >
          <Title ff={fonts.primary} fw={700} order={3}>
            Товары
          </Title>
          <TextInput
            ff={fonts.accent}
            fw={400}
            ref={inputRef}
            name="search"
            placeholder="Найти"
            styles={{ section: { cursor: "text" } }}
            radius={8}
            size="lg"
            classNames={{
              input: styles.input,
            }}
            leftSection={
              <IconSearch
                size={18}
                stroke={1.5}
                color="#C9C9C9"
                onClick={() => inputRef.current?.focus()}
              />
            }
            value={search}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
              setPage(1);
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
};
