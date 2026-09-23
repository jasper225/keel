const ACCOUNT_SORTABLE_COLUMNS = {
    name: 'name',
    balance: 'balance'
};

const TRANSACTION_SORTABLE_COLUMNS = {
    amount: 'amount',
    occuredAt: 'occured_at',
};

const BUDGET_SORTABLE_COLUMNS = {
    amountLimit: 'amount_limit',
    startDate: 'start_date',
    endDate: 'end_date',
};

const RECURRING_SORTABLE_COLUMNS = {
    amount: 'amount',
    nextOccurence: 'next_occurence',
    endDate: 'end_date',
};

const TAG_SORTABLE_COLUMNS = {
    name: 'name',
};

module.exports = { ACCOUNT_SORTABLE_COLUMNS, TRANSACTION_SORTABLE_COLUMNS, BUDGET_SORTABLE_COLUMNS, RECURRING_SORTABLE_COLUMNS, TAG_SORTABLE_COLUMNS }