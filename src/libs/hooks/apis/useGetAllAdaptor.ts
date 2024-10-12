import axiosInstance from "@/libs/apis";
import { AdaptorItem } from "@/types/adapter-type";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllAdaptor() {
  const getAdaptorsQuery = useQuery({
    queryKey: ["adaptors"],
    queryFn: async (): Promise<AdaptorItem[]> => {
      const response: AdaptorItem[] = await axiosInstance.get("/adaptors");
      return response;
    },
  });
  return {
    data: getAdaptorsQuery.data || [],
    isLoading: getAdaptorsQuery.isLoading || getAdaptorsQuery.isFetching,
    refetchAdaptors: getAdaptorsQuery.refetch,
  };
}
