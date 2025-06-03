import axiosInstance from "@/libs/apis";
import { AdaptorCreateModel } from "@/types/adapter-type";
import { useMutation } from "@tanstack/react-query";

export default function useCreateAdapter() {
  const createAdaptorMutation = useMutation({
    mutationFn: async (
      adaptor: AdaptorCreateModel
    ): Promise<AdaptorCreateModel> => {
      const response: AdaptorCreateModel = await axiosInstance.post(
        "v1/adaptors",
        adaptor
      );
      return response;
    },
  });
  return {
    createAdaptor: createAdaptorMutation.mutateAsync,
    isLoading: createAdaptorMutation.isPending,
  };
}
