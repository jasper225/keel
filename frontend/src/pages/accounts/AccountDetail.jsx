import { useParams } from 'react-router-dom';
import { useAccount, useAccountBalance } from "../../hooks/useAccounts";

function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export default function AccountDetail() {
    const { accountId } = useParams();
    const { data: account, isLoading, error } = useAccount(accountId);
    const { data: balance } = useAccountBalance(accountId);
    if (isLoading) return <p>Loading account ...</p>;
    if (error) return <p className='text-red-600'>Error loading account</p>;
    return (
        <div>
            <h1 className='text-xl font-semibold text-gray-900'>{account.name}</h1>
            <h2 className='font-semibold text-gray-900'>Account Type: {account.type}</h2>
            <h2 className='font-semibold text-gray-900'>Account Currency: {account.currency}</h2>
            <h2 className='font-semibold text-gray-900'>
            Account Balance: {balance !== undefined ? formatCurrency(balance, account.currency) : '...'}
            </h2>
        </div>
    )
}