import axiosWithoutBaseUrl from "@/libs/apis/api-axios-without-baseurl";
import { useQuery } from "@tanstack/react-query";

export default function useExecuteProvider(isTrigger: boolean, url?: string) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["execute-provider", url],
    queryFn: async () => {
      const response = await axiosWithoutBaseUrl.get(url || "");
      return response;
    },
    enabled: isTrigger && !!url,
  });

  return {
    dataExecute: data,
    isLoadingExecute: isLoading,
    isErrorExecute: isError,
    errorExecute: error,
    refetchExecute: refetch,
  };
}
