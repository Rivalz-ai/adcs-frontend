"use client";
import React from "react";
import ProviderCard from "@/views/ProviderCard";
import { Flex, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import useGetAllProvider from "@/libs/hooks/apis/useGetAllProvider";

export default function ProviderPage() {
  const { data, isLoading } = useGetAllProvider();
  return (
    <Flex
      flex={1}
      flexDir="column"
      gap="30px"
      px={{ base: "20px", lg: "unset" }}
    >
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
          Explore Provider
        </Text>
      </Flex>

      <SimpleGrid w="full" columns={{ base: 1, lg: 5 }} gap="20px">
        {data.map((item, i) => (
          <ProviderCard item={item} key={i} />
        ))}
        {isLoading &&
          new Array(5).fill(0).map((_, index) => (
            <Flex
              key={index}
              bgGradient="linear(to-b, #1b103d, #181a37)"
              rounded="xl"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.08)"
              boxShadow="lg"
              h="322px"
              gap="10px"
              w="full"
              flexDir="column"
              cursor="pointer"
            >
              <Skeleton flex={1} color="#280495" />
            </Flex>
          ))}
      </SimpleGrid>
      <Flex w="full" justifyContent="center">
        {data.length === 0 && !isLoading && (
          <Text textAlign="center" color="rgba(255,255,255, 0.5)">
            No data found
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
