import axiosInstance from "@/libs/apis";
import { useMutation } from "@tanstack/react-query";

export const useRunAdaptorMutation = () => {
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const { adaptorId, input } = data;
      return axiosInstance.post(`v2/adapter/run/${adaptorId}`, { input });
    },
  });

  return { mutate, mutateAsync, isPending };
};
