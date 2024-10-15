import axiosOpenApi from "@/libs/apis/open-api-axios";
import { useQuery } from "@tanstack/react-query";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  address: string;
}

export default function useCoins(page: number = 1, size: number = 200) {
  const getCoinsQuery = useQuery({
    queryKey: ["coins", page, size],
    queryFn: async (): Promise<Coin[]> => {
      const response: Coin[] = await axiosOpenApi.get("price/coins", {
        params: {
          page,
          size,
        },
      });
      return response;
    },
  });

  return {
    coins: getCoinsQuery.data,
    isLoading: getCoinsQuery.isLoading,
    isError: getCoinsQuery.isError,
    error: getCoinsQuery.error,
  };
}
