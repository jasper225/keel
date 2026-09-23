export const queryKeys = {
    auth: {
        me: ['auth', 'me']
    },
    accounts: {
        all: ['accounts'],
        user: (sortBy, sortDir) => ['accounts', { sortBy, sortDir }],
        details: (id) => ['accounts', id],
        balance: (id) => ['accounts', id, 'balance'],
        netWorth: () => ['accounts', 'netWorth'],
    },
    transactions: {
        all: ['transactions'],
        user: (filters, sortBy, sortDir) => ['transactions', { filters, sortBy, sortDir}],
        detail: (id) => ['transactions', id],
        tagsForTransaction: (id) => ['transactions', id, 'tags'],
        recent: () => ['transactions', 'recent'],
        incomeVsExpense: () => ['transactions', 'incomeVsExpense'],
        spendingByCategory: () => ['transactions', 'spendingByCategory'],
    },
    budgets: {
        all: ['budgets'],
        user: (sortBy, sortDir) => ['accounts', { sortBy, sortDir }],
        detail: (id) => ['budgets', id],
        progress: (id) => ['budgets', id, 'progress'],
        userProgress: () => ['budgets', 'progress'],
    },
    categories: {
        all: ['categories'],
        details: (id) => ['categories', id],
        children: (id) => ['categories', id, 'children'],
        budgets: (id) => ['categories', id, 'budgets'],
    },
    tags: {
        all: ['tags'],
        user: (sortBy, sortDir) => ['tags', { sortBy, sortDir }],
        detail: (id) => ['tags', id],
        tagTransactions: (id) => ['tags', id, 'transactions'],
        count: (id) => ['tags', id, 'count'],
    },
    recurring: {
        all: ['recurring'],
        user: (sortBy, sortDir) => ['recurring', { sortBy, sortDir }],
        detail: (id) => ['recurring', id],
        upcoming: () => ['recurring', 'upcoming'],
    },
};