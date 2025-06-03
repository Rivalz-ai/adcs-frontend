import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { PlaygroundContainerProps, SubmitResult } from "./playground/types";
import DynamicForm from "./playground/dynamic-form";
import SubmitResultDisplay from "./playground/submit-result-display";
import EmptyState from "./playground/empty-state";
import { useRunAdaptorMutation } from "@/libs/hooks/apis/adaptors/useRunAdaptorMutation";

export default function PlaygroundContainer({
  adaptorId,
  inputEntity,
}: PlaygroundContainerProps) {
  const { mutateAsync, isPending } = useRunAdaptorMutation();
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      const result = await mutateAsync({ adaptorId, input: data });
      setSubmitResult({
        success: true,
        //@ts-ignore
        data: result,
        message: "Form submitted successfully!",
      });
    } catch (error) {
      setSubmitResult({
        success: false,
        error: error,
        message: "Failed to submit form",
      });
    }
  };

  const handleReset = () => {
    setSubmitResult(null);
  };

  if (!inputEntity || Object.keys(inputEntity).length === 0) {
    return <EmptyState />;
  }

  return (
    <Flex
      w="50%"
      my="20px"
      alignSelf="center"
      flexDir="column"
      minH="fit-content"
      p={6}
      borderRadius="md"
      border="1px solid #23262E"
      bg="#0C0E12"
      shadow={"lg"}
    >
      <DynamicForm
        inputEntity={inputEntity}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        onReset={handleReset}
      />

      {submitResult && <SubmitResultDisplay result={submitResult} />}
    </Flex>
  );
}
