import { useBudgets } from "../../hooks/useBudgets";
import Header from "../../components/ui/Header";

export default function BudgetColumns({ sortBy, sortDir }) {
  const { data: budgets, isLoading, error } = useBudgets(sortBy, sortDir);
  if (isLoading) return <p>Loading budgets...</p>;
  if (error) return <p className="text-red-600">Error loading budgets</p>;

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
      <Header label={"Category"} />
      <div className="flex flex-col space-y-2">
        {budgets.map((budget) => (
          <p className="font-medium text-gray-900">{budget.category_id}</p>
        ))}
      </div>
      <Header label={"Amount Limit"} />
      <div className="flex flex-col space-y-2">
        {budgets.map((budget) => (
          <p className="font-medium text-gray-900">{budget.amount_limit}</p>
        ))}
      </div>
      <Header label={"Period"} />
      <div className="flex flex-col space-y-2">
        {budgets.map((budget) => (
          <p className="font-medium text-gray-900">{budget.period}</p>
        ))}
      </div>
      <Header label={"Start Date"} />
      <div className="flex flex-col space-y-2">
        {budgets.map((budget) => (
          <p className="font-medium text-gray-900">{budget.start_date}</p>
        ))}
      </div>
      <Header label={"End Date"} />
      <div className="flex flex-col space-y-2">
        {budgets.map((budget) => (
          <p className="font-medium text-gray-900">{budget.end_date}</p>
        ))}
      </div>
    </div>
  );
}
