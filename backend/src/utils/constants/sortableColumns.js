const ACCOUNT_SORTABLE_COLUMNS = {
    name: 'a.name',
    balance: 'a.balance'
};

const TRANSACTION_SORTABLE_COLUMNS = {
    amount: 't.amount',
    occuredAt: 't.occured_at',
};

const BUDGET_SORTABLE_COLUMNS = {
    amountLimit: 'b.amount_limit',
    startDate: 'b.start_date',
    endDate: 'b.end_date',
};

const RECURRING_SORTABLE_COLUMNS = {
    amount: 'rt.amount',
    nextOccurence: 'rt.next_occurence',
    endDate: 'rt.end_date',
};

module.exports = { ACCOUNT_SORTABLE_COLUMNS, TRANSACTION_SORTABLE_COLUMNS, BUDGET_SORTABLE_COLUMNS, RECURRING_SORTABLE_COLUMNS }