import { useEffect } from "react";
import { useAccount } from "../../hooks/useAccounts";
import { useAccountBalance } from "../../hooks/useAccounts";

function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export default function AccountDetail() {
    const { data: account, isLoading, error } = useAccount();
    if (isLoading) return <p>Loading accounts ...</p>;
    if (error) return <p className='text-red-600'>Error loading accounts</p>;
    return (
        <div>
            <h1 className='text-xl font-semibold text-gray-900'>{account.name}</h1>
            <h2>Account Type: {account.type}</h2>
            <h2>Account Currency: {account.currency}</h2>
            <h2>Account Balance: {account.balance}</h2>
        </div>
    )
}