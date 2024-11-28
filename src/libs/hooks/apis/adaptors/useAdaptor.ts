import axiosInstance from "@/libs/apis";
import { AdaptorCreateModel, AdaptorItem } from "@/types/adapter-type";
import { useQuery } from "@tanstack/react-query";

export default function useAdaptor(jobId?: string) {
  const getAdaptorDetailQuery = useQuery({
    queryKey: ["adaptor-detail-by-user", jobId],
    queryFn: async (): Promise<AdaptorCreateModel> => {
      const response: AdaptorItem = await axiosInstance.get(
        `/adaptors/by-job-id?jobId=${jobId}`
      );

      const adaptor: AdaptorCreateModel = {
        id: response.id,
        name: response.name,
        description: response.description,
        variables: response.variables,
        categoryId: response.categoryId,
        outputTypeId: response.outputTypeId,
        dataProviderId: response.dataProviderId,
        chainId: response.chainId,
        aiPrompt: response.aiPrompt,
      };
      return adaptor;
    },
    enabled: !!jobId,
  });

  return {
    data: getAdaptorDetailQuery.data,
    isLoading:
      getAdaptorDetailQuery.isLoading || getAdaptorDetailQuery.isFetching,
    refetchAdaptorDetail: getAdaptorDetailQuery,
  };
}
