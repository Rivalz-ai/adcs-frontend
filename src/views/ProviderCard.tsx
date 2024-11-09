import { ProviderItem } from "@/types/provider-type";
import { Box, Flex, Image, Spacer, Text, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface ProviderCard {
  item: ProviderItem;
}

export default function ProviderCard({ item }: ProviderCard) {
  return (
    <Link href={`/provider/${item.id}`}>
      <Flex
        bgGradient="linear(to-b, #1b103d, #181a37)"
        p="6"
        rounded="xl"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.08)"
        boxShadow="lg"
        minH="322px"
        gap="10px"
        w="full"
        flexDir="column"
        cursor="pointer"
      >
        <Flex alignItems="flex-start" mb="4" flexDir="column">
          <Image
            src={item.iconUrl || "/cat.jpeg"}
            alt={item.name}
            borderRadius="md"
          />
          <Box mt="10px">
            <Text
              fontWeight="semibold"
              fontSize="lg"
              color="white"
              textTransform="uppercase"
            >
              {item.name}
            </Text>
            <Tooltip label={item.name}>
              <Text color="gray.400" fontSize="xs">
                {item.description}
              </Text>
            </Tooltip>
          </Box>
        </Flex>

        <Spacer />

        <Flex mt="4" flexDir="column" gap="5px">
          <Flex w="full" h="1px" bg="rgba(255, 255, 255, 0.08)" />
          <Flex justifyContent="space-between" mt="2">
            <Text
              color="rgba(255, 255, 255, 0.48)"
              fontSize="14px"
              textTransform="uppercase"
            >
              Type
            </Text>
            <Text
              color="rgba(255, 255, 255, 0.48)"
              fontSize="14px"
              fontWeight="500"
              textTransform="uppercase"
            >
              {item.type}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}
