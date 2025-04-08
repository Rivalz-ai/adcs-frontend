"use client";
import { Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSearchAdaptorState } from "@/libs/hooks/stores/useSearchAdaptor";

export default function SearchBar() {
  return (
    <Flex
      w="full"
      flexDir="column"
      gap="2"
      justifyContent="left"
      alignItems="left"
      mb="4"
      pt={{ base: "5", lg: "12" }}
      textAlign="left"
    >
      <Text color="white" as="h1" fontSize="5xl" fontWeight="bold" mb="1">
        Explore Adaptors
      </Text>
      <Text color="#94979C" fontSize="xl" maxW="59rem" lineHeight="tight">
        Adaptor is a customizable template that structures off-chain inference
        requests, ensuring data flow between on–chain and off–chain
        environments.
      </Text>
      
    </Flex>
  );
}
