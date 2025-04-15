"use client";
import { AI_INFERENCE_ID } from "@/libs/cons";
import useExcuteCrulProvider from "@/libs/hooks/apis/useExcuteCrulProvider";
import useGetAllProvider from "@/libs/hooks/apis/useGetAllProvider";
import { ParsedCurl } from "@/libs/utls/parse-curl";
import { Box, Button, Flex, FlexProps, BoxProps } from "@chakra-ui/react";
import React from "react";
import { FaPlay } from "react-icons/fa";
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
            isDisabled={isLoadingExecuteCurl}
            isLoading={isLoadingExecuteCurl}
            leftIcon={<FaPlay />}
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
            Execute
          </Button>

          {dataExecuteCurl && (
            <>
              
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
              src={dataExecuteCurl}  />
            </Box>
            </>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
