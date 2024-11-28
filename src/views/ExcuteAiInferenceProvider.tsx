"use client";
import { AI_INFERENCE_ID } from "@/libs/cons";
import useExcuteCrulProvider from "@/libs/hooks/apis/useExcuteCrulProvider";
import useGetAllProvider from "@/libs/hooks/apis/useGetAllProvider";
import { ParsedCurl } from "@/libs/utls/parse-curl";
import { Box, Button, Flex, FlexProps, BoxProps } from "@chakra-ui/react";
import React from "react";
import ReactJson from "react-json-view";

interface ExcuteAiInferenceProviderProps extends FlexProps {
  providerId: number;
  content: string;
  dataTypeId: number;
  categoryId: number;
  boxProps?: BoxProps;
}

export default function ExcuteAiInferenceProvider({
  providerId,
  content,
  dataTypeId,
  categoryId,
  boxProps,
  ...props
}: ExcuteAiInferenceProviderProps) {
  const { data: dataProvider } = useGetAllProvider();

  const {
    mutate: executeCurl,
    isPending: isLoadingExecuteCurl,
    data: dataExecuteCurl,
  } = useExcuteCrulProvider();

  const onHandleExecute = () => {
    const provider = dataProvider?.find((p) => p.id === providerId);
    if (!provider) return;

    const parsed: ParsedCurl = {
      url: provider.endpoint,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { content, dataTypeId },
    };
    if (parsed.url && parsed.method && parsed.data) {
      executeCurl(parsed);
      return;
    }
  };

  if (
    categoryId !== AI_INFERENCE_ID ||
    !content ||
    !providerId ||
    !dataTypeId
  ) {
    return null;
  }

  return (
    <Flex
      w="80%"
      flexDir="column"
      gap="20px"
      bg="gray.800"
      rounded="xl"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.08)"
      boxShadow="lg"
      py="20px"
      px="20px"
      borderRadius="20px"
      mx="auto"
      {...props}
    >
      <Box
        mt="4"
        fontFamily="monospace"
        bg="gray.900"
        p="4"
        minH="10vh"
        borderRadius="md"
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
        {...boxProps}
      >
        <Flex flex={1} minH="60vh" flexDir="column" p="10px" gap="20px">
          <Button
            onClick={onHandleExecute}
            w="fit-content"
            bgColor="#6a667b"
            color="white"
            isDisabled={isLoadingExecuteCurl}
            isLoading={isLoadingExecuteCurl}
          >
            Execute
          </Button>

          {dataExecuteCurl && (
            <ReactJson src={dataExecuteCurl} theme="railscasts" />
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
