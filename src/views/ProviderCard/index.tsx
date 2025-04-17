import { ProviderItem } from "@/types/provider-type";
import { Box, Flex, Image, Spacer, Text, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import AiTag from "./AiTag";

interface ProviderCard {
  item: ProviderItem;
}

export default function ProviderCard({ item }: ProviderCard) {
  return (
    <Link href={`/provider/${item.id}`}>
      <Flex
        bg="radial-gradient(70.61% 50% at 50% 50%, rgba(31, 31, 31, 0.5) 0%, rgba(19, 22, 27, 0.5) 100%)"
        border="1px solid #272637"
        backdropFilter="blur(10px)"
        _hover={{ borderColor: "#2D7D44" }}
        px="20px"
        pt={"42px"}
        pb={"20px"}
        rounded="xl"
        minH="384px"
        gap="10px"
        w="full"
        flexDir="column"
        cursor="pointer"
        position="relative"
        overflow="hidden"
      >
        {item.aiModel && <AiTag aiModel={item.aiModel} />}
        <Flex alignItems="flex-start" mb="4" flexDir="column">
          <Image
            src={
              item.iconUrl && item.iconUrl !== "null"
                ? item.iconUrl
                : "/cat.jpeg"
            }
            fallbackSrc="/cat.jpeg"
            alt={item.name}
            width="80px"
            height="80px"
            borderRadius="md"
          />

          <Box mt="26px">
            <Text
              fontWeight="semibold"
              fontSize="20px"
              color="white"
              textTransform="uppercase"
            >
              {item.name}
            </Text>
            <Tooltip label={item.name}>
              <Text mt={"9px"} color="#94979C" fontSize="16px">
                {item.description}
              </Text>
            </Tooltip>
          </Box>
        </Flex>

        <Spacer />

        <Flex mt="12" flexDir="column" gap="5px">
          <Flex w="full" h="1px" bg="rgba(255, 255, 255, 0.08)" />
          <Flex justifyContent="space-between" mt="2">
            <Text
              color="rgba(255, 255, 255, 0.48)"
              fontSize="14px"
              textTransform="uppercase"
            >
              Type:
            </Text>
            <Text
              color="white"
              fontSize="14px"
              fontWeight="bold"
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
