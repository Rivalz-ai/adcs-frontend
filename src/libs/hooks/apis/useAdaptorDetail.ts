import axiosInstance from "@/libs/apis";
import { AdaptorItem } from "@/types/adapter-type";
import { useQuery } from "@tanstack/react-query";

export default function useAdaptorDetail(jobId?: string) {
  const getAdaptorDetailQuery = useQuery({
    queryKey: ["adaptor-detail", jobId],
    queryFn: async (): Promise<AdaptorItem> => {
      const response: AdaptorItem = await axiosInstance.get(
        `/adaptors/by-job-id?jobId=${jobId}`
      );
      return response;
    },
    enabled: !!jobId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    data: getAdaptorDetailQuery.data,
    isLoading:
      getAdaptorDetailQuery.isLoading || getAdaptorDetailQuery.isFetching,
    refetchAdaptorDetail: getAdaptorDetailQuery,
  };
}
