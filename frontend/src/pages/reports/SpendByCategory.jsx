import Input from "../../components/ui/Input";
import { formatDate } from "../../utils/formatDate";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SpendByCategory({
  spendByCategory,
  dateRange,
  onDateRangeChange,
}) {
  if (!spendByCategory || spendByCategory.length === 0) return <p className="text-gray-500">No spending data for this range</p>
  const handleChange = (field) => (e) => {
    onDateRangeChange({ ...prev, [field]: e.target.value });
  };
  return (
    <div className="spend-by-category-page">
      <h1 className="text-xl font-semibold text-gray-900">
        Spending By Category
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
      <div>
        <ResponsiveContainer>
          <BarChart
            data={spendByCategory}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="categoryName" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #eaeaea",
              }}
            />
            <Bar
              dataKey="total_spent"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
