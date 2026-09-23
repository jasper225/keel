import Button from "../../components/ui/Button";
import { useParams } from "react-router-dom";
import { useAccount, useAccountBalance } from "../../hooks/useAccounts";
import { formatCurrency } from "../../utils/formatCurrency";

export default function AccountRow({ account, onEdit }) {
    const { id } = useParams();
    const { data: account } = useAccount(id);
    const { data: balance, isLoading } = useAccountBalance(id);

    return (
        <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
            <div>
                <p className="font-medium text-gray-900">{account.name}</p>
                <p className="text-sm text-gray-500 capitalize"> {account.type.replace('_', ' ')} * {account.currency}</p>
                <span className="text-sm font-medium text-gray-900">
                    { isLoading ? '...' : formatCurrency(balance, account.currency)}
                </span>
                <p className="font-medium text-gray-500"><Link to="/accounts:id">Details</Link></p>
            </div>
            <div className="flex items-center gap-4">
                <Button onClick={() => onEdit(account)}>Edit</Button>
            </div>
        </div>
    )
}