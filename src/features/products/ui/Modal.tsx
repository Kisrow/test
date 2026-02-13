import {
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { CreateProductSchema, type CreateProduct } from "../products.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: CreateProduct) => void;
};

export const ProductModal = ({ opened, onClose, onSubmit }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProduct>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      title: "",
      category: "",
      brand: "",
      sku: "",
      rating: 0,
      price: 0,
      thumbnail: "",
    },
  });

  const submit = handleSubmit((values) => {
    onSubmit(values);
    reset();
    onClose();
  });

  const cancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={cancel} centered title="Добавить товар">
      <form onSubmit={submit}>
        <Stack gap="md">
          <TextInput
            label="Название"
            {...register("title")}
            error={errors.title?.message}
          />
          <TextInput
            label="Категория"
            {...register("category")}
            error={errors.category?.message}
          />
          <TextInput
            label="Бренд"
            {...register("brand")}
            error={errors.brand?.message}
          />
          <TextInput
            label="SKU"
            {...register("sku")}
            error={errors.sku?.message}
          />

          <Group grow>
            <Controller
              control={control}
              name="rating"
              render={({ field }) => (
                <NumberInput
                  label="Рейтинг (0–5)"
                  min={0}
                  max={5}
                  step={0.1}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.rating?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <NumberInput
                  label="Цена (₽)"
                  min={0}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.price?.message}
                />
              )}
            />
          </Group>

          <TextInput
            label="Thumbnail URL"
            placeholder="https://..."
            {...register("thumbnail")}
            error={errors.thumbnail?.message}
          />

          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={cancel}>
              Отменить
            </Button>
            <Button type="submit">Добавить</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
