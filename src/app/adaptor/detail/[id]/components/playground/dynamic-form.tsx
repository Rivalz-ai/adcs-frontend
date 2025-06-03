import { VStack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createDynamicSchema } from "./schema-utils";
import FormField from "./form-field";
import Button from "@/views/components/Button";
import { FaPlay } from "react-icons/fa";

interface DynamicFormProps {
  inputEntity: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  isSubmitting: boolean;
  onReset: () => void;
}

export default function DynamicForm({
  inputEntity,
  onSubmit,
  isSubmitting,
  onReset,
}: DynamicFormProps) {
  const schema = useMemo(() => {
    return createDynamicSchema(inputEntity);
  }, [inputEntity]);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    // defaultValues: inputEntity as FormData,
  });

  const handleFormSubmit = async (data: FormData) => {
    onReset();
    await onSubmit(data as Record<string, unknown>);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <VStack spacing={4} align="stretch">
          {Object.entries(inputEntity).map(([key, value]) => {
            const fieldError = errors[key as keyof FormData];
            const errorMessage = fieldError?.message
              ? String(fieldError.message)
              : undefined;

            return (
              <FormField
                key={key}
                fieldKey={key}
                fieldValue={value}
                register={register}
                error={errorMessage}
                isDisabled={isSubmitting}
                isReadOnly={isSubmitting}
              />
            );
          })}

          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            loadingText="Submitting..."
            size="lg"
            mt={4}
            leftIcon={<FaPlay />}
          >
            Execute Adaptor
          </Button>
        </VStack>
      </form>
    </>
  );
}
