import Button from "../../components/ui/Button";
import { useParams } from "react-router-dom";
import { useTransaction } from "../../hooks/useTransactions";

export default function TransactionRow({ transaction, onEdit }) {
    const { id } = useParams();
    const { data: transaction } = useTransaction(id);

    return (
        <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
            <div>
                <p className="font-medium text-gray-900">{transaction.account}</p>
                <p className="font-medium text-gray-500"> {transaction.category}</p>
                <p className="font-medium text-gray-500"> {transaction.amount}</p>
                <p className="font-medium text-gray-500"> {transaction.type}</p>
                <p className="font-medium text-gray-500"> {transaction.date}</p>

            </div>
            <div className="flex items-center gap-4">
                <Button onClick={() => onEdit(transaction)}>Edit</Button>
            </div>
        </div>
    )
}