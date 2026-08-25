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
        byAccount: (accountId) => ['transactions', 'account', accountId],
        detail: (id) => ['transactions', id],
    },
    budgets: {
        all: ['budgets'],
        detail: (id) => ['budgets', id],
        byCategory: (id) => ['budgets', id, 'category']
    },
    categories: {
        all: ['categories'],
        details: (id) => ['categories', id],
        children: (id) => ['categories', id, 'children']
    },
    tags: {
        all: ['tags'],
        forTransaction: (txnId) => ['tags', 'transaction', txnId],
        transactionsForTag: (tagId) => ['tags', tagId, 'transaction',],
    },
    recurring: {
        all: ['recurring'],
        detail: (id) => ['recurring', id],
    },
};