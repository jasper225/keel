const ACCOUNT_LABELS = [
    { value: 'name', label: 'Name'},
    { value: 'currency', label: 'Currency'},
    { value: 'balance', label: 'Balance'},
    { value: 'details', label: 'Details'},
];

const BUDGET_LABELS = [
    { value: 'category', label: 'Category'},
    { value: 'amountLimit', label: 'Amount Limit'},
    { value: 'period', label: 'Period'},
    { value: 'startDate', label: 'Start Date'},
    { value: 'endDate', label: 'End Date'},
    { value: 'details', label: 'Details'},
];

const RECURRING_LABELS = [
    { value: 'account', label: 'Account'},
    { value: 'category', label: 'Category'},
    { value: 'amount', label: 'Amount'},
    { value: 'type', label: 'Type'},
    { value: 'period', label: 'Period'},
    { value: 'nextOccurence', label: 'Next Occurence'},
    { value: 'details', label: 'Details'},
];

const TAG_LABELS = [
    { value: 'name', label: 'Name'},
    { value: 'count', label: 'Count'},
    { value: 'details', label: 'Details'},
];

const TRANSACTION_LABELS = [
    { value: 'account', label: 'Account'},
    { value: 'category', label: 'Category'},
    { value: 'amount', label: 'Amount'},
    { value: 'type', label: 'Type'},
    { value: 'occuredAt', label: 'Occured At'},
    { value: 'details', label: 'Details'},
];

module.exports = { ACCOUNT_LABELS, BUDGET_LABELS, RECURRING_LABELS, TAG_LABELS, TRANSACTION_LABELS };
