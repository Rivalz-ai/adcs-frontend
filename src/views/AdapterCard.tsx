import { AdaptorItem } from "@/types/adapter-type";
import { Box, Flex, Image, Spacer, Text, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface AdapterCardProps {
  item: AdaptorItem;
  isMe?: boolean;
}

export default function AdapterCard({ item, isMe }: AdapterCardProps) {
  return (
    <Link
      href={
        !isMe
          ? `/adaptor/detail/${item.jobId}`
          : `/adaptor/create/${item.jobId}`
      }
    >
      <Flex
        bgGradient="linear(to-b, #1b103d, #181a37)"
        p="6"
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
        <Flex alignItems="flex-start" mb="4" flexDir="column">
          <Image
            src={item.iconUrl || "/cat.jpeg"}
            alt={item.name}
            boxSize="50px"
            borderRadius="md"
          />
          <Box mt="10px">
            <Tooltip label={item.jobId}>
              <Text color="gray.400" fontSize="xs">
                {item.jobId.substring(0, 10)}...
              </Text>
            </Tooltip>
            <Text
              fontWeight="semibold"
              fontSize="lg"
              color="white"
              textTransform="uppercase"
            >
              {item.name}
            </Text>
          </Box>
        </Flex>

        <Spacer />

        <Flex mt="4" flexDir="column" gap="5px">
          <Flex justifyContent="space-between">
            <Text color="rgba(255, 255, 255, 0.48)" fontSize="14px">
              REQUESTS
            </Text>
            <Text color="rgba(255, 255, 255, 0.48)" fontSize="14px">
              {item.requests || 0}
            </Text>
          </Flex>

          <Flex w="full" h="1px" bg="rgba(255, 255, 255, 0.08)" />
          <Flex justifyContent="space-between" mt="2">
            <Text
              color="rgba(255, 255, 255, 0.48)"
              fontSize="14px"
              textTransform="uppercase"
            >
              Category
            </Text>
            <Text
              color="rgba(255, 255, 255, 0.48)"
              fontSize="14px"
              fontWeight="500"
              textTransform="uppercase"
            >
              {item.categoryName}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}
