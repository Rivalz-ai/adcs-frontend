"use client";
import { Flex, Input, useToast } from "@chakra-ui/react";
import AppButton from "@/views/components/Button";
import { useState } from "react";

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function SubcribeForm() {
  const [userEmail, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const onSubscribe = async () => {
    if (!isValidEmail(userEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Subscribed!",
        description: "You have successfully subscribed to our newsletter.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        isLoading={isLoading}
      >
        Subscribe
      </AppButton>
    </Flex>
  );
}