"use client";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { X } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";
import SubmissionForm from "./components/SubmissionForm";
import { useRouter } from "next/navigation";

export default function ProviderSubmissionForm() {
  const router = useRouter();

  const onBack = () => {
    router.back();
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
            onClick={onBack}
          >
            <FaArrowLeft />
            Back
          </Button>

          <Text
            fontSize={{ base: "24px", sm: "32px", md: "42px", lg: "48px" }}
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
          <SubmissionForm />
        </Flex>
      </Box>
    </Box>
  );
}
