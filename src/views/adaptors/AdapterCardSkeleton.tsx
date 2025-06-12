import {
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";

export default function AdapterCardSkeleton() {
  return (
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
      <Skeleton w="80px" h="80px" borderRadius="md" />
      <Flex mt="4" alignItems="center" gap="10px">
        <SkeletonCircle size="5" />
        <Skeleton w="full" h="15px" />
      </Flex>

      <Flex mt="4" alignItems="center" gap="10px">
        <Skeleton w="full" h="25px" />
        <Skeleton w="full" h="25px" />
      </Flex>

      <Flex mt="4" alignItems="center" gap="10px">
        <Skeleton w="full" h="25px" />
        <Skeleton w="full" h="25px" />
      </Flex>

      <Divider />

      <Flex mt="4" alignItems="center" gap="10px">
        <Skeleton flex={1} h="15px" />
        <Skeleton flex={2} h="15px" />
      </Flex>

      <Flex mt="4" alignItems="center" gap="10px">
        <Skeleton flex={1} h="15px" />
        <Skeleton flex={2} h="15px" />
      </Flex>
    </Flex>
  );
}
