import axiosInstance from "@/libs/apis";
import { useQuery } from "@tanstack/react-query";

interface Chain {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function useAllChain() {
  const chainsQuery = useQuery({
    queryKey: ["Chains"],
    queryFn: async (): Promise<Chain[]> => {
      const response: Chain[] = await axiosInstance.get("adaptors/chain");
      return response;
    },
  });
  return {
    chains: chainsQuery.data || [],
    isLoading: chainsQuery.isLoading || chainsQuery.isFetching,
    refetchChains: chainsQuery.refetch,
  };
}
