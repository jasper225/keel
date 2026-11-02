import { Link } from "react-router-dom";
import { useBudgets } from "../../hooks/useBudgets";
import { BUDGET_LABELS } from "../../utils/constants/headerLabels";

export default function BudgetColumns({ sortBy, sortDir, onSort }) {
  const { data: budgets } = useBudgets(sortBy, sortDir);

  if (isLoading) return <p>Loading budgets...</p>;
  if (error) return <p className="text-red-600">Error loading budgets</p>;

  return (
    <table className="w-full border border-gray-200 bg-white rounded-md">
      <thead>
        <tr>
          {BUDGET_LABELS.map((col) => (
            <th
              key={col.key}
              onClick={() => onSort(col.key)}
              className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50"
            >
              {col.label}{" "}
              {sortBy === col.key ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
          ))}
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50">
            Details
          </th>
        </tr>
      </thead>
      <tbody>
        {budgets.map((budget) => (
          <tr key={budget.id} className="border-t border-gray-100">
            <td className="px-4 py-3 text-sm text-gray-900">
              {budget.amount_limit}
            </td>
            <td className="px-4 py-3 text-sm text-gray-900">
              {budget.start_date}
            </td>
            <td className="px-4 py-3 text-sm text-gray-900">
              {budget.end_date}
            </td>
            <td className="px-4 py-3 text-sm text-gray-900">
              <Link to={`/budgets/${budget.id}`}>Details</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
