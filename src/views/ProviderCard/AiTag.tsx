import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

interface AiTagProps extends FlexProps {
  aiModel: string;
}

export default function AiTag({ aiModel, ...props }: AiTagProps) {
  return (
    <Flex
      color="white"
      position="absolute"
      px="4"
      bg="#2a2052"
      fontWeight="semibold"
      fontSize="10px"
      padding="0.2rem 0.5rem"
      right="0"
      top="0px"
      justifyContent="center"
      borderBottomLeftRadius="xl"
      textTransform="capitalize"
      borderLeft="1px solid"
      borderBottom="1px solid"
      borderColor="rgba(255, 255, 255, 0.08)"
      zIndex={999}
      {...props}
    >
      {aiModel}
    </Flex>
  );
}
