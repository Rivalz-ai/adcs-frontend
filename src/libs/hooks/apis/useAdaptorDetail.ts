import axiosInstance from "@/libs/apis";
import { AdaptorItem } from "@/types/adapter-type";
import { useQuery } from "@tanstack/react-query";

export default function useAdaptorDetail(adaptorId?: string) {
  const getAdaptorDetailQuery = useQuery({
    queryKey: ["adaptor-detail", adaptorId],
    queryFn: async (): Promise<AdaptorItem> => {
      const response: AdaptorItem = await axiosInstance.get(
        `v2/adapter/by-code/${adaptorId}`
      );
      return response;
    },
    enabled: !!adaptorId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    data: getAdaptorDetailQuery.data,
    isLoading:
      getAdaptorDetailQuery.isLoading || getAdaptorDetailQuery.isFetching,
    refetchAdaptorDetail: getAdaptorDetailQuery,
  };
}
