import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormSetFocus,
} from "react-hook-form";
import { CloseButton, TextInput } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import type { LoginFormValues } from "../login.schema";

type Props = {
  control: Control<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  setFocus: UseFormSetFocus<LoginFormValues>;
};

export function UsernameInput({ control, errors, setFocus }: Props) {
  return (
    <Controller
      name="username"
      control={control}
      render={({ field }) => {
        const hasValue = (field.value ?? "").length > 0;

        return (
          <TextInput
            {...field}
            ref={field.ref}
            label="Логин"
            placeholder="Логин"
            autoComplete="username"
            error={errors.username?.message}
            styles={{ section: { cursor: "text" } }}
            leftSection={
              <IconUser
                onClick={() => setFocus("username")}
                size={18}
                stroke={1.5}
                color="#C9C9C9"
              />
            }
            radius={12}
            size="lg"
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
