import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { CloseButton, TextInput } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
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
                <CloseButton
                  aria-label="Очистить"
                  onClick={() => field.onChange("")}
                  c={"#C9C9C9"}
                />
              ) : null
            }
            rightSectionPointerEvents="all"
          />
        );
      }}
    />
  );
}
