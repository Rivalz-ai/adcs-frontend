import axiosInstance from "@/libs/apis";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteAdapter() {
  const deleteAdaptorMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`v2/adapter/delete/${id}`);
      return response;
    },
  });
  return {
    deleteAdaptor: deleteAdaptorMutation.mutateAsync,
    isLoading: deleteAdaptorMutation.isPending,
  };
}
