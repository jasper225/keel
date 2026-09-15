import Input from "../../components/ui/Input";
import { formatDate } from "../../utils/formatDate";

export default function IncomeVsExpense({
  incomeVsExpense,
  dateRange,
  onDateRangeChange,
}) {
  if (!incomeVsExpense) return null;
  const { income, expense } = incomeVsExpense;
  const handleChange = (field) => (e) => {
    onDateRangeChange({ ...prev, [field]: e.target.value });
  };
  return (
    <div className="income-vs-expense-page">
      <h1 className="text-xl font-semibold text-gray-900">
        Income Vs. Expenses
      </h1>
      <div className="flex items-end gap-3 my-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <Input
            type="date"
            value={dateRange.startDate}
            onChange={handleChange("startDate")}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <Input
            type="date"
            value={dateRange.endDate}
            onChange={handleChange("endDate")}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3 mb-2">
        <p className="font-medium text-gray-900">
          {" "}
          From: {formatDate(dateRange.startDate)}{" "}
        </p>
        <p className="font-medium text-gray-900">
          To: {formatDate(dateRange.endDate)}{" "}
        </p>
      </div>

      <h2>Income: {income}</h2>

      <h2>Expenses: {expense}</h2>
    </div>
  );
}
