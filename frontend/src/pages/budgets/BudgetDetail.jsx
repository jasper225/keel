import { useParams } from "react-router-dom";
import { useBudget } from "../../hooks/useBudgets";
import { formatDate } from "../../utils/formatDate";
import BudgetProgressBar from "./BudgetProgressBar";

export default function BudgetDetail() {
  const { id } = useParams();
  const { data: budget, isLoading, error } = useBudget(id);
  if (isLoading) return <p>Loading budget ...</p>;
  if (error) return <p className="text-red-600">Error loading budget</p>;
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Budget Details</h1>
      <h2 className="font-semibold text-gray-900">
        Budget Category: {budget.category}
      </h2>
      <h2 className="font-semibold text-gray-900">
        Budget Limit: {budget.amount_limit}
      </h2>
      <h2 className="font-semibold text-gray-900">
        Budget Period: {budget.period}
      </h2>
      <h2 className="font-semibold text-gray-900">
        Start Date: {formatDate(account.start_date)}
      </h2>
      <h2 className="font-semibold text-gray-900">
        End Date: {formatDate(account.end_date)}
      </h2>
      <h1 className="text-xl font-semibold text-gray-900">
        Budget Progress
        <BudgetProgressBar />
      </h1>
    </div>
  );
}
