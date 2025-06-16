"use client";
import { Flex, Text, SimpleGrid } from "@chakra-ui/react";

import React from "react";
import { useGetNetwork } from "./hooks/api";
import NetworkItemCom from "./components/network-item-com";
import NetworkItemSkeleton from "./components/network-item-skeleton";

export default function NetworkPage() {
  const { data: networks, isLoading } = useGetNetwork();
  return (
    <div style={{ marginBottom: "20px" }}>
      <Flex
        w="full"
        flexDir="column"
        gap="2"
        justifyContent="left"
        alignItems="left"
        mb="10"
        pt={{ base: "5", lg: "14" }}
        textAlign="left"
      >
        <Text color="white" as="h1" fontSize="5xl" fontWeight="bold" mb="1">
          Network Integration Partners
        </Text>
      </Flex>

      <SimpleGrid
        w="full"
        columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
        gap="20px"
      >
        {!isLoading &&
          networks?.map((network) => (
            <NetworkItemCom key={network.id} network={network} />
          ))}

        {isLoading &&
          Array.from({ length: 12 }).map((_, index) => (
            <NetworkItemSkeleton key={index} />
          ))}
      </SimpleGrid>
    </div>
  );
}
