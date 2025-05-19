"use client";

import { CurlGenerator } from "curl-generator";
import MethodsType from "@/views/components/Methods";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  useBreakpointValue,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import { FaArrowLeft, FaCheckDouble } from "react-icons/fa";
import axios from "axios";
import { useState, useMemo } from "react";

interface VerifyData {
  method_name: string;
  description: string;
  input_schema: Record<string, string>;
  input_type: string;
  output_schema: Record<string, string | number>;
  type: string;
  playground: string;
}

export default function ProviderSubmissionForm() {
  const headerFontSize = useBreakpointValue({
    base: "24px",
    sm: "32px",
    md: "42px",
    lg: "48px",
  });
  const toast = useToast();
  const [loading, setLoading] = useState("");

  interface FormDataType {
    apiEndpoint: string;
    apiKey: string;
    githubPR: string;
    documentationLink: string;
    playground: string;
    method: string;
    input: string;
    ConfigurationFile: string;
    [key: string]: string;
  }

  const [formData, setFormData] = useState<FormDataType>({
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
  const [verifyData, setverifyData] = useState<VerifyData[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "method" && verifyData) {
      const selectedMethod = verifyData.find(
        (m: VerifyData) => m.method_name === value
      );

      if (selectedMethod) {
        const methodType = selectedMethod.type.toUpperCase() as
          | "GET"
          | "POST"
          | "PUT"
          | "PATCH"
          | "DELETE";
        const curl = CurlGenerator({
          method: methodType,
          url: selectedMethod.playground,
          headers: {
            Authorization: `Bearer ${formData.apiKey}`,
          },
        });

        setFormData((prev) => ({
          ...prev,
          method: value,
          playground: curl,
        }));
        return;
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const curlExecutor = async () => {
    const selectedMethod = verifyData.find(
      (m: VerifyData) => m.method_name === formData.method
    );

    try {
      if (!selectedMethod) {
        throw new Error("No method selected");
      }

      const { type, playground, input_type, input_schema } = selectedMethod;

      const params: { [key: string]: string } = {};
      for (const key of Object.keys(input_schema)) {
        if (formData[key]) {
          params[key] = formData[key];
        } else {
          console.warn(`Missing parameter: ${key}`);
        }
      }

      const options: {
        method: string;
        url: string;
        params?: { [key: string]: string };
        data?: { [key: string]: string };
      } = {
        method: type,
        url: playground,
      };

      if (input_type === "QueryParams") {
        options.params = params;
      } else if (input_type === "BodyParams") {
        options.data = params;
      }

      const response = await axios(options);

      if (response.status === 200 || response.status === 201) {
        setVerified(true);
      }
      return response.data;
    } catch (error) {
      console.error(
        "Request Error:",
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
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
        setLoading("verifying");
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
          setverifyData(response.data.methods);
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
        setLoading("");
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
      setLoading("submitting");
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
      setLoading("");
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
            </Flex>

            {/* Playground */}
            <FormField
              label="Playground:"
              placeholder=""
              name="playground"
              verifyData={verifyData}
              value={formData.playground}
              onChange={handleChange}
              curlExecutor={curlExecutor}
            />

            {/* Method */}
            <FormField label="Method:" placeholder="" name="method" value={formData.method} verifyData={verifyData} onChange={handleChange}/>

            {/* Input */}
            <FormField label="Input:" placeholder="" name={""} value={""}/>

            {/* Submit button */}
            <Flex justify={{ base: "center", sm: "flex-end" }} gap={2} mt={6}>
              <Button
                fontSize={{ base: "14px", md: "16px" }}
                px={{ base: "12px", md: "16px" }}
                py={{ base: "8px", md: "10px" }}
                h={{ base: "40px", md: "44px" }}
                maxW={{ base: "120px", md: "140px" }}
                w="full"
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
                borderRadius="10px"
                border={
                  !formData.apiEndpoint ||
                  !formData.apiKey ||
                  !formData.githubPR
                    ? "none"
                    : "1px solid #2D7D44"
                }
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
              >
                Verify
              </Button>
              <Button
                leftIcon={<FaCheckDouble />}
                bg={verified ? "rgb(15,18,22)" : "#373A40"}
                border={verified ? "1px solid #2D7D44" : ""}
                color={verified ? "#3BB25D" : "#616264"}
                borderRadius={"10px"}
                _hover={
                  verified
                    ? {
                        bg: "#69FF93",
                        color: "black",
                      }
                    : { bg: "#1C2A3A" }
                }
                maxW={{ base: "120px", md: "140px" }}
                w={"full"}
                h={{ base: "40px", md: "44px" }}
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
  curlExecutor,
  verifyData,
  onChange,
  
}: {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  verifyData?: VerifyData[];
  curlExecutor?: () => Promise<unknown>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const options = useMemo(() => {
    return verifyData
      ? verifyData?.map((method: VerifyData) => ({
          label: method.method_name,
          value: method.method_name,
          subLabel: method.description,
        }))
      : [];
  }, [verifyData]);

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
        {name === "method" ? (
          <MethodsType
            isShowValue
            selectedMethodsType={value}
            options={options}
            setselectedMethodstype={(newValue) => {
              if (onChange) {
                const syntheticEvent = {
                  target: {
                    name,
                    value: newValue,
                  },
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(syntheticEvent);
              }
            }}
          />
        ) : name === "playground" ? (
          <Flex flexDirection={"column"} gap={2} w="100%" alignItems={"end"}>
            <Textarea
              name={name}
              placeholder={placeholder}
              value={value}
              rows={value.length > 0 ? 4 : 1}
              py={{ base: "18px", md: "22px" }}
              border="1px solid #272637"
              borderRadius="10px"
              bgColor="transparent"
              color="#69FF93"
              _placeholder={{
                color: "#94979C",
                fontSize: { base: "14px", md: "16px" },
              }}
              w="100%"
              size={{ base: "sm", md: "md" }}
            />

            <Button
              fontSize={{ base: "14px", md: "16px" }}
              px={{ base: "12px", md: "16px" }}
              py={{ base: "8px", md: "10px" }}
              h={{ base: "40px", md: "44px" }}
              maxW={{ base: "120px", md: "140px" }}
              w="full"
              display={name === "playground" && value != "" ? "block" : "none"}
              bg={"rgb(15,18,22)"}
              color={"#3BB25D"}
              borderRadius="10px"
              border={"1px solid #2D7D44"}
              _hover={{ bg: "#69FF93", color: "black" }}
              onClick={curlExecutor}
            >
              Play
            </Button>
          </Flex>
        ) : (
          <Input
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            border="1px solid #272637"
            borderRadius={"10px"}
            bgColor="transparent"
            color="#94979C"
            py={{ base: "18px", md: "22px" }}
            _placeholder={{
              color: "#94979C",
              fontSize: { base: "14px", md: "16px" },
            }}
            w="100%"
            size={{ base: "sm", md: "md" }}
          />
        )}
      </Flex>
    </Flex>
  );
}
