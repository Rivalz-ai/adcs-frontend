import axiosInstance from "@/libs/apis";
import { ProviderItem } from "@/types/provider-type";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllProvider() {
  const getAdaptorsQuery = useQuery({
    queryKey: ["providers"],
    queryFn: async (): Promise<ProviderItem[]> => {
      const response: ProviderItem[] = await axiosInstance.get("/providers");
      return response;
    },
  });
  return {
    data: getAdaptorsQuery.data || [],
    isLoading: getAdaptorsQuery.isLoading || getAdaptorsQuery.isFetching,
    refetchAdaptors: getAdaptorsQuery.refetch,
  };
}
