export function formatCurrency() {
    return new Intl.NumberFormat('en-US', { style: 'currency' }).format();
}

