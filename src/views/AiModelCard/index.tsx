import CardAnimation from "@/components/share-component/card-animation";
import { IAiModel } from "@/libs/hooks/apis/useGetAiModel";
import { ProviderItem } from "@/types/provider-type";
import { Box, Flex, Image, Spacer, Text, Tooltip } from "@chakra-ui/react";
import React from "react";

interface AiModelCard {
  item: IAiModel;
}

export default function AiModelCard({ item }: AiModelCard) {
  return (
    <CardAnimation url={""}>
      <Flex alignItems="flex-start" mb="4" flexDir="column">
        <Image
          src={
            item.iconUrl && item.iconUrl !== "null" ? item.iconUrl : "/cat.jpeg"
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
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item.name}
          </Text>
          <Tooltip label={item.name}>
            <Text
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
              mt={"9px"}
              color="#94979C"
              fontSize="16px"
            >
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
            {item.type || "--- ---"}
          </Text>
        </Flex>
      </Flex>
    </CardAnimation>
  );
}
