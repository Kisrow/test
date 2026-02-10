import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { ActionIcon, TextInput } from "@mantine/core";
import { IconUser, IconX } from "@tabler/icons-react";
import type { LoginFormValues } from "../login.schema";

type Props = {
  control: Control<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
};

export function UsernameInput({ control, errors }: Props) {
  return (
    <Controller
      name="username"
      control={control}
      render={({ field }) => {
        const hasValue = (field.value ?? "").length > 0;

        return (
          <TextInput
            label="Логин"
            placeholder="Логин"
            autoComplete="username"
            error={errors.username?.message}
            leftSection={<IconUser size={18} stroke={1.5} color="#C9C9C9" />}
            {...field}
            rightSection={
              hasValue ? (
                <ActionIcon
                  variant="subtle"
                  onClick={() => field.onChange("")}
                  aria-label="Очистить"
                >
                  <IconX size={16} stroke={1.5} color="#C9C9C9" />
                </ActionIcon>
              ) : null
            }
            rightSectionPointerEvents="all"
          />
        );
      }}
    />
  );
}
