"use client";
import useExcuteCrulProvider from "@/libs/hooks/apis/useExcuteCrulProvider";
import useExecuteProvider from "@/libs/hooks/apis/useExecuteProvider";
import useProviderDetail from "@/libs/hooks/apis/useProviderDetail";
import { parseCurl } from "@/libs/utls/parse-curl";
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

  const {
    mutate: executeCurl,
    isPending: isLoadingExecuteCurl,
    data: dataExecuteCurl,
  } = useExcuteCrulProvider();

  const onHandleExecute = () => {
    const parsed = parseCurl(detail?.exampleCall || "");
    if (parsed.url && parsed.method && parsed.data) {
      executeCurl(parsed);
      return;
    }

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
            <Flex
              w="full"
              flexDir="column"
              gap="5px"
              borderRadius="md"
              p="4"
              bgColor="gray.900"
              mt="4"
            >
              <Text
                color="gray.400"
                as="pre"
                whiteSpace="pre-wrap"
                overflow="hidden"
                pr="50px"
              >
                Endpoint: {detail?.endpoint}
              </Text>
              <Text
                color="gray.400"
                as="pre"
                whiteSpace="pre-wrap"
                overflow="hidden"
                pr="50px"
              >
                Example: {detail?.exampleCall}
              </Text>
            </Flex>
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
              isDisabled={isLoadingExecute || isLoadingExecuteCurl}
              isLoading={isLoadingExecute || isLoadingExecuteCurl}
            >
              Execute
            </Button>

            {(dataExecute || dataExecuteCurl) && (
              <ReactJson
                src={dataExecute || dataExecuteCurl}
                theme="railscasts"
              />
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
