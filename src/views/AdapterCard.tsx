import { AdaptorItem } from "@/types/adapter-type";
import { Box, Flex, Image, Text, Tooltip } from "@chakra-ui/react";
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
        backgroundColor={"rgba(17,20,25,0.5)"}
        padding="20px"
        rounded="xl"
        border="1px solid"
        borderColor="#272637"
        _hover={{ borderColor: "#2D7D44" }}
        boxShadow="lg"
        gap="10px"
        w="full"
        flexDir="column"
        cursor="pointer"
      >
        <Flex alignItems="flex-start" mb="4" flexDir="column">
          <Image
            src={item.iconUrl || "/cat.jpeg"}
            alt={item.name}
            boxSize="80px"
            borderRadius="md"
            fallbackSrc="/logo.png"
          />
          <Box mt="10px">
          <Tooltip label={item.jobId}>
              <Flex gap={"10px"} alignItems={"center"}>
                <div
                  style={{
                    height: "22px",
                    width: "22px",
                    backgroundColor: "#49B267",
                    borderRadius: "100%",
                  }}
                >
                  &nbsp;
                </div>
                <Text color="#94979C" fontSize="16px">
                  {item.jobId.substring(0, 10)}...
                </Text>
              </Flex>
            </Tooltip>
            <Text
              pt={"10px"}
              fontWeight="semibold"
              fontSize="lg"
              color="white"
              textTransform="uppercase"
               sx={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.name}
            </Text>
            <Text 
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
              pt={"10px"} fontSize="16px" color="#94979C">
  Description of the Adaptor, general information.
</Text>
          </Box>
        </Flex>

        {/* <Spacer /> */}

        <Flex mt="4" flexDir="column" gap="5px">
        <Flex w="full" h="1px" bg="rgba(255, 255, 255, 0.08)" />
          <Flex justifyContent="space-between">
            <Text color="rgba(255, 255, 255, 0.48)" fontSize="14px">
              REQUESTS
            </Text>
            <Text color="rgba(255, 255, 255, 0.48)" fontSize="14px">
              {item.requests || 0}
            </Text>
          </Flex>

          
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
          <Flex justifyContent="space-between" mt="2">
            <Text
              color="rgba(255, 255, 255, 0.48)"
              fontSize="14px"
              textTransform="uppercase"
            >
              Chain Type
            </Text>
            <Text
              color="rgba(255, 255, 255, 0.48)"
              fontSize="14px"
              fontWeight="500"
              textTransform="uppercase"
            >
              {item.chainType}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}
