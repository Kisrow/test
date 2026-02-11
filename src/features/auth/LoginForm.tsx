import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { LoginSchema, type LoginFormValues } from "./login.schema";
import { login } from "../../shared/api/auth";
import { setToken } from "../../shared/auth/storage";
import { IconLock } from "@tabler/icons-react";
import { LoginCard } from "./ui/LoginCard";
import styles from "./Login.module.css";
import { UsernameInput } from "./ui/UsernameInput";

export function LoginForm() {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState<string | null>(null);

  const { control, register, handleSubmit, formState } =
    useForm<LoginFormValues>({
      resolver: zodResolver(LoginSchema),
      defaultValues: { remember: false, password: "", username: "" },
      mode: "onChange",
    });

  const onSubmit = async (values: LoginFormValues) => {
    setApiError(null);
    const { username, password, remember } = values;
    try {
      const { accessToken } = await login({ username, password });
      setToken(accessToken, remember);
      navigate("/products");
    } catch {
      setApiError("Неправильно введен логин или пароль");
    }
  };

  return (
    <LoginCard>
      <Stack mx={"auto"} gap="xl" w={399} justify="center">
        <Paper w={52} h={52} radius="xl" className={styles.logo}>
          <img src="/logo.svg" alt="logo" />
        </Paper>

        <Stack>
          <Title order={1} className={styles.title}>
            Добро пожаловать!
          </Title>
          <Text className={styles.subtitle}>Пожалуйста, авторизируйтесь</Text>
        </Stack>

        <Stack
          justify="flex-start"
          gap="lg"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack gap={"md"}>
            <UsernameInput control={control} errors={formState.errors} />
            <PasswordInput
              label="Пароль"
              placeholder="Пароль"
              autoComplete="current-password"
              error={formState.errors.password?.message}
              leftSection={<IconLock size={18} stroke={1.5} color="#C9C9C9" />}
              radius={12}
              size="lg"
              {...register("password")}
            />
          </Stack>

          <Checkbox
            c={"#9c9c9c"}
            label="Запомнить данные"
            {...register("remember")}
          />

          {apiError && (
            <Text c="red" size="sm">
              {apiError}
            </Text>
          )}

          <Button
            className={styles.button}
            type="submit"
            loading={formState.isSubmitting}
            radius={12}
            size="lg"
            h={55}
            fullWidth
          >
            Войти
          </Button>

          <Group gap="md" align="center">
            <Divider flex={1} />
            <Text size="sm" c="dimmed">
              или
            </Text>
            <Divider flex={1} />
          </Group>
        </Stack>

        <Group justify="center" gap={6}>
          <Text size="md" c="#9c9c9c">
            Нет аккаунта?
          </Text>
          <Anchor
            size="md"
            fw={700}
            c="#2b3bd6"
            underline="always"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Создать
          </Anchor>
        </Group>
      </Stack>
    </LoginCard>
  );
}
