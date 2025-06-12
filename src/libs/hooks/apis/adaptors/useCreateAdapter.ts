import axiosInstance from "@/libs/apis";
import { AdapterModel, AdaptorCreateModel } from "@/types/adapter-type";
import { useMutation } from "@tanstack/react-query";

export default function useCreateAdapter() {
  const createAdaptorMutation = useMutation({
    mutationFn: async (adaptor: AdapterModel): Promise<AdapterModel> => {
      const response: AdapterModel = await axiosInstance.post(
        "v2/adapter/create",
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
