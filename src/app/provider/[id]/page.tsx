"use client";
import useExecuteProvider from "@/libs/hooks/apis/useExecuteProvider";
import useProviderDetail from "@/libs/hooks/apis/useProviderDetail";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Spacer,
  Divider,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ReactJson from "react-json-view";

export default function ProviderPageDetail({
  params,
}: {
  params: { id: string };
}) {
  const [isTrigger, setIsTrigger] = useState(false);

  const { data: detail } = useProviderDetail(params.id);
  const { dataExecute, isLoadingExecute, refetchExecute } = useExecuteProvider(
    isTrigger,
    detail?.exampleCall
  );

  const onHandleExecute = () => {
    if (!isTrigger) {
      setIsTrigger(true);
    } else {
      refetchExecute();
    }
  };

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
          <Heading size="lg" textTransform="capitalize">
            {detail?.name}
          </Heading>
          <Text
            color="gray.400"
            as="pre"
            whiteSpace="pre-wrap"
            overflow="hidden"
            pr="50px"
            display={{ base: "none", lg: "block" }}
          >
            {detail?.description}
          </Text>
        </Box>
        <Spacer />
      </Flex>

      {/* Query Section */}
      <Box bg="gray.800" p="4" borderRadius="lg">
        <Flex mb="4" align="center">
          <Flex flexDir="column">
            <Text fontSize="lg" fontWeight="bold" cursor="pointer">
              Playground
            </Text>
            <Text
              color="gray.400"
              as="pre"
              whiteSpace="pre-wrap"
              overflow="hidden"
              pr="50px"
            >
              ({detail?.endpoint})
            </Text>
          </Flex>
          <Spacer />
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
          <Flex flex={1} minH="60vh" flexDir="column" p="10px" gap="20px">
            <Button
              onClick={onHandleExecute}
              w="fit-content"
              bgColor="#6a667b"
              color="white"
              isDisabled={isLoadingExecute}
              isLoading={isLoadingExecute}
            >
              Execute
            </Button>

            {dataExecute && <ReactJson src={dataExecute} theme="railscasts" />}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
