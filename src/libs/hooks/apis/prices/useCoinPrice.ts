import axiosOpenApi from "@/libs/apis/open-api-axios";
import { useQuery } from "@tanstack/react-query";

interface CoinPrice {
  [coinName: string]: {
    [currency: string]: number;
  };
}

export default function useCoinPrice(coinSymbol: string, currency: string) {
  const getCoinPriceQuery = useQuery({
    queryKey: ["coinPrice", coinSymbol, currency],
    queryFn: async (): Promise<CoinPrice> => {
      const response: CoinPrice = await axiosOpenApi.get(
        `price/coinPrice/${coinSymbol}-${currency}`
      );
      return response;
    },
    enabled: !!coinSymbol && !!currency,
  });

  return {
    coinPrice: getCoinPriceQuery.data,
    isLoading: getCoinPriceQuery.isLoading,
    isError: getCoinPriceQuery.isError,
    error: getCoinPriceQuery.error,
  };
}
