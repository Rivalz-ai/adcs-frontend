"use client";

import useGetAllAdaptor from "@/libs/hooks/apis/useGetAllAdaptor";
import AdapterCard from "@/views/AdapterCard";
import { FaCirclePlus } from "react-icons/fa6";
import {
  Button,
  Flex,
  Link,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function MyAdaptorPage() {
  const { data, isLoading } = useGetAllAdaptor();
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
          Your Adaptor
        </Text>
      </Flex>
      <Flex
        w="full"
        borderBottom="1px solid"
        borderColor="rgba(255, 255, 255, 0.08)"
        justifyContent="flex-end"
        pb="20px"
      >
        <Link href="/adaptor/create">
          <Button leftIcon={<FaCirclePlus />}>Create Adaptor</Button>
        </Link>
      </Flex>

      <SimpleGrid w="full" columns={{ base: 1, lg: 5 }} gap="20px">
        {data.map((item, i) => (
          <AdapterCard item={item} key={i} isMe />
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
