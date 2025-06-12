import { CheckIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface CheckBoxProps {
  item: {
    label: string;
    value: string | number;
    subLabel: string;
  };
  isChecked: boolean;
  onSelected: (value: string | number) => void;
}

export default function CheckBoxCustom({
  item,
  onSelected,
  isChecked,
}: CheckBoxProps) {
  return (
    <Flex w="fit-content" gap="10px" alignItems="center">
      <Flex
        w="20px"
        h="20px"
        alignItems={"center"}
        justifyContent={"center"}
        border="1px solid"
        borderColor={`${isChecked ? "#49B267" : "#94979C"}`}
        borderRadius="5px"
        cursor="pointer"
        onClick={() => onSelected(item.value)}
      >
        {isChecked && (
          <CheckIcon
            width={"11px"}
            color={`${isChecked ? "#49B267" : "white"}`}
          />
        )}
      </Flex>

      <Text color={`${isChecked ? "#49B267" : "white"}`}>{item.label}</Text>
      {item.subLabel && (
        <Text
          fontSize="8px"
          bg={`${isChecked ? "rgb(28,67,39)" : "#23262E"}`}
          borderRadius="full"
          px="5px"
          py={"5px"}
          fontWeight={500}
          textTransform="uppercase"
          color={`${isChecked ? "#69FF93" : "#94979C"}`}
        >
          {item.subLabel}
        </Text>
      )}
    </Flex>
  );
}
