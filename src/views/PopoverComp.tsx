"use client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface PopoverCompProps {
  lable: string;
  data: { value: string | number; label: string; subLabel?: string }[];
  values: Array<string | number>;
  onSelected: (value: string | number) => void;
}

export default function PopoverComp({
  lable,
  data,
  values,
  onSelected,
}: PopoverCompProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          borderRadius="full"
          py="unset"
          fontWeight="normal"
          bgColor="transparent"
          color="rgba(255, 255, 255, 0.48)"
          border="1px solid"
          borderColor="rgba(255,255,255, 0.08)"
          bgGradient="linear(to-b, #1b103d, #181a37)"
          rightIcon={<ChevronDownIcon />}
          _hover={{ bgGradient: "linear(to-b, #1b103d, #181a37)" }}
        >
          {lable}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        bgGradient="linear(to-b, #1b103d, #181a37)"
        color="rgba(255, 255, 255, 0.48)"
        border="1px solid"
        borderColor="rgba(255,255,255, 0.08)"
        zIndex={999}
        w="fit-content"
      >
        <PopoverBody gap="25px" display="flex" flexDir="column" py="20px">
          {data.map((item, index) => (
            <Flex w="full" gap="10px" key={index} alignItems="center">
              <Flex
                w="20px"
                h="20px"
                border="1px solid"
                borderColor="rgba(255,255,255, 0.3)"
                borderRadius="5px"
                cursor="pointer"
                onClick={() => onSelected(item.value)}
              >
                {values.includes(item.value) && <ChevronDownIcon />}
              </Flex>
              <Text color="rgba(255,255,255, 0.5)">{item.label}</Text>
              <Text
                fontSize="10px"
                bg="rgba(255,255,255, 0.08)"
                borderRadius="full"
                px="5px"
                fontWeight={500}
                textTransform="uppercase"
              >
                {item.subLabel}
              </Text>
            </Flex>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
