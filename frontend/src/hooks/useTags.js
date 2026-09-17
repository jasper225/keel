import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as tag from "../api/tags";
import { queryKeys } from "../api/queryKeys";

export function useTag(id) {
  return useQuery({
    queryKey: queryKeys.tags.all,
    queryFn: () => tag.getTag(id),
    enabled: !!id,
  });
}

export function useTags() {
  return useQuery({
    queryKey: queryKeys.tags.all,
    queryFn: () => tag.getUserTags(),
  });
}

export function useSearchTags(query) {
  return useQuery({
    queryKey: queryKeys.tags.search,
    queryFn: () => tag.searchTags(query),
  });
}

export function useTagTransactions(id) {
  return useQuery({
    queryKey: queryKeys.tags.tagTransactions,
    queryFn: () => tag.getTagTransactions(id),
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tag.createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });
    },
  });
}

export function useRenameTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }) => tag.renameTag(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });
    },
  });
}

export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tag.deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });
    },
  });
}
