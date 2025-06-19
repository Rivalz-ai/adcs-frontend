import axiosInstance from "@/libs/apis";
import { useQuery } from "@tanstack/react-query";

export interface IAiModel {
  id: number;
  name: string;
  description: string;
  iconUrl?: string;
  type?: string;
}

export default function useGetAiModel() {
  return useQuery<IAiModel[]>({
    queryKey: ["ai-model"],
    queryFn: async () => {
      return axiosInstance.get("ai/models");
    },
  });
}
