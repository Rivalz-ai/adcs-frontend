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
  isShowValue?: boolean;
  lable: string;
  data: { value: string | number; label: string; subLabel?: string }[];
  values: Array<string | number>;
  onSelected: (value: string | number) => void;
}

export default function PopoverComp({
  isShowValue,
  lable,
  data,
  values,
  onSelected,
}: PopoverCompProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          borderRadius="10px"
          minH={{ lg: "44px" }}
          py="unset"
          _hover={{ bg: "rgba(78, 167, 103, 0.4)", color: "rgb(57, 161, 90)" }}
          fontWeight="normal"
          sx={{ textAlign: "left !important" }}
          bgColor="transparent"
          color="rgba(255, 255, 255, 0.48)"
          border="1px solid"
          borderColor="#2d2f34"
          backgroundColor={"#111419"}
          minW={{ base: "unset", lg: "196px" }}
          w={{ base: "full", lg: "unset" }}
          gap={"4px"}
          position="relative"
          justifyContent="space-between"
        >
          {!isShowValue && lable}
          {isShowValue && values.length === 0 && lable}
          {isShowValue && (
            <Text textAlign={"left"}>
              {values
                .map(
                  (value) => data.find((item) => item.value === value)?.label
                )
                .join(", ")}
            </Text>
          )}
          <ChevronDownIcon color="rgba(255, 255, 255, 0.48)" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        border="1px solid"
        borderColor="#2d2f34"
        backgroundColor={"#111419"}
        zIndex={999}
        w="fit-content"
        minW="200px"
      >
        <PopoverBody gap="25px" display="flex" flexDir="column" py="20px">
          {data.map((item, index) => (
            <Flex
              onClick={() => onSelected(item.value)}
              _hover={{ cursor: "pointer" }}
              w="full"
              gap="10px"
              key={index}
              alignItems="center"
            >
              <Flex
                w="20px"
                h="20px"
                border=""
                borderColor="rgba(255,255,255, 0.3)"
                borderRadius="5px"
                cursor="pointer"
              >
                {values.includes(item.value) && (
                  <ChevronDownIcon color={"white"} />
                )}
              </Flex>
              <Text color="rgba(255,255,255, 0.5)">{item.label}</Text>
              <Text
                fontSize="10px"
                bg="rgba(255,255,255, 0.08)"
                borderRadius="full"
                px="5px"
                fontWeight={500}
                color={"white"}
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
