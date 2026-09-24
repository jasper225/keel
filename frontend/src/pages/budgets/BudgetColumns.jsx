import { useBudgets } from "../../hooks/useBudgets";

export default function BudgetColumns({ sortBy, sortDir, onEdit }) {
  const { data: budgets, isLoading, error } = useBudgets(sortBy, sortDir);
  if (isLoading) return <p>Loading budgets...</p>;
  if (error) return <p className="text-red-600">Error loading budgets</p>;

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
      <div className="flex flex-col space-y-2">
          {budgets.map((budget) => (
            <p className="font-medium text-gray-900">{budget.category_id}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
          {budgets.map((budget) => (
            <p className="font-medium text-gray-900">{budget.amount_limit}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
          {budgets.map((budget) => (
            <p className="font-medium text-gray-900">{budget.period}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
          {budgets.map((budget) => (
            <p className="font-medium text-gray-900">{budget.start_date}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
          {budgets.map((budget) => (
            <p className="font-medium text-gray-900">{budget.end_date}</p>
          ))}
      </div>
    </div>
  );
}
