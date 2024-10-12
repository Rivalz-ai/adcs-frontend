import axiosInstance from "@/libs/apis";
import { Category } from "@/types/adapter-type";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategories() {
  const getCategoriesQuery = useQuery({
    queryKey: ["adaptors-categories"],
    queryFn: async (): Promise<Category[]> => {
      const response: Category[] = await axiosInstance.get(
        "/adaptors/category"
      );
      return response;
    },
  });
  return {
    categories: getCategoriesQuery.data || [],
    isLoading: getCategoriesQuery.isLoading || getCategoriesQuery.isFetching,
    refetchCategory: getCategoriesQuery.refetch,
  };
}
