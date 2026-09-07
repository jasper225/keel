import Button from "../../components/ui/Button";
import { useParams } from "react-router-dom";
import { useAccount } from "../../hooks/useAccounts";
import { useAccountBalance } from "../../hooks/useAccounts";

function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export default function AccountRow({ account, onEdit }) {
    const { accountId } = useParams();
    const { data: account } = useAccount(accountId);
    const { data: balance, isLoading } = useAccountBalance(accountId);

    return (
        <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
            <div>
                <p className="font-medium text-gray-900">{account.name}</p>
                <p className="text-sm text-gray-500 capitalize"> {account.type.replace('_', ' ')} * {account.currency}</p>
                <span className="text-sm font-medium text-gray-900">
                    { isLoading ? '...' : formatCurrency(balance, account.currency)}
                </span>
            </div>
            <div className="flex items-center gap-4">
                <Button onClick={() => onEdit(account)}>Edit</Button>
            </div>
        </div>
    )
}