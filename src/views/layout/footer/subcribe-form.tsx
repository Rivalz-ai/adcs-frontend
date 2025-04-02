"use client";
import { Flex, Input } from "@chakra-ui/react";
import AppButton from "@/views/components/Button";
import { useState } from "react";

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function SubcribeForm() {
  const [userEmail, setEmail] = useState<string>("");

  const onSubscribe = async () => {};

  const onEmailChange = (v: string) => {
    setEmail(v);
  };

  return (
    <Flex gap="16px" flexDir={{ base: "column", lg: "row" }}>
      <Input
        placeholder="Enter your email"
        value={userEmail}
        borderRadius="10px"
        border="1px solid #373A40"
        bgColor="#13161B"
        color="white"
        _placeholder={{
          color: "#94979C",
        }}
        fontSize="16px"
        fontWeight="400"
        lineHeight="24px"
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <AppButton
        bgColor="#69FF93"
        color="#0C0E12"
        px="16px"
        py="10px"
        onClick={onSubscribe}
      >
        Subscribe
      </AppButton>
    </Flex>
  );
}
