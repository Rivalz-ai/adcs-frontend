import axiosInstance from "@/libs/apis";
import { useQuery } from "@tanstack/react-query";

export interface NetworkItem {
  id: number;
  name: string;
  type: string;
  iconUrl: string | null;
  docsUrl: string | null;
  coordinatorAddress: string;
}

export const useGetNetwork = () => {
  return useQuery<NetworkItem[]>({
    queryKey: ["networks"],
    queryFn: () => axiosInstance.get("v1/network/list"),
  });
};
