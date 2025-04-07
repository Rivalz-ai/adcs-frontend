"use client";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Heading,
  Divider,
  Spacer,
  Image,
  Tooltip,
  SimpleGrid,
  Grid,
  GridItem,
  Center,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Thead,
  Th,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import useAdaptorDetail from "@/libs/hooks/apis/useAdaptorDetail";
import CodeBlock from "@/views/CodeBlock";
import { useState } from "react";
import PlaygroundContainer from "./playground-container";
import SearchBar from "@/views/SearchBar";

type TabType = "code" | "about" | "docs" | "Playground";

export default function AdaptorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: detail } = useAdaptorDetail(params.id);
  const [tab, setTab] = useState<TabType>("code");

  return (
    <Box minH="100vh" color="white">
      <SearchBar />
      <Spacer mb={"4.5rem"} />
      <Flex
        align={{ base: "start", lg: "center" }}
        mb="4rem"
        flexDir={{ base: "column", lg: "row" }}
        gap={{ base: "15px", lg: "5px" }}
        backgroundColor={"rgba(17,20,25,0.5)"}
        border="1px solid"
        borderColor="#272637"
        borderRadius={"10px"}
        py={"22px"}
        px={{ base: "15px", md: "20px" }}
      >
        <Flex
          borderRight={{ base: "none", lg: "0.5px solid #272637" }}
          maxW={"51rem"}
          w={"full"}
          pb={{ base: "15px", lg: "0" }}
          borderBottom={{ base: "0.5px solid #272637", lg: "none" }}
          flexDir={{ base: "column", sm: "row" }}
          align={{ base: "center", sm: "flex-start" }}
        >
          <Box>
            <Image
              src={detail?.iconUrl || "/cat.jpeg"}
              alt={detail?.name}
              width={"92px"}
              height={"92px"}
              style={{ borderRadius: "8px" }}
              fallbackSrc="/cat.jpeg"
            />
          </Box>
          <Box
            ml={{ base: "0", sm: "4" }}
            mt={{ base: "3", sm: "0" }}
            textAlign={{ base: "center", sm: "left" }}
          >
            <Flex
              gap={"10px"}
              alignItems={"center"}
              justifyContent={{ base: "center", sm: "flex-start" }}
            >
              <div
                style={{
                  height: "22px",
                  width: "22px",
                  backgroundColor: "#49B267",
                  borderRadius: "100%",
                }}
              >
                &nbsp;
              </div>
              <Text
                color="#94979C"
                as="pre"
                whiteSpace="pre-wrap"
                overflow="hidden"
                pr="50px"
                display={{ base: "none", lg: "block" }}
              >
                {detail?.jobId.slice(0, 8)}
              </Text>
            </Flex>

            <Text
              color="#94979C"
              as="pre"
              whiteSpace="pre-wrap"
              overflow="hidden"
              pr={{ base: "0", sm: "50px" }}
              display={{ base: "block", lg: "none" }}
            >
              {detail?.jobId.slice(0, 8) + "..." + detail?.jobId.slice(-8)}
            </Text>

            <Heading size="lg" textTransform="capitalize">
              {detail?.name}
            </Heading>
            <Flex mt="2" justifyContent={{ base: "center", sm: "flex-start" }}>
              <Text fontSize="sm" color="#94979C">
                {detail?.description}
              </Text>
            </Flex>
          </Box>
        </Flex>

        <Flex
          borderRight={{ base: "none", lg: "0.5px solid #272637" }}
          maxW={{ base: "full", lg: "34.5rem" }}
          w={"full"}
          py={{ base: "15px", lg: "0" }}
          borderBottom={{ base: "0.5px solid #272637", lg: "none" }}
        >
          <TableContainer w={"full"}>
            <Table variant="unstyled" size="sm">
              <Tbody>
                <Tr>
                  <Td
                    color={"#94979C"}
                    fontWeight="bold"
                    pl={{ base: "2", md: "4" }}
                  >
                    Requests:
                  </Td>
                  <Td
                    color={"white"}
                    textAlign="right"
                    pr={{ base: "2", md: "4" }}
                  >
                    {detail?.requests || 0}{" "}
                  </Td>
                </Tr>
                <Tr>
                  <Td
                    color={"#94979C"}
                    fontWeight="bold"
                    pl={{ base: "2", md: "4" }}
                  >
                    Category:
                  </Td>
                  <Td
                    color={"white"}
                    textAlign="right"
                    pr={{ base: "2", md: "4" }}
                  >
                    {detail?.categoryName || "--- ---"}
                  </Td>
                </Tr>
                <Tr>
                  <Td
                    color={"#94979C"}
                    fontWeight="bold"
                    pl={{ base: "2", md: "4" }}
                  >
                    Data Time:
                  </Td>
                  <Td
                    color={"white"}
                    textAlign="right"
                    pr={{ base: "2", md: "4" }}
                  >
                    {" "}
                    {new Date(detail?.createdAt || "").toLocaleString()}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>

        <Box
          w={{ base: "full", lg: "auto" }}
          display="flex"
          justifyContent={{ base: "center", lg: "flex-start" }}
        >
          <Tooltip label="Copy Job ID" hasArrow>
            <Button
              ml={{ base: "0", lg: "22px" }}
              minW={"160px"}
              bg="rgb(15,18,22)"
              border={"1px solid #2D7D44"}
              color={"#3BB25D"}
              borderRadius={"10px"}
              py={"21px"}
              _hover={{
                bg: "#69FF93",
                color: "black",
              }}
              leftIcon={<CopyIcon />}
              onClick={() => {
                navigator.clipboard.writeText(detail?.jobId || "");
              }}
              colorScheme="purple"
            >
              Copy Job ID
            </Button>
          </Tooltip>
        </Box>
      </Flex>

      <Box
        bg="#0d1013"
        mb="4rem"
        border={"1px solid #23262E"}
        overflow={"hidden"}
        borderRadius={"10px"}
      >
        <Table variant="unstyled">
          <Thead bg={"#13161b"}>
            <Tr>
              <Th color="#7E8084" fontSize={"sm"} textTransform="capitalize">
                Network
              </Th>
              <Th color="#7E8084" fontSize={"sm"} textTransform="capitalize">
                Adaptor ID
              </Th>
              <Th color="#7E8084" fontSize={"sm"} textTransform="capitalize">
                Category
              </Th>
              <Th color="#7E8084" fontSize={"sm"} textTransform="capitalize">
                Variables
              </Th>
              <Th color="#7E8084" fontSize={"sm"} textTransform="capitalize">
                Output Format
              </Th>
              <Th color="#7E8084" fontSize={"sm"} textTransform="capitalize">
                Provider
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {/* Network with Icon */}
              <Td>
                <Flex align="center">
                  <Image
                    borderRadius={"100%"}
                    src={detail?.iconUrl || "/cat.jpeg"}
                    alt={detail?.name}
                    boxSize="24px"
                    mr="2"
                  />
                  <Text fontSize="sm">{detail?.chainName || "--- ---"}</Text>
                </Flex>
              </Td>

              {/* Adaptor ID */}
              <Td>
                <Text fontSize="sm">
                  {detail?.id.toString().padStart(6, "0")}
                </Text>
              </Td>

              {/* Category */}
              <Td>
                <Text
                  bg={"#0d1013"}
                  fontSize="10px"
                  border={"1px solid #23262E"}
                  color={"white"}
                  borderRadius="full"
                  px="7px"
                  py={"2px"}
                  w={"fit-content"}
                  fontWeight={500}
                  textTransform="uppercase"
                >
                  {detail?.categoryName}
                </Text>
              </Td>

              {/* Variables */}
              <Td>
                <Text fontSize="sm">{detail?.variables || "From, to"}</Text>
              </Td>

              {/* Output Format */}
              <Td>
                <Text fontSize="sm">
                  {detail?.outputType.name || "Unit 256"}
                </Text>
              </Td>

              {/* Provider */}
              <Td>
                <Text fontSize="sm">
                  {detail?.providerName || "Oracle Token Price"}
                </Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      {/* Query Section */}
      <Box
        background="radial-gradient(70.61% 50% at 50% 50%, rgba(31, 31, 31, 0.5) 0%, rgba(19, 22, 27, 0.5) 100%)"
        backdropFilter="blur(10px)"
        border={"1px solid #23262E"}
        p="4"
        borderRadius="lg"
      >
        {/* <Flex mb="4" align="center">
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
            fontWeight={tab === "Playground" ? "bold" : "normal"}
            onClick={() => setTab("Playground")}
            cursor="pointer"
          >
            Playground
          </Text>
          <Spacer />
          <Text fontSize="lg" color="gray.400">
            About
          </Text>

          <Text fontSize="lg" color="gray.400" ml="4">
            Docs
          </Text>
        </Flex> */}

        <Grid
          templateColumns="repeat(3, 1fr)"
          alignItems="center"
          // borderBottom="1px solid"
          // borderColor="gray.700"
          // bg="blackAlpha.900"
          borderRadius="md"
        >
          {[
            { name: "Code Example", key: "code" },
            { name: "Playground", key: "Playground" },
            { name: "About", key: "About" },
            // { name: "Docs", key: "Docs" },
          ].map(({ name, key }) => (
            <GridItem key={key}>
              <Box
                p={3}
                borderTopRadius="lg"
                bg={tab === key ? "#23262e" : "rgb(19,22,27)"}
                color={tab === key ? "#69FF93" : "#7E8084"}
                fontWeight={tab === key ? "bold" : "bold"}
                cursor="pointer"
                onClick={() => setTab(key as TabType)}
                _hover={{ color: "#69FF93", bg: "#23262e" }}
              >
                {name}
              </Box>
            </GridItem>
          ))}
        </Grid>

        <Box
       
          fontFamily="monospace"
          bg="gray.900"
          // p="4"
          minH="30vh"
          borderRadius="md"
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
        >
          {tab === "code" && (
            <CodeBlock code={detail?.exampleCode || ""} language="solidity" />
          )}
          {tab === "Playground" && (
            <PlaygroundContainer
              categoryId={detail?.categoryId || -1}
              adaptor={detail}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
