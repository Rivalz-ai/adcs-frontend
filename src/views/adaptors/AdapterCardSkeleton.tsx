import { SKELETON_COLORS } from "@/libs/cons";
import { Divider, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
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
      <Skeleton w="80px" h="80px" borderRadius="md" {...SKELETON_COLORS} />
      <Flex mt="4" alignItems="center" gap="10px">
        <SkeletonCircle size="5" {...SKELETON_COLORS} />
        <Skeleton w="full" h="15px" {...SKELETON_COLORS} />
      </Flex>

      <Flex mt="4" alignItems="center" gap="10px">
        <Skeleton w="full" h="25px" {...SKELETON_COLORS} />
        <Skeleton w="full" h="25px" {...SKELETON_COLORS} />
      </Flex>

      <Flex mt="4" alignItems="center" gap="10px">
        <Skeleton w="full" h="25px" {...SKELETON_COLORS} />
        <Skeleton w="full" h="25px" {...SKELETON_COLORS} />
      </Flex>

      <Divider />

      <Flex mt="4" alignItems="center" gap="10px">
        <Skeleton flex={1} h="15px" {...SKELETON_COLORS} />
        <Skeleton flex={2} h="15px" {...SKELETON_COLORS} />
      </Flex>

      <Flex mt="4" alignItems="center" gap="10px">
        <Skeleton flex={1} h="15px" {...SKELETON_COLORS} />
        <Skeleton flex={2} h="15px" {...SKELETON_COLORS} />
      </Flex>
    </Flex>
  );
}
