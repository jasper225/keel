import Button from "../../components/ui/Button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRecurring } from "../../hooks/useRecurring";

export default function RecurringRow({ recurring, onEdit }) {
    const { id } = useParams();
    const { data: recurring } = useRecurring(id);

    return (
        <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
            <div>
                <p className="font-medium text-gray-900">{recurring.account}</p>
                <p className="font-medium text-gray-500"> {recurring.category}</p>
                <p className="font-medium text-gray-500"> {recurring.amount}</p>
                <p className="font-medium text-gray-500"> {recurring.type}</p>
                <p className="font-medium text-gray-500"> {recurring.interval_unit}</p>
                <p className="font-medium text-gray-500"> {recurring.next_occurence}</p>
                <p className="font-medium text-gray-500"> <Link to="/recurringTransactions:id">Details</Link> </p>

            </div>
            <div className="flex items-center gap-4">
                <Button onClick={() => onEdit(recurring)}>Edit</Button>
            </div>
        </div>
    )
}