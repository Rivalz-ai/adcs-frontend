import { MethodItem } from "@/types/provider-type";
import { useMutation } from "@tanstack/react-query";
import ClientCurlExecutor from "@/libs/utls/client-curl-executor";
import { useToast } from "@chakra-ui/react";

export default function useExecuteProvider() {
  const toast = useToast();
  const { mutate, mutateAsync, isPending, data } = useMutation({
    mutationFn: async (method: MethodItem) => {
      const { playground } = method;
      const executor = new ClientCurlExecutor();
      return executor.executeCurl(playground);
    },
    onError: (error) => {
      toast({
        title: "Error execute provider",
        description: error.message,
        status: "error",
      });
    },
  });

  return { mutate, mutateAsync, isPending, data };
}
