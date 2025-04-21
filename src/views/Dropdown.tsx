import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import React from "react";

interface DropdownProps {
  lable: string;
  data: { value: string | number; label: string; subLabel?: string }[];
  value: string | number;
  onSelected: (value: string | number) => void;
}

export default function Dropdown({
  lable,
  data,
  value,
  onSelected,
}: DropdownProps) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
         borderRadius="10px"
         minH={{ lg: "44px" }}
        py="unset"
        fontWeight="normal"
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
        {data.find((item) => item.value === value)?.label || lable}
      </MenuButton>
      <MenuList
        bgColor="#131518"
        color="rgba(255, 255, 255, 0.48)"
        border="1px solid"
        borderColor="rgba(255,255,255, 0.08)"
        minH="50px"
        maxH="150px"
        overflowY="auto"
        zIndex={"9999"}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.08)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 255, 255, 0.48)",
            borderRadius: "20px",
          },
        }}
      >
        {data.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => onSelected(item.value)}
            bg="unset"
            py="10px"
            px="15px"
            borderBottom="1px solid"
            borderColor="rgba(255,255,255, 0.08)"
            _hover={{ color: "rgba(255, 255, 255, 0.8)" }}
          >
            {item.label}
          </MenuItem>
        ))}
        {data.length < 1 && (
          <MenuItem
            bg="unset"
            py="10px"
            px="15px"
            textAlign="center"
            justifyContent="center"
            fontSize="16px"
            fontWeight={500}
            _hover={{ color: "rgba(255, 255, 255, 0.8)" }}
          >
            No data
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
