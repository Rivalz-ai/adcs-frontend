import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface FormFieldProps extends InputProps {
  fieldKey: string;
  fieldValue: unknown;
  register: UseFormRegister<Record<string, unknown>>;
  error?: string;
}

export default function FormField({
  fieldKey,
  fieldValue,
  register,
  error,
  ...props
}: FormFieldProps) {
  const inputType = typeof fieldValue === "number" ? "number" : "text";

  const convertCamelCaseToLabel = (camelCase: string) => {
    return camelCase
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel textTransform="capitalize" fontSize="14px" color={"#35834b"}>
        {convertCamelCaseToLabel(fieldKey)}
      </FormLabel>
      <Input
        {...register(fieldKey, {
          valueAsNumber: typeof fieldValue === "number",
        })}
        color={"#8bd09f"}
        type={inputType}
        placeholder={`Enter ${convertCamelCaseToLabel(fieldKey)}`}
        padding={"10px"}
        paddingY={"20px"}
        minHeight={"40px"}
        borderRadius={"5px"}
        border={"1px solid #23262E"}
        _hover={{ borderColor: "#49B267" }}
        _focus={{ borderColor: "#49B267" }}
        _focusVisible={{ borderColor: "#49B267" }}
        _focusWithin={{ borderColor: "#49B267" }}
        {...props}
      />
      {error && (
        <Text color="red.500" fontSize="sm" mt={1}>
          {error}
        </Text>
      )}
    </FormControl>
  );
}
