"use client";

import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import { FaArrowLeft, FaCheckDouble } from "react-icons/fa";

export default function ProviderSubmissionForm() {
  // Responsive values based on screen size
  const headerFontSize = useBreakpointValue({
    base: "24px",
    sm: "32px",
    md: "42px",
    lg: "48px",
  });

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
            <FormField label="API Endpoint:" placeholder="Enter Link" />

            {/* API Key */}
            <FormField label="API Key (k-v):" placeholder="Enter Key" />

            {/* Github PR */}
            <FormField label="Github PR:" placeholder="Enter Link" />

            {/* Documentation Link */}
            <FormField label="Documentation Link" placeholder="Enter Link" />

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
                bg="#373A40"
                color="#616264"
                fontSize={{ base: "14px", md: "16px" }}
                px={{ base: "12px", md: "16px" }}
                py={{ base: "8px", md: "10px" }}
                borderRadius="10px"
                _hover={{ bg: "#1C2A3A" }}
                h={{ base: "40px", md: "44px" }}
                maxW={{ base: "120px", md: "140px" }}
                w={"full"}
              >
                Verify
              </Button>
            </Flex>

            {/* Playground */}
            <FormField label="Playground:" placeholder="" />

            {/* Method */}
            <FormField label="Method:" placeholder="" />

            {/* Input */}
            <FormField label="Input:" placeholder="" />

            {/* Submit button */}
            <Flex justify={{ base: "center", sm: "flex-end" }} mt={6}>
              <Button
                leftIcon={<FaCheckDouble />}
                bg="#373A40"
                color="#616264"
                fontSize={{ base: "14px", md: "16px" }}
                px={{ base: "12px", md: "16px" }}
                py={{ base: "8px", md: "10px" }}
                borderRadius="10px"
                _hover={{ bg: "#1C2A3A" }}
                h={{ base: "40px", md: "44px" }}
                maxW={{ base: "120px", md: "140px" }}
                w={"full"}
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
}: {
  label: string;
  placeholder: string;
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
          name="value"
          placeholder={placeholder}
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