export const queryKeys = {
    auth: {
        me: ['auth', 'me']
    },
    accounts: {
        all: ['accounts'],
        details: (id) => ['accounts', id],
        balance: (id) => ['accounts', id, 'balance'],
        netWorth: () => ['accounts', 'netWorth'],
    },
    transactions: {
        all: ['transactions'],
        detail: (id) => ['transactions', id],
        tagsForTransaction: (id) => ['transactions', id, 'tags'],
        recent: () => ['transactions', 'recent'],
        incomeVsExpense: () => ['transactions', 'incomeVsExpense'],
        spendingByCategory: () => ['transactions', 'spendingByCategory'],
    },
    budgets: {
        all: ['budgets'],
        detail: (id) => ['budgets', id],
        progress: (id) => ['budgets', id, 'progress'],
        userProgress: () => ['budgets', 'progress'],
    },
    categories: {
        all: ['categories'],
        details: (id) => ['categories', id],
        children: (id) => ['categories', id, 'children'],
    },
    tags: {
        all: ['tags'],
        detail: (id) => ['tags', id],
        tagTransactions: (id) => ['tags', id, 'transactions'],
    },
    recurring: {
        all: ['recurring'],
        detail: (id) => ['recurring', id],
        upcoming: () => ['recurring', 'upcoming'],
    },
};