import Button from "../../components/ui/Button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRecurring } from "../../hooks/useRecurring";
import "../styles/Row.css";

export default function RecurringRow({ recurring, onEdit }) {
    const { id } = useParams();
    const { data: recurring } = useRecurring(id);

    return (
        <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3" id="row">
            <div>
                <p className="font-medium text-gray-500">{recurring.account}</p>
                <p className="font-medium text-gray-500"> {recurring.category}</p>
                <p className="font-medium text-gray-500"> {recurring.amount}</p>
                <p className="font-medium text-gray-500"> {recurring.type}</p>
                <p className="font-medium text-gray-500"> {recurring.interval_unit}</p>
                <p className="font-medium text-gray-500"> {recurring.next_occurence}</p>
                <p className="font-medium text-gray-500"> <Link to={`/recurringTransactions/${recurring.id}`}>Details</Link> </p>

            </div>
            <div className="flex items-center gap-4" id="edit">
                <Button onClick={() => onEdit(recurring)}>Edit</Button>
            </div>
        </div>
    )
}