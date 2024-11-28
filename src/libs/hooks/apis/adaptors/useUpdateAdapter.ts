import axiosInstance from "@/libs/apis";
import { AdaptorCreateModel } from "@/types/adapter-type";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateAdapter() {
  const updateAdaptorMutation = useMutation({
    mutationFn: async (
      adaptor: AdaptorCreateModel
    ): Promise<AdaptorCreateModel> => {
      const response: AdaptorCreateModel = await axiosInstance.put(
        `/adaptors/${adaptor.id}`,
        adaptor
      );
      return response;
    },
  });
  return {
    updateAdaptor: updateAdaptorMutation.mutateAsync,
    isLoading: updateAdaptorMutation.isPending,
  };
}
