"use client";

import { useState } from "react";
import { Box, Flex, Input, Button, Text, useToast } from "@chakra-ui/react";
import { X } from "lucide-react";
import { FaCheckDouble } from "react-icons/fa";
import { useCreateKey } from "./hooks/api";
import ListingKey from "./components/listing-key";

const MAX_LENGTH = 30;

export default function CreateApiKeyModal() {
  const [keyName, setKeyName] = useState("");
  const toast = useToast();

  const { createApiKey, isPendingCreateApiKey } = useCreateKey();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/ /g, "-");
    if (value.length <= MAX_LENGTH) {
      setKeyName(value);
    }
  };

  const handleGenerateApiKey = async () => {
    if (!keyName) {
      toast({
        title: "Fields Missing",
        description: "Please enter API Key Name.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await createApiKey({ keyName });
      setKeyName("");
      toast({
        title: "API Key Created",
        description: "API Key created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const isDisableSubmit =
    isPendingCreateApiKey || keyName.length === 0 || keyName.length < 5;

  return (
    <Flex
      py={"5rem"}
      justifyContent="center"
      gap={10}
      flexDirection={{ base: "column", sm: "row" }}
    >
      <Box
        bg="#0C0E12"
        borderRadius="10px"
        position="relative"
        maxWidth="682px"
        overflow={"hidden"}
        px={{ base: "19px", sm: "20px" }}
        py={"19px"}
        w={"full"}
        ml={"15px"}
      >
        <Flex
          w="1048px"
          h="1048px"
          borderRadius="full"
          bgColor="rgba(90, 254, 176, 0.15)"
          zIndex={0}
          position="absolute"
          top="-50%"
          left="-50%"
          filter="blur(400px)"
        />
        {/* Header */}
        <Box mb={"32px"}>
          <Flex justify="space-between" align="center" mb="8px">
            <Text
              pt={{ base: "20px", sm: "0" }}
              fontSize={{ base: "24px", sm: "32px", md: "42px", lg: "48px" }}
              fontWeight="bold"
              color="white"
              lineHeight="1.1"
            >
              Create a New API Key
            </Text>
            <Box
              rounded={"base"}
              position="absolute"
              border={"1px solid #94979C"}
              p={"1px"}
              right={{ base: 3, md: 6 }}
              top={{ base: 3, md: 6 }}
              bg="transparent"
              color="gray.400"
              _hover={{ bg: "transparent", color: "white" }}
            >
              <X size={18} />
            </Box>
          </Flex>

          {/* Description */}
          <Text
            color="#94979C"
            fontSize={{ base: "14px", md: "16px" }}
            maxW={"382px"}
          >
            You can restrict usage of this API Key to specific domains and
            Subgraphs after creation.
          </Text>
        </Box>

        {/* Form Container */}
        <Box
          sx={{
            background:
              "radial-gradient(70.61% 50% at 50% 50%, rgba(31, 31, 31, 0.5) 0%, rgba(19, 22, 27, 0.5) 100%)",
            border: "1px solid #272637",
            backdropFilter: "blur(10px)",
          }}
          borderRadius="10px"
          px="20px"
          py={"10px"}
        >
          {/* API Key Name Field */}
          <Box mb={{ base: "8", md: "10" }} pt={{ base: "25px", md: "35px" }}>
            <Flex justify="space-between" mb="16px">
              <Text
                color="white"
                fontSize={{ base: "18px", md: "20px" }}
                fontWeight="bold"
              >
                API Key Name:
              </Text>
              <Text color="#94979C" fontSize={{ base: "18px", md: "20px" }}>
                {keyName.length}/{MAX_LENGTH}
              </Text>
            </Flex>

            <Input
              placeholder="API Key Name"
              value={keyName}
              onChange={handleNameChange}
              maxLength={30}
              bg="#0D1521"
              fontSize="16px"
              _focus={{ boxShadow: "none" }}
              border="1px solid #272637"
              borderRadius={"10px"}
              bgColor="#13161B"
              color="#94979C"
              py={{ base: "18px", md: "22px" }}
              _placeholder={{
                color: "#94979C",
                fontSize: { base: "14px", md: "16px" },
              }}
              w="100%"
              size={{ base: "sm", md: "md" }}
            />
          </Box>

          <Flex
            mt="4"
            flexDirection={{ base: "column", sm: "row" }}
            gap={3}
            justify="flex-end"
            mb={3}
          >
            <Button
              leftIcon={<FaCheckDouble />}
              onClick={handleGenerateApiKey}
              isLoading={isPendingCreateApiKey}
              bg="rgb(15,18,22)"
              border={"1px solid #2D7D44"}
              color={"#3BB25D"}
              borderRadius={"10px"}
              py={{ base: "1px", lg: "21px" }}
              w={{ base: "full", sm: "unset" }}
              _hover={{
                bg: "#69FF93",
                color: "black",
              }}
              disabled={isDisableSubmit}
            >
              Create API Key
            </Button>
          </Flex>
        </Box>
      </Box>
      <ListingKey />
    </Flex>
  );
}
