import { useMutation } from "@tanstack/react-query";
import { SubmissionModel, VerifySubmissionResponse } from "./type";
import axiosInstance from "@/libs/apis";

export default function useVerifySubmissionMutation() {
  const { mutateAsync, isPending } = useMutation<
    VerifySubmissionResponse,
    Error,
    SubmissionModel
  >({
    mutationFn: async (data) => {
      const response: VerifySubmissionResponse = await axiosInstance.post(
        "v1/providers/verifySubmission",
        data
      );
      return response;
    },
  });
  return {
    verifySubmission: mutateAsync,
    isVerifying: isPending,
  };
}
