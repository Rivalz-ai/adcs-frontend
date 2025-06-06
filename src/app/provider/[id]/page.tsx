"use client";
import useProviderDetail from "@/libs/hooks/apis/useProviderDetail";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  GridItem,
  Grid,
  Button,
  WrapItem,
  Wrap,
  Badge,
} from "@chakra-ui/react";
import { CopyIcon, ExternalLinkIcon, Github } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FaGlobeAfrica } from "react-icons/fa";
import Playground from "./components/Playground";

export default function ProviderPageDetail({
  params,
}: {
  params: { id: string };
}) {
  const [tab, setTab] = useState("code");

  const { data: detail } = useProviderDetail(params.id);

  return (
    <Box pb={"6"} minH="100vh" color="white">
      <Flex
        w="full"
        flexDir="column"
        gap="2"
        justifyContent="left"
        alignItems="left"
        mb="4"
        pt={{ base: "5", lg: "6" }}
        textAlign="left"
      >
        <Text color="white" as="h1" fontSize="5xl" fontWeight="bold">
          Explore Providers
        </Text>
        <Text color="#94979C" fontSize="xl" maxW="59rem" lineHeight="tight">
          Data Providers fuel Adaptors by supplying real-time or structured
          data, enabling AI-powered insights. Verified and monetizable, they
          ensure accurate, scalable, and reliable off-chain inference.
        </Text>
      </Flex>

      <Flex
        align={{ base: "start", lg: "center" }}
        mb="4rem"
        mt={"74px"}
        flexDir={{ base: "column", lg: "row" }}
        gap={{ base: "15px", lg: "5px" }}
        bg="radial-gradient(70.61% 50% at 50% 50%, rgba(31, 31, 31, 0.5) 0%, rgba(19, 22, 27, 0.5) 100%)"
        border="1px solid #272637"
        backdropFilter="blur(10px)"
        borderRadius={"10px"}
        py={"16px"}
        px={{ base: "15px", md: "16px" }}
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
            <Heading size="20px" fontWeight={"bold"} textTransform="capitalize">
              {detail?.name}
            </Heading>
            <Flex mt="2" justifyContent={{ base: "center", sm: "flex-start" }}>
              <Text fontSize="sm" color="#94979C">
                {detail?.description}
              </Text>
            </Flex>
          </Box>
        </Flex>

        <Flex maxW={{ base: "full" }} w={"full"} py={{ base: "15px", lg: "0" }}>
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
                    {detail?.requestCount || 0}
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
                    {detail?.category || "--- ---"}
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
      </Flex>

      <Box
        background="radial-gradient(70.61% 50% at 50% 50%, rgba(31, 31, 31, 0.5) 0%, rgba(19, 22, 27, 0.5) 100%)"
        backdropFilter="blur(10px)"
        border={"1px solid #23262E"}
        p="4"
        borderRadius="lg"
      >
        <Grid
          templateColumns="repeat(3, 1fr)"
          alignItems="center"
          borderRadius="md"
        >
          {[
            { name: "Code Example", key: "code" },
            { name: "Playground", key: "Playground" },
            { name: "About", key: "About" },
          ].map(({ name, key }) => (
            <GridItem key={key}>
              <Box
                p={3}
                borderTopRadius="lg"
                bg={tab === key ? "#23262e" : "rgb(19,22,27)"}
                color={tab === key ? "#69FF93" : "#7E8084"}
                fontWeight={tab === key ? "bold" : "bold"}
                cursor="pointer"
                fontSize={{ base: "8px", sm: "12px", md: "16px" }}
                onClick={() => setTab(key)}
                _hover={{ color: "#69FF93", bg: "#23262e" }}
              >
                {name}
              </Box>
            </GridItem>
          ))}
        </Grid>

        <Box
          fontFamily="monospace"
          bg="transparent"
          minH="30vh"
          borderRadius="md"
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
        >
          {tab === "code" && (
            <Flex
              w={"full"}
              minH="30vh"
              borderBottomRadius={"lg"}
              bg={"#0C0E12"}
              color={"#49B267"}
              flexDirection="column"
              gap="5px"
              p="4"
              justifyContent="space-between"
              // alignItems="center"
            >
              {detail?.documentLink && (
                <Link href={detail?.documentLink} target="_blank">
                  <Flex alignItems="center" gap="5px">
                    <Text fontSize="16px" color="#94979C">
                      {detail.documentLink}
                    </Text>
                    <ExternalLinkIcon />
                  </Flex>
                </Link>
              )}
              {!detail?.documentLink && (
                <Flex alignItems="center" justifyContent="center" gap="5px">
                  <Text fontSize="16px" color="#94979C">
                    No documentation available
                  </Text>
                </Flex>
              )}
            </Flex>
          )}

          {tab === "Playground" && (
            <Playground
              methods={detail?.methods || []}
              providerId={params.id}
            />
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
                {detail?.description}
              </Text>

              <Flex
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
          )}
        </Box>
      </Box>
    </Box>
  );
}
