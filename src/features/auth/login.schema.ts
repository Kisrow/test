import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().nonempty("Обязательное поле"),
  password: z.string().nonempty("Обязательное поле"),
  remember: z.boolean(),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;
