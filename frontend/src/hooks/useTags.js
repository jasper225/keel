import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as tag from '../api/tags';
import { queryKeys } from '../api/queryKeys';

export function useTags() {
    return useQuery({
            queryKey: queryKeys.tags.all,
            queryFn: () => tag.getUserTags(),
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
        }
    })
}

export function useAttachTag() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: tag.attachTag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
        },
    });
}

export function useDetachTag() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: tag.detachTag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
        },
    });
}

