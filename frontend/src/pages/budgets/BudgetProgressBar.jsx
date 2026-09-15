export default function BudgetProgressBar({ progress }) {
  if (!progress) return null;

  const { budget, spent, remaining, percentUsed } = progress;
  const isOverBudget = percentUsed > 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className={isOverBudget ? "text-red-600" : "text-gray-500"}>
          ${spent.toFixed(2)} / ${Number(budget.amount_limit).toFixed(2)}
        </span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
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
