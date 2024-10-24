import { Flex } from "@chakra-ui/react";
import React from "react";
import GetPrice from "@/views/GetPrice";
import GetMemeCoint from "@/views/GetMemeCoint";

const Category = {
  GET_PRICE: 5,
  MEME_COINT: 6,
};

interface PlaygroundContainerProps {
  categoryId: number;
}

export default function PlaygroundContainer({
  categoryId,
}: PlaygroundContainerProps) {
  return (
    <Flex flex={1} flexDir="column">
      {categoryId === Category.GET_PRICE && <GetPrice />}
      {categoryId === Category.MEME_COINT && <GetMemeCoint />}
    </Flex>
  );
}
