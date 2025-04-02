import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";

export default function Marquee() {
  return (
    <Flex
      bg="linear-gradient(90deg, #69FF93 0%, #E5E18A 50%, #F9C981 100%)"
      w="full"
      h="44px"
      mb="20px"
    >
      <Flex
        w="full"
        maxW="1600px"
        h="full"
        mx="auto"
        justifyContent="center"
        alignItems="center"
        gap="8px"
      >
        <Image src="/icons/znoddes.svg" alt="znoddes" w="20px" h="20px" />
        <Text
          fontSize="14px"
          fontWeight="700"
          lineHeight="20px"
          color="#0C0E12"
          display={{ base: "none", lg: "inline-flex" }}
        >
          important information important information
        </Text>
        <Flex display="flex" alignItems="center" gap="8px">
          <Text
            fontSize="14px"
            fontWeight="700"
            lineHeight="20px"
            color="#0C0E12"
          >
            Learn more here
          </Text>
          <Image
            src="/icons/arrow-right.svg"
            alt="arrow-right"
            w="20px"
            h="20px"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
