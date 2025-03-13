import { ChevronDownIcon } from "@chakra-ui/icons";
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
        border="1px solid"
        borderColor="rgba(255,255,255, 0.3)"
        borderRadius="5px"
        cursor="pointer"
        onClick={() => onSelected(item.value)}
      >
        {isChecked && <ChevronDownIcon color="rgba(255,255,255, 0.5)" />}
      </Flex>

      <Text color="rgba(255,255,255, 0.5)">{item.label}</Text>
      {item.subLabel && (
        <Text
          fontSize="10px"
          bg="rgba(255,255,255, 0.08)"
          borderRadius="full"
          px="5px"
          fontWeight={500}
          textTransform="uppercase"
          color="rgba(255,255,255, 0.5)"
        >
          {item.subLabel}
        </Text>
      )}
    </Flex>
  );
}
