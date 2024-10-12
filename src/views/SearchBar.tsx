"use client";
import { Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSearchAdaptorState } from "@/libs/hooks/stores/useSearchAdaptor";

export default function SearchBar() {
  const [search, setSearch] = useSearchAdaptorState();
  return (
    <Flex
      w="full"
      flexDir="column"
      gap="20px"
      justifyContent="center"
      alignItems="center"
      mb="40px"
      pt={{ base: "20px", lg: "50px" }}
    >
      <Text
        color="white"
        as="h1"
        fontSize={{ base: "20px", lg: "48px" }}
        fontWeight="bold"
      >
        Explore Adaptor
      </Text>
      <Flex
        bgGradient="linear(to-b, #1b103d, #181a37)"
        rounded="xl"
        border="1px solid"
        borderColor="#2d2f4a"
        boxShadow="lg"
        w={{ base: "80%", lg: "540px" }}
        minH={{ lg: "50px" }}
        borderRadius="full"
        overflow="hidden"
        px="5px"
        alignItems="center"
        position="relative"
      >
        <SearchIcon
          color="rgba(255, 255, 255, 0.48)"
          w="20px"
          h="20px"
          position="absolute"
          left="20px"
          zIndex={10}
        />
        <Input
          flex={1}
          border="0px"
          focusBorderColor="transparent"
          placeholder="Search by name, creator or ID"
          _placeholder={{ color: "rgba(255, 255, 255, 0.48)" }}
          color="white"
          fontSize={{ base: "14px", lg: "18px" }}
          fontWeight={500}
          pl="50px"
          py="10px"
          value={search.keySearch}
          onChange={(e) => {
            setSearch({ keySearch: e.target.value });
          }}
        />
      </Flex>
    </Flex>
  );
}
