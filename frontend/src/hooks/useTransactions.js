import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as transaction from '../api/transactions';
import { queryKeys } from '../api/queryKeys';

export function useTransactions(includeArchived = false) {
    return useQuery({
            queryKey: queryKeys.transactions.all,
            queryFn: () => transaction.getUserTransactions(includeArchived),
        });
}

export function useTransaction(id) {
    return useQuery({
            queryKey: queryKeys.transactions.all,
            queryFn: () => transaction.getTransaction(id),
            enabled: !!id,
        });
}

export function useAccountTransactions(id) {
    return useQuery({
        queryKey: queryKeys.transactions.byAccount(id),
        queryFn: () => transaction.getAccountTransactions(id),
        enabled: !!id,
    });
}

export function useCreateTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transaction.createTransaction,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.accounts.all });
            if (data.account_id) {
                queryClient.invalidateQueries({ queryKey: queryKeys.accounts.balance(data.account_id) })
            }
            if (data.transfer_account_id) {
                queryClient.invalidateQueries({ queryKey: queryKeys.accounts.balance(data.transfer_account_id) })
            }
        },
    });
}

export function useUpdateTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => transaction.updateTransaction(id, data),
        onSuccess: (_data, { id }) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.transactions.detail(id) });
            queryClient.invalidateQueries({ queryKey: queryKeys.accounts.all });
        }
    })
}

export function useDeleteTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transaction.deleteTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.accounts.all });
        }
    });
}



