import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as category from "../api/categories";
import { queryKeys } from "../api/queryKeys";

export function useCategory(id) {
  return useQuery({
    queryKey: queryKeys.categories.details(id),
    queryFn: () => category.getCategoryById(id),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: () => category.getUserCategories(),
  });
}

export function useCategoryChildren(id) {
  return useQuery({
    queryKey: queryKeys.categories.children(id),
    queryFn: () => category.getChildrenCategories(id),
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: category.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: category.updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.details(id),
      });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: category.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}
