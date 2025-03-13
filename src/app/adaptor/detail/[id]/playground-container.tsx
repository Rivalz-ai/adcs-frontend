import { Flex } from "@chakra-ui/react";
import React from "react";
import GetPrice from "@/views/GetPrice";
import GetMemeCoint from "@/views/GetMemeCoint";
import { AdaptorItem } from "@/types/adapter-type";
import ExcuteAiInferenceProvider from "@/views/ExcuteAiInferenceProvider";
const Category = {
  GET_PRICE: 5,
  MEME_COINT: 6,
  AI_INFERENCE: 7,
};

interface PlaygroundContainerProps {
  categoryId: number;
  adaptor?: AdaptorItem;
}

export default function PlaygroundContainer({
  categoryId,
  adaptor,
}: PlaygroundContainerProps) {
  return (
    <Flex flex={1} flexDir="column">
      {categoryId === Category.GET_PRICE && <GetPrice />}
      {categoryId === Category.MEME_COINT && <GetMemeCoint />}
      {categoryId === Category.AI_INFERENCE && adaptor && (
        <ExcuteAiInferenceProvider
          providerId={adaptor.dataProviderId}
          content={adaptor.aiPrompt}
          dataTypeId={adaptor.outputTypeId}
          categoryId={categoryId}
          w="full"
          px="unset"
          py="unset"
          border="unset"
          shadow="unset"
          boxProps={{
            mt: "unset",
            p: "unset",
          }}
        />
      )}
    </Flex>
  );
}
