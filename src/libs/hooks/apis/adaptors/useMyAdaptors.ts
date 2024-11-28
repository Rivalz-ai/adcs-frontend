import axiosInstance from "@/libs/apis";
import { AdaptorItem } from "@/types/adapter-type";
import { useQuery } from "@tanstack/react-query";

export default function useMyAdaptors(address: string) {
  const getAdaptorsQuery = useQuery({
    queryKey: ["use-my-adaptors", address],
    queryFn: async (): Promise<AdaptorItem[]> => {
      const response: AdaptorItem[] = await axiosInstance.get(
        `/adaptors/by-address?address=${address}`
      );
      return response;
    },
    enabled: !!address,
  });
  return {
    data: getAdaptorsQuery.data || [],
    isLoading: getAdaptorsQuery.isLoading || getAdaptorsQuery.isFetching,
    refetchAdaptors: getAdaptorsQuery.refetch,
  };
}
