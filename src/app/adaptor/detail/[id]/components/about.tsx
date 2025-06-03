import { AdaptorItem } from "@/types/adapter-type";
import Button from "@/views/components/Button";
import { Badge, Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { CopyIcon, Github } from "lucide-react";
import React from "react";
import { FaGlobeAfrica } from "react-icons/fa";

interface AboutProps {
  detail?: AdaptorItem;
}

export default function About({ detail }: AboutProps) {
  return (
    <Flex
      w={"full"}
      bg={"#0c0e12"}
      h={{ base: "unset", md: "635px" }}
      gap="20px"
      p="20px"
      flexDirection={"column"}
      borderBottomRightRadius="10px"
      borderBottomLeftRadius="10px"
    >
      <Text
        w={{ base: "unset", md: "502px" }}
        fontWeight="400"
        fontSize="16px"
        lineHeight="24px"
        letterSpacing="0px"
        color="#94979C"
      >
        There should be some text, description or something like that here.
        Write something important here.
      </Text>

      <Flex
        //  flexDirection={{ base: "column", md: "row" }}
        flexWrap={"wrap"}
        gap={{ base: "4px", md: "20px" }}
        mt={"6px"}
      >
        <Button
          bg="rgb(15,18,22)"
          border={"1px solid #2D7D44"}
          color={"#3BB25D"}
          borderRadius={"10px"}
          _hover={{
            bg: "#265C35",
            color: "#69FF93",
            borderColor: "#265C35",
          }}
          w="140px"
          h={"44px"}
          px={"16px"}
          py={"10px"}
          my={{ base: "4px", md: "4" }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <FaGlobeAfrica fontSize={"20px"} />
          Website
        </Button>
        <Button
          bg="rgb(15,18,22)"
          border={"1px solid #2D7D44"}
          color={"#3BB25D"}
          borderRadius={"10px"}
          _hover={{
            bg: "#265C35",
            color: "#69FF93",
            borderColor: "#265C35",
          }}
          w="140px"
          h={"44px"}
          px={"16px"}
          py={"10px"}
          my={{ base: "4px", md: "4" }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Github width={25} height={25} />
          Github
        </Button>
        <Button
          bg="rgb(15,18,22)"
          border={"1px solid #94979C"}
          color={"#94979C"}
          borderRadius={"10px"}
          _hover={{
            bg: "#94979C",
            color: "white",
            borderColor: "#265C35",
          }}
          w="140px"
          h={"44px"}
          px={"16px"}
          py={"10px"}
          my={{ base: "4px", md: "4" }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <CopyIcon fontSize={"20px"} />
          Token ID
        </Button>
      </Flex>

      <Box mt={"6px"} bg="#0E0E0E" color="white" borderRadius="md" maxW="600px">
        <Flex
          justify="space-between"
          mb={"40px"}
          maxW={"317px"}
          flexWrap={"wrap"}
          gap={{ base: "20px", md: "unset" }}
        >
          <Box>
            <Text fontSize="16px" color="#94979C">
              CREATED:
            </Text>
            <Text fontSize="16px">
              {detail?.createdAt
                ? new Date(detail.createdAt).toLocaleDateString("en-GB")
                : "N/A"}
            </Text>
          </Box>
          <Box>
            <Text fontSize="16px" color="#94979C">
              LAST UPDATED:
            </Text>
            <Text fontSize="16px">
              {detail?.updatedAt
                ? new Date(detail.updatedAt).toLocaleDateString("en-GB")
                : "N/A"}
            </Text>
          </Box>
        </Flex>

        <Box mb={{ base: 1, md: 3 }}>
          <Flex align="center" gap={2}>
            <Text fontSize="16px" color="#94979C">
              ENTITY TYPES:
            </Text>
            <Flex
              bg="#265C35"
              color="#69FF93"
              borderRadius="full"
              px={"10px"}
              py={"1px"}
              fontSize="16px"
              fontWeight={"normal"}
            >
              89
            </Flex>
          </Flex>

          <Wrap
            mt={{ base: "20px", md: "42px" }}
            spacingY="8px"
            spacingX={"16px"}
          >
            {[
              "FactoryDayData",
              "TokenDayData",
              "TokenHourData",
              "TokenPairDayData",
              "TokenPairDayData",
              "TokenDayData",
              "FactoryDayData",
              "TokenHourData",
              "FactoryDayData",
              "TokenDayData",
              "TokenHourData",
            ].map((item, index) => (
              <WrapItem key={index}>
                <Text fontSize="16px" color="#69FF93">
                  {item}
                </Text>
              </WrapItem>
            ))}

            <WrapItem>
              <Badge
                bg="#265C35"
                color="#69FF93"
                borderRadius="full"
                px={"10px"}
                py={"1px"}
                fontSize="16px"
                fontWeight={"normal"}
              >
                +78
              </Badge>
            </WrapItem>
          </Wrap>
        </Box>

        <Flex mt={"36px"} align="center" gap={2}>
          <Text fontSize="16px" color="#94979C">
            ENTITY TYPES:
          </Text>
          <Flex gap={2} wrap="wrap">
            {detail?.entities.map((type, index) => (
              <Badge
                key={index}
                px={"10px"}
                py={"2px"}
                fontSize="12px"
                borderRadius="full"
                fontWeight={"normal"}
                bg="transparent"
                border="1px solid #265C35"
                lineHeight={"16px"}
                color="#69FF93"
              >
                {type}
              </Badge>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
