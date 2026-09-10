import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as budget from '../api/budgets';
import { queryKeys } from '../api/queryKeys';

export function useBudgets(filters = {}) {
    return useQuery({
        queryKey: queryKeys.budgets.all,
        queryFn: () => budget.getUserBudgets(filters),
    });
}

export function useBudget(id) {
    return useQuery({
            queryKey: queryKeys.budgets.all,
            queryFn: () => budget.getBudget(id),
            enabled: !!id,
        });
}

export function useCreateBudget() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: budget.createBudget,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.budgets.all })
        }
    });
}

export function useUpdateBudget() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: budget.updateBudget,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.budgets.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.budgets.detail(id) });
        }
    })
}

export function useDeleteBudget() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: budget.deleteBudget,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.budgets.all });
        }
    });
}