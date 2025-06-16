import { Box, Flex, Spacer, Skeleton } from "@chakra-ui/react";
import React from "react";
import { SKELETON_COLORS } from "@/libs/cons";

export default function NetworkItemSkeleton() {
  return (
    <Box
      borderRadius="10px"
      borderWidth="1px"
      borderColor="#272637"
      padding="20px"
      bgGradient="radial-gradient(70.61% 50% at 50% 50%, rgba(31, 31, 31, 0.5) 0%, rgba(19, 22, 27, 0.5) 100%)"
      backdropFilter="blur(10px)"
      _hover={{ borderColor: "#2D7D44", cursor: "pointer" }}
      display="flex"
      flexDirection="column"
      gap="20px"
      overflow="hidden"
    >
      <Flex alignItems="flex-start">
        <Skeleton
          width="100px"
          height="100px"
          borderRadius="10px"
          mr="10px"
          {...SKELETON_COLORS}
        ></Skeleton>
        <Flex direction="column" flex="1">
          <Flex alignItems="start" justifyContent="space-between">
            <Skeleton
              width="100px"
              height="20px"
              borderRadius="10px"
              {...SKELETON_COLORS}
            />

            <Skeleton
              width="20px"
              height="20px"
              borderRadius="10px"
              {...SKELETON_COLORS}
            />
          </Flex>
          <div className="flex rounded-md w-fit mt-4">
            <Skeleton
              width="100px"
              height="20px"
              borderRadius="10px"
              {...SKELETON_COLORS}
            />
          </div>
        </Flex>
      </Flex>

      <Flex gap="10px" justifyContent="space-between" alignItems="center">
        <Skeleton
          width="100px"
          height="20px"
          borderRadius="10px"
          {...SKELETON_COLORS}
        />
        <Skeleton
          width="100px"
          height="20px"
          borderRadius="10px"
          {...SKELETON_COLORS}
        />

        <Spacer />

        <Skeleton
          width="20px"
          height="20px"
          borderRadius="10px"
          {...SKELETON_COLORS}
        />
      </Flex>
    </Box>
  );
}
