import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { LoginSchema, type LoginFormValues } from "./login.schema";
import { login } from "../../shared/api/auth";
import { setToken } from "../../shared/auth/storage";
import { IconLock, IconUser } from "@tabler/icons-react";
import { LoginCard } from "./LoginCard";
import styles from "./Login.module.css";

export function LoginForm() {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { remember: false },
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
      <Stack gap="lg">
        <Stack align="center">
          <Paper
            w={52}
            h={52}
            radius="xl"
            withBorder
            display="flex"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <img src="/logo.svg" alt="logo" />
          </Paper>
        </Stack>
        <Stack>
          <Title order={1} className={styles.title}>
            Добро пожаловать!
          </Title>
          <Text className={styles.subtitle}>Пожалуйста, авторизируйтесь</Text>
        </Stack>
        <Stack gap="md" component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Логин"
            placeholder="Логин"
            autoComplete="username"
            error={formState.errors.username?.message}
            leftSection={<IconUser size={18} stroke={1.5} color="#C9C9C9" />}
            {...register("username")}
          />

          <PasswordInput
            label="Пароль"
            placeholder="Пароль"
            autoComplete="current-password"
            error={formState.errors.password?.message}
            leftSection={<IconLock size={18} stroke={1.5} color="#C9C9C9" />}
            {...register("password")}
          />

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

          <Button type="submit" loading={formState.isSubmitting} fullWidth>
            Войти
          </Button>
        </Stack>
      </Stack>
    </LoginCard>
  );
}
