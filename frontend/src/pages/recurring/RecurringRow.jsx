import Button from "../../components/ui/Button";
import { useParams } from "react-router-dom";
import { useRecurringTransaction } from "../../hooks/useRecurringTxn";

export default function RecurringRow({ recurringTxn, onEdit }) {
    const { id } = useParams();
    const { data: recurringTxn } = useRecurringTransaction(id);

    return (
        <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
            <div>
                <p className="font-medium text-gray-900">{recurringTxn.account}</p>
                <p className="font-medium text-gray-500"> {recurringTxn.category}</p>
                <p className="font-medium text-gray-500"> {recurringTxn.amount}</p>
                <p className="font-medium text-gray-500"> {recurringTxn.type}</p>
                <p className="font-medium text-gray-500"> {recurringTxn.interval_unit}</p>
                <p className="font-medium text-gray-500"> {recurringTxn.next_occurence}</p>
            </div>
            <div className="flex items-center gap-4">
                <Button onClick={() => onEdit(recurringTxn)}>Edit</Button>
            </div>
        </div>
    )
}