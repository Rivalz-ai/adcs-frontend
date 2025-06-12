import axiosInstance from "@/libs/apis";
import { useQuery } from "@tanstack/react-query";

interface AiModel {
  id: number;
  name: string;
  description: string;
}

export default function useGetAiModel() {
  return useQuery<AiModel[]>({
    queryKey: ["ai-model"],
    queryFn: async () => {
      return axiosInstance.get("ai/models");
    },
  });
}
