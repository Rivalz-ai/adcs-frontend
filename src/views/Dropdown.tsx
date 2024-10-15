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
        minW="150px"
        _active={{
          bgGradient: "linear(to-b, #1b103d, #181a37)",
          fontWeight: "bold",
          color: "rgba(255, 255, 255, 0.8)",
        }}
      >
        {data.find((item) => item.value === value)?.label || lable}
      </MenuButton>
      <MenuList
        bgGradient="linear(to-b, #1b103d, #181a37)"
        color="rgba(255, 255, 255, 0.48)"
        border="1px solid"
        borderColor="rgba(255,255,255, 0.08)"
        minH="50px"
        maxH="150px"
        overflowY="auto"
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
