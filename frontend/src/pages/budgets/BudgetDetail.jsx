import { useParams } from "react-router-dom";
import { useBudget, useBudgetProgress } from "../../hooks/useBudgets";
import { formatDate } from "../../utils/formatDate";
import BudgetProgressBar from "./BudgetProgressBar";

export default function BudgetDetail() {
  const { id } = useParams();
  const { data: budget, isLoading, error } = useBudget(id);
  const { progress } = useBudgetProgress(id);
  if (isLoading) return <p>Loading budget ...</p>;
  if (error) return <p className="text-red-600">Error loading budget</p>;
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Budget Details</h1>
      <h2 className="font-semibold text-gray-900">
        Budget Category: {budget.category_id}
      </h2>
      <h2 className="font-semibold text-gray-900">
        Budget Limit: {budget.amount_limit}
      </h2>
      <h2 className="font-semibold text-gray-900">
        Budget Period: {budget.period}
      </h2>
      <h2 className="font-semibold text-gray-900">
        Start Date: {formatDate(budget.start_date)}
      </h2>
      <h2 className="font-semibold text-gray-900">
        End Date: {formatDate(budget.end_date)}
      </h2>
      <div className="mt-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Budget Progress
          <BudgetProgressBar progress={progress} />
        </h1>
      </div>
    </div>
  );
}
