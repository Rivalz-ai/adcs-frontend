"use client";

import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import { FaArrowLeft, FaCheckDouble } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

export default function ProviderSubmissionForm() {
  // Responsive values based on screen size
  const headerFontSize = useBreakpointValue({
    base: "24px",
    sm: "32px",
    md: "42px",
    lg: "48px",
  });
  const toast = useToast();
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    apiEndpoint: "",
    apiKey: "",
    githubPR: "",
    documentationLink: "",
    playground: "",
    method: "",
    input: "",
    ConfigurationFile: "",
  });
  const [verified, setVerified] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerified(false);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerify = async () => {
      const submissionData = {
        url: formData.apiEndpoint,
        apiKey: {
          "api-key": formData.apiKey,
        },
        prUrl: formData.githubPR,
        documentLink: formData.documentationLink,
        configUrl: formData.ConfigurationFile,
      };
      try {
        setloading("verifying");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/providers/verifySubmission`,
          submissionData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.status === 200 || response.status === 201) {
          setVerified(true);
          toast({
            title: "Verified",
            description: "Your data has been Verified successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Verified Error",
            description:
              response.data.message || "An error occurred during verification.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error verification form:", error);
        toast({
          title: "Network Error",
          description: "Failed to verify data. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setloading("");
      }
    };

  const handleSubmit = async () => {
    if (!verified) {
      toast({
        title: "Submission Failed",
        description: "Please verify the form before submitting.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const submissionData = {
      url: formData.apiEndpoint,
      apiKey: {
        "api-key": formData.apiKey,
      },
      prUrl: formData.githubPR,
      documentLink: formData.documentationLink,
      configUrl: formData.ConfigurationFile,
    };

    try {
      setloading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/providers/submission`,
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setloading(false);
        toast({
          title: "Submitted",
          description: "Your data has been submitted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Submission Error",
          description:
            response.data.message || "An error occurred during submission.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Network Error",
        description: "Failed to submit data. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setloading("");
    }
  };

  return (
    <Box
      w="full"
      h="full"
      bg="transparent"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={{ base: "1rem", sm: "2rem", md: "4rem", lg: "12rem" }}
      color="white"
    >
      <Box
        maxW={"1040px"}
        w="full"
        bg="#0C0E12"
        borderRadius="10px"
        overflow="hidden"
        position="relative"
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
        <Flex
          justify="center"
          align="start"
          position="relative"
          py={{ base: 2, md: 4 }}
          px={{ base: 3, md: 6 }}
          flexDirection="column"
        >
          <Button
            position={{ base: "static", xl: "absolute" }}
            left={5}
            top={6}
            size="sm"
            borderColor="gray.700"
            bg="transparent"
            variant="link"
            color="#94979C"
            border={"1px solid #94979C"}
            px={{ base: "10px", sm: "20px" }}
            py={{ base: "8px", sm: "12px" }}
            borderRadius={"10px"}
            _hover={{ bg: "white", color: "black" }}
            fontSize={{ base: "14px", sm: "16px" }}
            display={"flex"}
            alignItems={"center"}
            gap={"12px"}
            mb={{ base: 4, sm: 0 }}
            mt={{ base: 2, sm: 0 }}
          >
            <FaArrowLeft />
            Back
          </Button>

          <Text
            fontSize={headerFontSize}
            fontWeight="bold"
            lineHeight={"none"}
            textAlign={{ base: "center", sm: "center" }}
            mt={{ base: 0, sm: 6 }}
            mx="auto"
          >
            Provider Submission
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

        {/* Form */}
        <Box px={{ base: 3, md: 5 }} pt={1} mt={1} pb={5}>
          <Flex
            bg="radial-gradient(70.61% 50% at 50% 50%, rgba(31, 31, 31, 0.5) 0%, rgba(19, 22, 27, 0.5) 100%)"
            border="1px solid #272637"
            borderRadius={"10px"}
            backdropFilter="blur(10px)"
            direction="column"
            gap={1}
            px={{ base: 3, md: 5 }}
            pt={"1px"}
            pb={"20px"}
          >
            {/* API Endpoint */}
            <FormField
              label="API Endpoint:"
              placeholder="Enter Link"
              name="apiEndpoint"
              value={formData.apiEndpoint}
              onChange={handleChange}
            />

            {/* API Key */}
            <FormField
              label="API Key (k-v):"
              placeholder="Enter Key"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
            />

            {/* Github PR */}
            <FormField
              label="Github PR:"
              placeholder="Enter Link"
              name="githubPR"
              value={formData.githubPR}
              onChange={handleChange}
            />

            {/* Documentation Link */}
            <FormField
              label="Documentation Link"
              placeholder="Enter Link"
              name="documentationLink"
              value={formData.documentationLink}
              onChange={handleChange}
            />

            <FormField
              label="Configuration File"
              placeholder="Enter Link"
              name="ConfigurationFile"
              value={formData.ConfigurationFile}
              onChange={handleChange}
            />

            {/* Verification message */}
            <Flex
              justify={{ base: "center", sm: "space-between" }}
              align={{ base: "center", sm: "start" }}
              py={4}
              borderBottom="1px solid #282828"
              flexDirection={{ base: "column", sm: "row" }}
              gap={{ base: 4, sm: 0 }}
            >
              <Text
                color="#94979C"
                fontSize={{ base: "14px", md: "16px" }}
                textAlign={{ base: "center", sm: "left" }}
              >
                Before verification, make sure that all items
                <br />
                are filled in correctly.
              </Text>
              <Button
                bg={
                  !formData.apiEndpoint ||
                  !formData.apiKey ||
                  !formData.githubPR
                    ? "#373A40"
                    : "rgb(15,18,22)"
                }
                color={
                  !formData.apiEndpoint ||
                  !formData.apiKey ||
                  !formData.githubPR
                    ? "#616264"
                    : "#3BB25D"
                }
                border={
                  !formData.apiEndpoint ||
                  !formData.apiKey ||
                  !formData.githubPR
                    ? "none"
                    : "1px solid #2D7D44"
                }
                fontSize={{ base: "14px", md: "16px" }}
                px={{ base: "12px", md: "16px" }}
                py={{ base: "8px", md: "10px" }}
                borderRadius="10px"
                _hover={
                  !formData.apiEndpoint ||
                  !formData.apiKey ||
                  !formData.githubPR
                    ? { bg: "#1C2A3A" }
                    : { bg: "#69FF93", color: "black" }
                }
                disabled={
                  !formData.apiEndpoint ||
                  !formData.apiKey ||
                  !formData.githubPR
                }
                onClick={handleVerify}
                isLoading={loading === "verifying"}
                h={{ base: "40px", md: "44px" }}
                maxW={{ base: "120px", md: "140px" }}
                w={"full"}
              >
                Verify
              </Button>
            </Flex>

            {/* Playground */}
            <FormField
              label="Playground:"
              placeholder=""
              name="playground"
              value={formData.playground}
              onChange={handleChange}
            />

            {/* Method */}
            <FormField label="Method:" placeholder="" name={""} value={""}/>

            {/* Input */}
            <FormField label="Input:" placeholder="" name={""} value={""}/>

            {/* Submit button */}
            <Flex justify={{ base: "center", sm: "flex-end" }} mt={6}>
              <Button
                leftIcon={<FaCheckDouble />}
                bg={verified ? "rgb(15,18,22)" : "#373A40"}
                color={verified ? "#3BB25D" : "#616264"}
                border={verified ? "1px solid #2D7D44" : ""}
                borderRadius="10px"
                _hover={
                  verified
                    ? {
                        bg: "#69FF93",
                        color: "black",
                      }
                    : { bg: "#1C2A3A" }
                }
                h={{ base: "40px", md: "44px" }}
                maxW={{ base: "120px", md: "140px" }}
                w={"full"}
                onClick={handleSubmit}
                isLoading={loading === "submitting"}
                disabled={!verified}
              >
                Submit
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

// Form field component to reduce repetition
function FormField({
  label,
  placeholder,
  name,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Flex
      gap={{ base: "10px", lg: "20px" }}
      alignItems={{ base: "start", lg: "center" }}
      flexDirection={{ base: "column", sm: "row" }}
      borderBottom="1px solid #282828"
      py={{ base: "10px", md: "14px", lg: "17px" }}
    >
      <Flex flex={1}>
        <Text
          color="white"
          fontSize={{ base: "16px", md: "18px" }}
          fontWeight="semibold"
        >
          {label}
        </Text>
      </Flex>

      <Flex
        gap={{ base: "10px", md: "20px" }}
        justifyContent={{ base: "center", sm: "flex-end" }}
        w="100%"
        flex={{ base: 1, sm: 1.8 }}
      >
        <Input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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
      </Flex>
    </Flex>
  );
}
