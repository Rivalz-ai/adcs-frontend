import axiosInstance from "@/libs/apis";
import { getAccessToken } from "@/libs/utls";
import { queryClient } from "@/providers/providers";
import { useMutation, useQuery } from "@tanstack/react-query";

const QUERY_KEY = {
  GET_ALL_KEYS: "GET_ALL_KEYS",
};

export interface IKey {
  id: number;
  name: string;
  userId: number;
  apiKey: string;
  expiresAt: string;
  createdAt: string;
}

export const useGetMyKeys = () => {
  const accessToken = getAccessToken();
  const { data, isLoading, isFetching, error } = useQuery<IKey[]>({
    queryKey: [QUERY_KEY.GET_ALL_KEYS],
    enabled: !!accessToken,
    queryFn: async () => {
      return axiosInstance.get("v1/auth/api-keys");
    },
  });

  return {
    myKeys: data || [],
    isLoadingKeys: isLoading || isFetching,
    errorKeys: error,
  };
};

export const useCreateKey = () => {
  const { mutateAsync, isPending, error } = useMutation<
    void,
    Error,
    { keyName: string }
  >({
    mutationFn: async ({ keyName }) => {
      return axiosInstance.post(`v1/auth/api-key/${keyName}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ALL_KEYS] });
    },
  });

  return {
    createApiKey: mutateAsync,
    isPendingCreateApiKey: isPending,
    errorCreateApiKey: error,
  };
};
