import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as tag from "../api/tags";
import { queryKeys } from "../api/queryKeys";

export function useTag(id) {
  return useQuery({
    queryKey: queryKeys.tags.detail(id),
    queryFn: () => tag.getTag(id),
    enabled: !!id,
  });
}

export function useTags(sortBy, sortDir) {
  return useQuery({
    queryKey: queryKeys.tags.user(sortBy, sortDir),
    queryFn: () => tag.getUserTags(sortBy, sortDir),
  });
}

export function useTagTransactions(id) {
  return useQuery({
    queryKey: queryKeys.tags.tagTransactions(id),
    queryFn: () => tag.getTagTransactions(id),
  });
}

export function useTagCount(id) {
  return useQuery({
    queryKey: queryKeys.tags.count(id),
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
    mutationFn: ({ id, data }) => tag.renameTag(id, data),
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
