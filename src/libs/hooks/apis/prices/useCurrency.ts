import axiosOpenApi from "@/libs/apis/open-api-axios";
import { useQuery } from "@tanstack/react-query";

interface Currency {
  name: string;
}

export default function useCurrency() {
  const getCurrencyQuery = useQuery({
    queryKey: ["currency"],
    queryFn: async (): Promise<Currency[]> => {
      const response: Currency[] = await axiosOpenApi.get("price/currency");
      return response;
    },
  });

  return {
    currency: getCurrencyQuery.data,
    isLoading: getCurrencyQuery.isLoading,
    isError: getCurrencyQuery.isError,
    error: getCurrencyQuery.error,
  };
}
