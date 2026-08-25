import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as budget from '../api/budgets';
import { queryKeys } from '../api/queryKeys';

export function useBudgets(includeArchived = false) {
    return useQuery({
        queryKey: queryKeys.budgets.all,
        queryFn: () => budget.getUserBudgets(includeArchived),
    });
}

export function useBudgetsByCategory(id) {
    return useQuery({
        queryKey: queryKeys.budgets.byCategory(id),
        queryFn: () => budget.getBudgetsByCategory(id),
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