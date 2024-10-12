import axiosInstance from "@/libs/apis";
import { OutputType } from "@/types/adapter-type";
import { useQuery } from "@tanstack/react-query";

export default function useGetOutPutTypes() {
  const getOutTypesQuery = useQuery({
    queryKey: ["adaptors-out-types"],
    queryFn: async (): Promise<OutputType[]> => {
      const response: OutputType[] = await axiosInstance.get(
        "/adaptors/outputType"
      );
      return response;
    },
  });
  return {
    outputData: getOutTypesQuery.data || [],
    isLoading: getOutTypesQuery.isLoading || getOutTypesQuery.isFetching,
    refetchOutputType: getOutTypesQuery.refetch,
  };
}
