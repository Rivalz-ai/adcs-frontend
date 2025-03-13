import axiosInstance from "@/libs/apis";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteAdapter() {
  const deleteAdaptorMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await axiosInstance.delete(`/adaptors/${id}`);
      return response;
    },
  });
  return {
    deleteAdaptor: deleteAdaptorMutation.mutateAsync,
    isLoading: deleteAdaptorMutation.isPending,
  };
}
