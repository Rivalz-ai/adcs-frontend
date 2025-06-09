import { Flex, Input, InputProps, Text } from "@chakra-ui/react";
import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface IProps<T extends FieldValues> extends Omit<InputProps, "name"> {
  label?: string;
  name: FieldPath<T>;
  control: Control<T>;
  error?: string;
}

export default function AppInputApiKey<T extends FieldValues>({
  label,
  name,
  control,
  error,
  ...props
}: IProps<T>) {
  return (
    <Flex
      gap={{ base: "10px", lg: "20px" }}
      alignItems={{ base: "start", lg: "center" }}
      flexDirection={{ base: "column", sm: "row" }}
      borderBottom="1px solid #282828"
      py={{ base: "10px", md: "14px", lg: "17px" }}
    >
      <Flex flex={1}>
        <Text
          color="white"
          fontSize={{ base: "16px", md: "18px" }}
          fontWeight="semibold"
        >
          {label}
        </Text>
      </Flex>

      <Flex
        gap={{ base: "10px", md: "20px" }}
        justifyContent={{ base: "center", sm: "flex-end" }}
        w="100%"
        flex={{ base: 1, sm: 1.8 }}
        flexDirection="column"
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              value={field.value?.["api-key"] || ""}
              onChange={(e) => {
                field.onChange({
                  "api-key": e.target.value,
                });
              }}
              onBlur={field.onBlur}
              border={error ? "1px solid #E53E3E" : "1px solid #272637"}
              borderRadius={"10px"}
              bgColor="transparent"
              color="#94979C"
              py={{ base: "18px", md: "22px" }}
              _placeholder={{
                color: "#94979C",
                fontSize: { base: "14px", md: "16px" },
              }}
              w="100%"
              size={{ base: "sm", md: "md" }}
              {...props}
            />
          )}
        />
        {error && (
          <Text color="#E53E3E" fontSize="14px" mt={1}>
            {error}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
