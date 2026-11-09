import "../styles/BudgetProgressBar.css";

export default function BudgetProgressBar({ progress }) {
  if (!progress) return null;

  const { budget, spent, remaining, percentUsed } = progress;
  const isOverBudget = percentUsed > 100;
  return (
    <div className="space-y-1">
      <div className="budget-progress">
        <span className={isOverBudget ? "text-red-600" : "text-gray-500"}>
          ${spent.toFixed(2)} / ${Number(budget.amount_limit).toFixed(2)}
        </span>
      </div>

      <div className="budget-pct">
        <div
          className={`h-full rounded-full ${isOverBudget ? "bg-red-500" : "bg-blue-500"}`}
          style={{ width: `${Math.min(percentUsed, 100)}%` }}
        />
      </div>

      <p className="text-xs text-gray-400">
        {remaining >= 0
          ? `$${remaining.toFixed(2)} remaining`
          : `$${Math.abs(remaining).toFixed(2)} over`}
      </p>
    </div>
  );
}
