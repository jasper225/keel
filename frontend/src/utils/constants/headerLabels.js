const ACCOUNT_LABELS = [
    { value: 'name', label: 'Name'},
    { value: 'balance', label: 'Balance'},
];

const BUDGET_LABELS = [
    { value: 'amountLimit', label: 'Amount Limit'},
    { value: 'startDate', label: 'Start Date'},
    { value: 'endDate', label: 'End Date'},
];

const RECURRING_LABELS = [
    { value: 'amount', label: 'Amount'},
    { value: 'nextOccurence', label: 'Next Occurence'},
    { value: 'endDate', label: 'End Date'},
];

const TAG_LABELS = [
    { value: 'name', label: 'Name'},
    { value: 'count', label: 'Count'},
];

const TRANSACTION_LABELS = [
    { value: 'amount', label: 'Amount'},
    { value: 'occuredAt', label: 'Occured At'},
];

module.exports = { ACCOUNT_LABELS, BUDGET_LABELS, RECURRING_LABELS, TAG_LABELS, TRANSACTION_LABELS };
