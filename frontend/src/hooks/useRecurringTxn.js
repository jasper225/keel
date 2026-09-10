import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as recurring from "../api/recurringTransactions";
import { queryKeys } from "../api/queryKeys";

export function useRecurringTransactions(filters = {}) {
  return useQuery({
    queryKey: queryKeys.recurring.all,
    queryFn: () => recurring.getRecurringTxnByUser(filters),
  });
}

export function useRecurringTransaction(id) {
  return useQuery({
    queryKey: queryKeys.tags.detail(id),
    queryFn: () => recurring.getRecurringTxnByUser(),
  });
}

export function useCreateRecurringTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recurring.createRecurringTxn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recurring.all });
    },
  });
}

export function useRunRecurringTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recurring.runRecurringTxn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recurring.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.recurring.detail(id),
      });
    },
  });
}

export function useResumeRecurringTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recurring.resumeRecurringTxn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recurring.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.recurring.detail(id),
      });
    },
  });
}

export function usePauseRecurringTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recurring.pauseRecurringTxn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recurring.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.recurring.detail(id),
      });
    },
  });
}

export function useDeleteRecurringTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recurring.deleteRecurringTxn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recurring.all });
    },
  });
}
