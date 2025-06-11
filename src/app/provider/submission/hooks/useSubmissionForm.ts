import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  submissionFormSchema,
  SubmissionFormData,
} from "@/app/provider/submission/schemas/submission.schema";
import { useToast } from "@chakra-ui/react";
import useVerifySubmissionMutation from "./useVerifySubmissionMutation";
import useSubmissionMutation from "./useSubmissionMutation";
import { SubmissionModel, VerifySubmissionResponse } from "./type";
import { useMemo, useState } from "react";

export const useSubmissionForm = () => {
  const toast = useToast();
  const [verifyData, setVerifyData] = useState<VerifySubmissionResponse>();
  const [apiKey, setApiKey] = useState<Record<string, string>>();

  const { verifySubmission, isVerifying } = useVerifySubmissionMutation();
  const { submitSubmission, isSubmitting } = useSubmissionMutation();

  const form = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionFormSchema),
    mode: "onChange",
    defaultValues: {
      url: "",
      api: { key: "", value: "" },
      prUrl: "",
      categoryId: 1,
      documentLink: "",
      configUrl: "",
    },
  });

  const watchedValues = form.watch();

  /**
   * Check if the form is complete
   * @returns boolean
   */
  const isFormComplete = useMemo(
    () =>
      Boolean(
        watchedValues.url &&
          watchedValues.api.key &&
          watchedValues.api.value &&
          watchedValues.prUrl &&
          watchedValues.documentLink &&
          watchedValues.configUrl
      ),
    [watchedValues]
  );

  /**
   * Convert form data to submission model
   * @param data - SubmissionFormData
   * @returns SubmissionModel
   */
  const submissionModel = (data: SubmissionFormData) => {
    const { api } = data;
    const model: SubmissionModel = {
      url: data.url,
      apiKey: {
        [api.key]: api.value,
      },
      prUrl: data.prUrl,
      categoryId: data.categoryId,
      documentLink: data.documentLink,
      configUrl: data.configUrl,
    };
    return model;
  };

  /**
   * Handle verify submission
   * @param data - SubmissionFormData
   */
  const handleVerify = async (data: SubmissionFormData) => {
    const model = submissionModel(data);
    try {
      const response = await verifySubmission(model);
      setVerifyData(response);
      setApiKey(model.apiKey);
      toast({
        title: "Verification Successful",
        description: "Provider has been verified successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: (error as string) || "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  /**
   * Handle submit submission
   * @param data - SubmissionFormData
   */
  const handleSubmit = async (data: SubmissionFormData) => {
    if (!verifyData) {
      toast({
        title: "Submission Failed",
        description: "Please verify the Provider before submitting.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await submitSubmission(submissionModel(data));

      toast({
        title: "Submission Successful",
        description: "Provider has been submitted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: (error as string) || "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return {
    form,
    isVerifying,
    isSubmitting,
    verifyData,
    isFormComplete,
    watchedValues,
    apiKey,
    handleVerify,
    handleSubmit,
  };
};
