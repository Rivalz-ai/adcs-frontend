import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

interface AiTagProps extends FlexProps {
  aiModel: string;
}

export default function AiTag({ aiModel, ...props }: AiTagProps) {
  return (
    <Flex
      color="#94979C"
      position="absolute"
      px="4"
      bg="#23262E"
      fontWeight="semibold"
      fontSize="10px"
      paddingX={"5"}
      py={"2px"}
      right="5"
      top="0px"
      justifyContent="center"
      borderBottomRadius="10px"
      textTransform="capitalize"
      
      zIndex={999}
      {...props}
    >
      {aiModel}
    </Flex>
  );
}
