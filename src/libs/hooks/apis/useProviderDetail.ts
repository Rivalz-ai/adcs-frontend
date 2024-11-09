import axiosInstance from "@/libs/apis";
import { ProviderItem } from "@/types/provider-type";
import { useQuery } from "@tanstack/react-query";

export default function useProviderDetail(id?: string) {
  const getProviderDetailQuery = useQuery({
    queryKey: ["provider-detail", id],
    queryFn: async (): Promise<ProviderItem> => {
      const response: ProviderItem = await axiosInstance.get(
        `/providers/${id}`
      );
      return response;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    data: getProviderDetailQuery.data,
    isLoading:
      getProviderDetailQuery.isLoading || getProviderDetailQuery.isFetching,
    refetchProviderDetail: getProviderDetailQuery,
  };
}
