"use client";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Heading,
  Divider,
  Spacer,
  Image,
  Tooltip,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import useAdaptorDetail from "@/libs/hooks/apis/useAdaptorDetail";
import CodeBlock from "@/views/CodeBlock";
import GetPrice from "@/views/GetPrice";
import { useState } from "react";

type TabType = "code" | "about" | "docs" | "price";

export default function AdaptorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: detail } = useAdaptorDetail(params.id);
  const [tab, setTab] = useState<TabType>("code");

  return (
    <Box p="6" minH="100vh" color="white">
      <Flex
        align={{ base: "start", lg: "center" }}
        mb="6"
        flexDir={{ base: "column", lg: "row" }}
        gap="5px"
      >
        <Box>
          <Image
            src={detail?.iconUrl || "/cat.jpeg"}
            alt={detail?.name}
            width={"80px"}
            height={"80px"}
            style={{ borderRadius: "8px" }}
            fallbackSrc="/cat.jpeg"
          />
        </Box>
        <Box ml={{ lg: "4" }}>
          <Text
            color="gray.400"
            as="pre"
            whiteSpace="pre-wrap"
            overflow="hidden"
            pr="50px"
            display={{ base: "none", lg: "block" }}
          >
            {detail?.jobId}
          </Text>
          <Text
            color="gray.400"
            as="pre"
            whiteSpace="pre-wrap"
            overflow="hidden"
            pr="50px"
            display={{ base: "block", lg: "none" }}
          >
            {detail?.jobId.slice(0, 8) + "..." + detail?.jobId.slice(-8)}
          </Text>
          <Heading size="lg" textTransform="capitalize">
            {detail?.name}
          </Heading>
          <Flex mt="2">
            <Text fontSize="sm" color="gray.400">
              {detail?.requests} Requests &bull;{" "}
              {new Date(detail?.createdAt || "").toLocaleString()}
            </Text>
          </Flex>
        </Box>
        <Spacer />

        <Tooltip label="Copy Job ID">
          <IconButton
            aria-label="More options"
            icon={<CopyIcon />}
            colorScheme="purple"
            ml="2"
            onClick={() => {
              navigator.clipboard.writeText(detail?.jobId || "");
            }}
          />
        </Tooltip>
      </Flex>

      <SimpleGrid
        bg="gray.800"
        p="4"
        borderRadius="lg"
        mb="6"
        columns={{ base: 2, lg: 5 }}
        gap="10px"
        rowGap="20px"
      >
        <Box>
          <Center flexDirection="column">
            <Text fontSize="sm" color="gray.400">
              NETWORK
            </Text>
            <Text fontSize="lg">{detail?.chainName || "--- ---"}</Text>
          </Center>
        </Box>

        <Box>
          <Center flexDirection="column">
            <Text fontSize="sm" color="gray.400">
              ADAPTOR ID
            </Text>
            <Flex align="center">
              <Text fontSize="lg">
                {detail?.id.toString().padStart(6, "0")}
              </Text>
            </Flex>
          </Center>
        </Box>

        <Box>
          <Center flexDirection="column">
            <Text fontSize="sm" color="gray.400">
              CATEGORY
            </Text>
            <Flex align="center">
              <Text fontSize="lg">{detail?.categoryName || "--- ---"}</Text>
            </Flex>
          </Center>
        </Box>

        <Box>
          <Center flexDirection="column">
            <Text fontSize="sm" color="gray.400" textTransform="uppercase">
              variables
            </Text>
            <Flex align="center">
              <Text fontSize="lg">{detail?.variables || "--- ---"}</Text>
            </Flex>
          </Center>
        </Box>

        <Box>
          <Center flexDirection="column">
            <Text fontSize="sm" color="gray.400" textTransform="uppercase">
              outputType
            </Text>
            <Flex align="center">
              <Text fontSize="lg">{detail?.outputType.name}</Text>
            </Flex>
          </Center>
        </Box>
      </SimpleGrid>

      {/* Query Section */}
      <Box bg="gray.800" p="4" borderRadius="lg">
        <Flex mb="4" align="center">
          <Text
            fontSize="lg"
            fontWeight={tab === "code" ? "bold" : "normal"}
            onClick={() => setTab("code")}
            cursor="pointer"
          >
            Code Example
          </Text>
          <Flex w="1px" h="20px" bg="gray.700" mx="4" />
          <Text
            fontSize="lg"
            fontWeight={tab === "price" ? "bold" : "normal"}
            onClick={() => setTab("price")}
            cursor="pointer"
          >
            Price
          </Text>
          <Spacer />
          <Text fontSize="lg" color="gray.400">
            About
          </Text>

          <Text fontSize="lg" color="gray.400" ml="4">
            Docs
          </Text>
        </Flex>
        <Divider />
        <Box
          mt="4"
          fontFamily="monospace"
          bg="gray.900"
          p="4"
          minH="30vh"
          borderRadius="md"
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
        >
          {tab === "code" && (
            <CodeBlock code={detail?.exampleCode || ""} language="solidity" />
          )}
          {tab === "price" && <GetPrice />}
        </Box>
      </Box>
    </Box>
  );
}
