export const queryKeys = {
    auth: {
        me: ['auth', 'me']
    },
    accounts: {
        all: ['accounts'],
        details: (id) => ['accounts', id],
        balance: (id) => ['accounts', id, 'balance'],
    },
    transactions: {
        all: ['transactions'],
        detail: (id) => ['transactions', id],
        tagsForTransaction: (id) => ['transactions', id, 'tags'],
    },
    budgets: {
        all: ['budgets'],
        detail: (id) => ['budgets', id]
    },
    categories: {
        all: ['categories'],
        details: (id) => ['categories', id],
        children: (id) => ['categories', id, 'children']
    },
    tags: {
        all: ['tags'],
        detail: (id) => ['tags', id]
    },
    recurring: {
        all: ['recurring'],
        detail: (id) => ['recurring', id],
    },
};