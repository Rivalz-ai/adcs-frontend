import { useMutation } from "@tanstack/react-query";
import { SubmissionModel, SubmissionResponse } from "./type";
import axiosInstance from "@/libs/apis";

export default function useSubmissionMutation() {
  const { mutateAsync, isPending } = useMutation<
    SubmissionResponse,
    Error,
    SubmissionModel
  >({
    mutationFn: async (data) => {
      const response: SubmissionResponse = await axiosInstance.post(
        "v1/providers/submission",
        data
      );
      return response;
    },
  });
  return {
    submitSubmission: mutateAsync,
    isSubmitting: isPending,
  };
}
