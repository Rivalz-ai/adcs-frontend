"use client";
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  Spacer,
  Image,
  Tooltip,
  Grid,
  GridItem,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Thead,
  Th,
  Badge,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import useAdaptorDetail from "@/libs/hooks/apis/useAdaptorDetail";
import CodeBlock from "@/views/CodeBlock";
import { useState } from "react";
import PlaygroundContainer from "./playground-container";
import SearchBar from "@/views/SearchBar";
import { FaGlobeAfrica } from "react-icons/fa";
import { CheckIcon, Github } from "lucide-react";

type TabType = "code" | "About" | "docs" | "Playground";

export default function AdaptorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: detail } = useAdaptorDetail(params.id);
  const [tab, setTab] = useState<TabType>("code");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // resets after 2 seconds
  };

  return (
    <>
      {tab === "code" && (
        <Flex
          w="1500px"
          h="1500px"
          borderRadius="full"
          bgColor="rgba(90, 254, 176, 0.10)"
          zIndex={-1}
          position="absolute"
          top="-50%"
          left="-50%"
          filter="blur(200px)"
        />
      )}

      <Box minH="100vh" color="white">
        <SearchBar />
        <Spacer mb={"4rem"} />

        <Flex
          align={{ base: "start", lg: "center" }}
          mb="3.7rem"
          flexDir={{ base: "column", lg: "row" }}
          gap={{ base: "15px", lg: "5px" }}
          borderRadius={"10px"}
          py={"18px"}
          px={{ base: "15px", md: "20px" }}
          background="radial-gradient(70.61% 50% at 50% 50%, rgba(31, 31, 31, 0.5) 0%, rgba(19, 22, 27, 0.5) 100%)"
          backdropFilter="blur(10px)"
          border="1px solid #272637"
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
                minW={"92px"}
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
                  pr={{ base: "0", sm: "50px" }}
                  // display={{ base: "none", lg: "block" }}
                >
                  {detail?.jobId.slice(0, 8)}
                </Text>
              </Flex>

              {/* <Text
              color="#94979C"
              as="pre"
              whiteSpace="pre-wrap"
              overflow="hidden"
              pr={{ base: "0", sm: "50px" }}
              display={{ base: "block", lg: "none" }}
            >
              {detail?.jobId.slice(0, 8) + "..." + detail?.jobId.slice(-8)}
            </Text> */}

              <Heading size="lg" textTransform="capitalize">
                {detail?.name}
              </Heading>
              <Flex
                mt="2"
                justifyContent={{ base: "center", sm: "flex-start" }}
              >
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
                leftIcon={copied ? <CheckIcon /> : <CopyIcon />}
                onClick={() => {
                  navigator.clipboard.writeText(detail?.jobId || "");
                  handleCopy();
                }}
                colorScheme="purple"
              >
                {copied ? "Copied!" : "Copy Job ID"}
              </Button>
            </Tooltip>
          </Box>
        </Flex>

        <Box
          bg="#0d1013"
          mb="4rem"
          border={"1px solid #23262E"}
          overflowX={"auto"}
          borderRadius={"10px"}
        >
          <Table minW={"803px"} w={"full"} variant="unstyled">
            <Thead bg={"#13161B"}>
              <Tr>
                <Th
                  color="#7E8084"
                  fontSize={"12px"}
                  textTransform="capitalize"
                >
                  Network
                </Th>
                <Th
                  color="#7E8084"
                  fontSize={"12px"}
                  textTransform="capitalize"
                >
                  Adaptor ID
                </Th>
                <Th
                  color="#7E8084"
                  fontSize={"12px"}
                  textTransform="capitalize"
                >
                  Category
                </Th>
                <Th
                  color="#7E8084"
                  fontSize={"12px"}
                  textTransform="capitalize"
                >
                  Variables
                </Th>
                <Th
                  color="#7E8084"
                  fontSize={"12px"}
                  textTransform="capitalize"
                >
                  Output Format
                </Th>
                <Th
                  color="#7E8084"
                  fontSize={"12px"}
                  textTransform="capitalize"
                >
                  Provider
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                {/* Network with Icon */}
                <Td>
                  <Flex align="center" gap={"8px"}>
                    <Image
                      borderRadius="full"
                      src={detail?.iconUrl || "/cat.jpeg"}
                      alt={detail?.name}
                      boxSize="24px"
                      fallbackSrc="/cat.jpeg"
                      objectFit="cover"
                      objectPosition="center"
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
          mb={"20px"}
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
                  fontSize={{ base: "12px", md: "16px" }}
                  onClick={() => setTab(key as TabType)}
                  _hover={{ color: "#69FF93", bg: "#23262e" }}
                >
                  {name}
                </Box>
              </GridItem>
            ))}
          </Grid>

          <Box
            bg="transarparent"
            // p="4"
            minH="30vh"
            borderRadius="md"
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            overflowX={"auto"}
          >
            {tab === "code" && (
              <Box position={"relative"}>
                <CodeBlock
                  code={detail?.exampleCode || ""}
                  language="solidity"
                />
              </Box>
            )}
            {tab === "Playground" && (
              <>
                <PlaygroundContainer
                  categoryId={detail?.categoryId || -1}
                  adaptor={detail}
                />
                {/* <Box
                  w={"full"}
                  minH="30vh"
                  borderBottomRadius={"lg"}
                  bg={"#0C0E12"}
                  color={"#49B267"}
                >
                  <Flex w="full" flexDir="column" gap="5px" p="4">
                    <Text
                      fontFamily="monospace"
                      as="pre"
                      whiteSpace="pre-wrap"
                      overflow="hidden"
                      pr="50px"
                      fontSize={"16px"}
                    >
                      Endpoint:
                    </Text>
                    <Text
                      fontFamily="monospace"
                      as="pre"
                      whiteSpace="pre-wrap"
                      overflow="hidden"
                      pr="50px"
                      fontSize={"16px"}
                    >
                      Example:
                    </Text>
                  </Flex>
                </Box> */}

                {/* <Box bg={"#0C0E12"} padding={"20px"} borderRadius={"10px"}>
                  <Box bg={"#13161b"} borderRadius={"10px"} padding={"5px"}>
                    <ReactJson
                      theme={{
                        base00: "#13161b", // Background color
                        base01: "#1c1f26", // Lighter background
                        base02: "#2e323c", // Selection background
                        base03: "#3e4451", // Comments, invisibles, line highlighting
                        base04: "#4b5263", // Darker foreground
                        base05: "#FFFFFF", // Default foreground
                        base06: "#d3dae3", // Light foreground
                        base07: "#e6e9ef", // Light background
                        base08: "#f2777a", // Variables, XML tags, markup link text, markup lists, diff deleted
                        base09: "#F9C981", // Integers, booleans, constants, XML attributes, markup link URLs
                        base0A: "#ffcc66", // Classes, markup bold, search text background
                        base0B: "#F9C981", // Strings, inherited class, markup code, diff inserted
                        base0C: "#99cc99", // Support, regular expressions, escape characters, markup quotes
                        base0D: "#94979C", // Functions, methods, attribute IDs, headings
                        base0E: "#cc99cc", // Keywords, storage, selector, markup italic, diff changed
                        base0F: "#d27b53", // Deprecated, opening/closing embedded language tags, e.g. <?php ?>
                      }}
                      src={{}}

                      // theme="railscasts"
                    />
                  </Box>
                </Box>
                <Text
                  w="fit-content"
                  px={"16px"}
                  py={"10px"}
                  my={"4"}
                  fontWeight="700"
                  fontSize="20px"
                  lineHeight="16px"
                  color="#69FF93"
                >
                  Results
                </Text> */}

                {/* <Box bg={"#0C0E12"} padding={"20px"} borderRadius={"10px"}>
                  <Box bg={"#13161b"} borderRadius={"10px"} padding={"5px"}>
                    <ReactJson
                      theme={{
                        base00: "#13161b", // Background color
                        base01: "#1c1f26", // Lighter background
                        base02: "#2e323c", // Selection background
                        base03: "#3e4451", // Comments, invisibles, line highlighting
                        base04: "#4b5263", // Darker foreground
                        base05: "#FFFFFF", // Default foreground
                        base06: "#d3dae3", // Light foreground
                        base07: "#e6e9ef", // Light background
                        base08: "#f2777a", // Variables, XML tags, markup link text, markup lists, diff deleted
                        base09: "#F9C981", // Integers, booleans, constants, XML attributes, markup link URLs
                        base0A: "#ffcc66", // Classes, markup bold, search text background
                        base0B: "#F9C981", // Strings, inherited class, markup code, diff inserted
                        base0C: "#99cc99", // Support, regular expressions, escape characters, markup quotes
                        base0D: "#94979C", // Functions, methods, attribute IDs, headings
                        base0E: "#cc99cc", // Keywords, storage, selector, markup italic, diff changed
                        base0F: "#d27b53", // Deprecated, opening/closing embedded language tags, e.g. <?php ?>
                      }}
                      src={{}}

                      // theme="railscasts"
                    />
                  </Box>
                </Box>
                <Button
                  leftIcon={<CopyIcon />}
                  bg="rgb(15,18,22)"
                  border={"1px solid #2D7D44"}
                  color={"#3BB25D"}
                  borderRadius={"10px"}
                  _hover={{
                    bg: "#69FF93",
                    color: "black",
                  }}
                  w="fit-content"
                  px={"16px"}
                  py={"10px"}
                  my={"4"}
                  bgColor="transparent"
                >
                  Copy Results
                </Button> */}
              </>
            )}
            {tab === "About" && (
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
                  There should be some text, description or something like that
                  here. Write something important here.
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

                <Box
                  mt={"6px"}
                  bg="#0E0E0E"
                  color="white"
                  borderRadius="md"
                  maxW="600px"
                >
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
                          ? new Date(detail.createdAt).toLocaleDateString(
                              "en-GB"
                            )
                          : "N/A"}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="16px" color="#94979C">
                        LAST UPDATED:
                      </Text>
                      <Text fontSize="16px">
                        {detail?.updatedAt
                          ? new Date(detail.updatedAt).toLocaleDateString(
                              "en-GB"
                            )
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
                      {["DEFI", "MARKETPLACES", "INFRASTRUCTURE"].map(
                        (type, index) => (
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
                        )
                      )}
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
