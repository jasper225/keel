import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as recurring from "../api/recurring";
import { queryKeys } from "../api/queryKeys";

export function useRecurrings(filters = {}) {
  return useQuery({
    queryKey: queryKeys.recurring.all,
    queryFn: () => recurring.getRecurringByUser(filters),
  });
}

export function useRecurring(id) {
  return useQuery({
    queryKey: queryKeys.tags.detail(id),
    queryFn: () => recurring.getRecurringById(),
  });
}

export function useUpcomingRecurrings() {
  return useQuery({
    queryKey: queryKeys.recurring.upcoming(),
    queryFn: () => recurring.getUpcomingRecurring(),
  });
}

export function useCreateRecurring() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recurring.createRecurring,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recurring.all });
    },
  });
}

export function useResumeRecurring() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recurring.resumeRecurring,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recurring.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.recurring.detail(id),
      });
    },
  });
}

export function usePauseRecurring() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recurring.pauseRecurring,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recurring.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.recurring.detail(id),
      });
    },
  });
}

export function useUpdateRecurring() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recurring.updateRecurring,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recurring.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.recurring.detail(id) });
    },
  })
}

export function useDeleteRecurring() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recurring.deleteRecurring,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recurring.all });
    },
  });
}
