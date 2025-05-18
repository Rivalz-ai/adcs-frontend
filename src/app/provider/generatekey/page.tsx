"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Switch,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { AlertCircle,CheckIcon,X } from "lucide-react";
import { FaCheckDouble } from "react-icons/fa";
import { CopyIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useAccount, useSignMessage } from "wagmi";




export default function CreateApiKeyModal() {
  const [keyName, setKeyName] = useState("");
  const [spendingLimit, setSpendingLimit] = useState("");
  const [enableLimit, setEnableLimit] = useState(false);
  const [isNameError, setIsNameError] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [copied, setcopied] = useState(false);
  const toast = useToast();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  interface HandleNameChangeEvent {
    target: {
      value: string;
    };
  }

  interface HandleSpendingLimitChangeEvent {
    target: {
      value: string;
    };
  }
  

  const handleNameChange = (e: HandleNameChangeEvent): void => {
    setKeyName(e.target.value);
    if (e.target.value.trim() === "") {
      setIsNameError(true);
    } else {
      setIsNameError(false);
    }
  };

  

  const handleSpendingLimitChange = (
    e: HandleSpendingLimitChangeEvent
  ): void => {
    // Only allow numeric input
    const value = e.target.value.replace(/[^0-9]/g, "");
    setSpendingLimit(value);
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

    setLoading(true);

    try {
      if (!isConnected) {
        toast({
          title: "Wallet Not Connected",
          description: "Please connect your wallet.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      const message = "Welcome to ADCS.";
      const signature = await signMessageAsync({ message });

      const verifyResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/verify`,
        { message, signature }
      );

      const accessToken = verifyResponse.data.accessToken;

      const apiKeyResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/api-key/${keyName}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const generatedApiKey = apiKeyResponse.data.data;
      setApiKey(generatedApiKey);
      setKeyName("");

      toast({
        title: "API Key Generated",
        description: "API Key generated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "An error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex py={"5rem"} justifyContent="center">
      <Box
        bg="#0C0E12"
        // border={"1px solid white"}
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
              //   fontSize="48px"
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
                {keyName.length}/30
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

            {isNameError && (
              <Flex align="center" mt="5" color="#F56565">
                <AlertCircle size={16} style={{ marginRight: "10px" }} />
                <Text fontSize={{ base: "14px", md: "16px" }}>
                  The API Key name is required
                </Text>
              </Flex>
            )}
          </Box>

          {/* Divider */}
          <Box borderBottom="1px solid rgba(255, 255, 255, 0.1)" my="6"></Box>

          {/* Enable Period Spending Limit */}
          <Flex align="center" mb="6" py={"1px"}>
            <Switch
              isChecked={enableLimit}
              onChange={() => setEnableLimit(!enableLimit)}
              size="md"
              mr="3"
              sx={{
                "span.chakra-switch__track": {
                  backgroundColor: "#111318", // constant background color
                  border: "1px solid #94979C", // border stays same
                  boxShadow: "none",
                },
                "&[data-checked] span.chakra-switch__track": {
                  backgroundColor: "#111318", // constant background color
                  border: "1px solid #69FF93", // border stays same
                  boxShadow: "none",
                },
                "span.chakra-switch__thumb": {
                  backgroundColor: "transparent", // dark circle when off
                  border: "1px solid #94979C",
                  transition: "background-color 0.2s",
                },
                "&[data-checked] span.chakra-switch__thumb": {
                  backgroundColor: "#69FF93", // green circle when on
                  borderColor: "#69FF93",
                },
              }}
            />

            <Text
              color="white"
              fontSize={{ base: "14px", md: "20px" }}
              fontWeight="bold"
            >
              Enable period spending limit
            </Text>
          </Flex>

          {/* Spending Limit Field */}
          <Box
            mb=""
            py={"14px"}
            borderTop="1px solid rgba(255, 255, 255, 0.1)"
            borderBottom="1px solid rgba(255, 255, 255, 0.1)"
          >
            <Flex justify="space-between" mb="4">
              <Text
                color="white"
                fontSize={{ base: "18px", md: "20px" }}
                fontWeight="bold"
              >
                Spending Limit:
              </Text>
              <Text color="#94979C" fontSize={{ base: "18px", md: "20px" }}>
                0/30
              </Text>
            </Flex>

            <Text color="#94979C" fontSize="16px" mb="4">
              Resets monthly with billing period.
            </Text>

            <InputGroup position={"relative"}>
              <Input
                placeholder="0"
                value={spendingLimit}
                onChange={handleSpendingLimitChange}
                maxLength={30}
                disabled={!enableLimit}
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
              <InputRightElement width="4.5rem" h="full">
                <Box
                  color="gray.500"
                  p="2"
                  height="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  USD
                </Box>
              </InputRightElement>
            </InputGroup>

            <Text
              color="#F9C981"
              fontSize={{ base: "14px", md: "16px" }}
              mt="4"
            >
              We recommend 20% buffer to prevent unexpected outages.
            </Text>
          </Box>

          {/* Action Buttons */}
          <Flex
            mt="4"
            flexDirection={{ base: "column", sm: "row" }}
            gap={3}
            justify="space-between"
            mb={3}
          >
            <Button
              leftIcon={<FaCheckDouble />}
              onClick={handleGenerateApiKey}
              isLoading={Loading}
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
              disabled={isNameError}
            >
              Create API Key
            </Button>

            <Button
              leftIcon={copied ? <CheckIcon /> : <CopyIcon />}
              color={"#3BB25D"}
              borderRadius={"10px"}
              border={"1px solid #2D7D44"}
              bg="rgb(15,18,22)"
              py={{ base: "1px", lg: "21px" }}
              w={{ base: "full", sm: "unset" }}
              _hover={{
                bg: "#69FF93",
                color: "black",
              }}
              disabled={!apiKey}
              onClick={() => {
                navigator.clipboard.writeText(apiKey);
                setcopied(true);
                setTimeout(() => setcopied(false), 2000);
              }}
            >
              {copied ? "Copied!" : "Copy Key"}
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
