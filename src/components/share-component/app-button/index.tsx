import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

export default function AppButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      fontSize={{ base: "14px", md: "16px" }}
      px={{ base: "12px", md: "16px" }}
      py={{ base: "8px", md: "10px" }}
      h={{ base: "40px", md: "44px" }}
      maxW={{ base: "120px", md: "140px" }}
      w="full"
      bg={props.disabled ? "#373A40" : "rgb(15,18,22)"}
      color={props.disabled ? "#616264" : "#3BB25D"}
      borderRadius="10px"
      border={props.disabled ? "none" : "1px solid #2D7D44"}
      _hover={
        props.disabled ? { bg: "#1C2A3A" } : { bg: "#69FF93", color: "black" }
      }
      {...props}
    >
      {children}
    </Button>
  );
}
