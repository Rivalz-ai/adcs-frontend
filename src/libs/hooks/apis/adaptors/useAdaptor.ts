import axiosInstance from "@/libs/apis";
import { AdaptorCreateModel, AdaptorItem } from "@/types/adapter-type";
import { useQuery } from "@tanstack/react-query";

export default function useAdaptor(jobId?: string) {
  const getAdaptorDetailQuery = useQuery({
    queryKey: ["adaptor-detail-by-user", jobId],
    queryFn: async (): Promise<AdaptorCreateModel> => {
      const response: AdaptorItem = await axiosInstance.get(
        `v1/adaptors/by-job-id?jobId=${jobId}`
      );

      const adaptor: AdaptorCreateModel = {
        id: response.id,
        name: response.name,
        description: response.description,
        outputTypeId: response.outputTypeId,
        // variables: response.variables,
        // categoryId: response.categoryId,
        // dataProviderId: response.dataProviderId,
        // chainId: response.chainId,
        // aiPrompt: response.aiPrompt,
        // chainType: response.chainType,
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
