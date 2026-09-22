const ACCOUNT_SORT_OPTIONS = [
    { value: 'name', label: 'Name'},
    { value: 'balance', label: 'Balance'},
];

const BUDGET_SORT_OPTIONS = [
    { value: 'limit', label: 'Limit'},
    { value: 'startDate', label: 'Start Date '},
    { value: 'endDate', label: 'End Date'},
];

const RECURRING_SORT_OPTIONS = [
    { value: 'amount', label: 'Amount'},
    { value: 'nextOccurence', label: 'Next Occurence' },
    { value: 'endDate', label: 'End Date'},
];

const TRANSACTION_SORT_OPTIONS = [
    { value: 'amount', label: 'Amount'},
    { value: 'occuredAt', label: 'Occured At'}
];

module.exports = { ACCOUNT_SORT_OPTIONS, BUDGET_SORT_OPTIONS, RECURRING_SORT_OPTIONS, TRANSACTION_SORT_OPTIONS }