"use client";

import AppInput from "@/components/share-component/app-input";
import { useSubmissionForm } from "@/app/provider/submission/hooks/useSubmissionForm";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaCheckDouble } from "react-icons/fa";
import React, { useMemo, useState } from "react";
import SubmissionButton from "./SubmissionButton";
import MethodsType from "@/views/components/Methods";
import { VerifySubmissionMethod } from "../hooks/type";
import SubmissionPlayground from "./SubmissionPlayground";

export default function SubmissionForm() {
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const {
    form: {
      control,
      handleSubmit,
      formState: { errors },
    },
    isVerifying,
    isSubmitting,
    apiKey,
    verifyData,
    isFormComplete,
    handleVerify,
    handleSubmit: handleFinalSubmit,
  } = useSubmissionForm();

  const methodOptions = useMemo(() => {
    return (
      verifyData?.methods.map((method: VerifySubmissionMethod) => ({
        label: method.method_name,
        value: method.method_name,
        subLabel: method.description,
      })) || []
    );
  }, [verifyData]);

  const selectedMethodData = useMemo(() => {
    return verifyData?.methods.find(
      (method) => method.method_name === selectedMethod
    );
  }, [verifyData, selectedMethod]);

  return (
    <Box px={{ base: 3, md: 5 }} pt={1} mt={1} pb={5} w="full">
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
        <AppInput
          name="url"
          label="API Endpoint"
          placeholder="Enter API Endpoint URL"
          control={control}
          error={errors.url?.message}
        />

        <AppInput
          name="api.key"
          label="API Key"
          placeholder="Enter API Key (e.g. api-key)"
          control={control}
          error={errors.api?.key?.message}
        />
        <AppInput
          name="api.value"
          label="API Value"
          placeholder="Enter API Value (e.g. 1234567890)"
          control={control}
          error={errors.api?.value?.message}
        />

        <AppInput
          name="prUrl"
          label="Github PR"
          placeholder="Enter GitHub PR URL"
          control={control}
          error={errors.prUrl?.message}
        />

        <AppInput
          name="documentLink"
          label="Documentation Link"
          placeholder="Enter Documentation URL"
          control={control}
          error={errors.documentLink?.message}
        />

        <AppInput
          name="configUrl"
          label="Configuration File"
          placeholder="Enter Configuration File URL"
          control={control}
          error={errors.configUrl?.message}
        />

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

          <SubmissionButton
            disabled={!isFormComplete}
            onClick={handleSubmit(handleVerify)}
            isLoading={isVerifying}
          >
            Verify
          </SubmissionButton>
        </Flex>

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
              Method
            </Text>
          </Flex>
          <Flex
            justifyContent={{ base: "center", sm: "flex-end" }}
            w="100%"
            flex={{ base: 1, sm: 1.8 }}
          >
            <MethodsType
              isShowValue
              selectedMethodsType={selectedMethod}
              options={methodOptions}
              setSelectedMethodsType={(newValue) => {
                setSelectedMethod(newValue);
              }}
            />
          </Flex>
        </Flex>

        {selectedMethodData && apiKey && (
          <SubmissionPlayground
            baseUrl={verifyData?.baseUrl || ""}
            method={selectedMethodData}
            apiKey={apiKey}
          />
        )}

        {/* Submit button */}
        <Flex justify={{ base: "center", sm: "flex-end" }} gap={2} mt={6}>
          <SubmissionButton
            leftIcon={<FaCheckDouble />}
            disabled={!verifyData}
            isLoading={isSubmitting}
            isDisabled={!verifyData}
            onClick={handleSubmit(handleFinalSubmit)}
          >
            Submit
          </SubmissionButton>
        </Flex>
      </Flex>
    </Box>
  );
}
