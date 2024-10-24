import axiosInstance from "@/libs/apis";
import { InferenceResponse } from "@/types/adapter-type";
import { useQuery } from "@tanstack/react-query";

export default function useGetInference(isTrigger: boolean) {
  const getInferenceQuery = useQuery({
    queryKey: ["inference"],
    queryFn: async () => {
      const response: InferenceResponse = await axiosInstance.get("inference");
      return response;
    },
    enabled: isTrigger,
  });

  return {
    data: getInferenceQuery.data,
    isLoading: getInferenceQuery.isLoading || getInferenceQuery.isFetching,
    refetch: getInferenceQuery.refetch,
  };
}
