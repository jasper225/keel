import BudgetRow from "./BudgetRow";
import { useBudgets } from '../../hooks/useBudgets';


export default function BudgetList({ filters, onEdit }) {
    const { data: budgets, isLoading, error } = useBudgets(filters);
    if (isLoading) return <p>Loading budgets...</p>;
    if (error) return <p className='text-red-600'>Error loading transactions</p>;

    return (
      <div className="flex flex-col space-y-2">
        {budgets.length === 0 ? (
          <p className="text-gray-500">No budgets yet — add one to get started.</p>
            ) : (
              <div className="space-y-2">
              {budgets.map((budget) => (
              <BudgetRow
                key={budget.id}
                budget={budget}
                onEdit={onEdit}
              />
              ))}
               </div>
        )}
      </div>
    )
}