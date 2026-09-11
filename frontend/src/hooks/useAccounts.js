import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as account from "../api/accounts";
import { queryKeys } from "../api/queryKeys";

export function useAccounts(includeArchived = false) {
  return useQuery({
    queryKey: queryKeys.accounts.all,
    queryFn: () => account.getUserAccounts(includeArchived),
  });
}

export function useAccount(id) {
  return useQuery({
    queryKey: queryKeys.accounts.details(id),
    queryFn: () => account.getAccountById(id),
    enabled: !!id,
  });
}

export function useAccountBalance(id) {
  return useQuery({
    queryKey: queryKeys.accounts.balance(id),
    queryFn: () => account.getAccountBalance(id),
    enabled: !!id,
  });
}

export function useNetWorth() {
   return useQuery({
    queryKey: queryKeys.accounts.all,
    queryFn: () => account.getNetWorth(),
  });
}

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: account.createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts.all });
    },
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: account.updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.accounts.details(id),
      });
    },
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: account.deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts.all });
    },
  });
}
