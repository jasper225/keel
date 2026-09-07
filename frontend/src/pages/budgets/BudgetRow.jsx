import Button from "../../components/ui/Button";
import { useParams } from "react-router-dom";
import { useBudget } from "../../hooks/useBudgets";

export default function BudgetRow({ budget, onEdit }) {
    const { budgetId } = useParams();
    const { data: budget } = useBudget(budgetId);

    return (
        <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
            <div>
                <p className="font-medium text-gray-500"> {budget.category}</p>
                <p className="font-medium text-gray-500"> {budget.amount_limit}</p>
                <p className="font-medium text-gray-500"> {budget.period}</p>
                <p className="font-medium text-gray-500"> {budget.start_date}</p>
                <p className="font-medium text-gray-500"> {budget.end_date}</p>
            </div>
            <div className="flex items-center gap-4">
                <Button onClick={() => onEdit(budget)}>Edit</Button>
            </div>
        </div>
    )
}