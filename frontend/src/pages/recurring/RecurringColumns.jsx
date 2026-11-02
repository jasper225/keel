import { Link } from "react-router-dom";
import { useRecurrings} from "../../hooks/useRecurring";
import { RECURRING_LABELS } from "../../utils/constants/headerLabels";

export default function RecurringColumns({ sortBy, sortDir, onSort }) {
  const { data: recurrings, isLoading, error } = useRecurrings(sortBy, sortDir);
  
  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-600">Error loading transactions</p>;

  return (
    <table className="w-full border border-gray-200 bg-white rounded-md">
      <thead>
        <tr>
          {RECURRING_LABELS.map((col) => (
            <th
              key={col.key}
              onClick={() => onSort(col.key)}
              className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50"
            >
              {col.label} {sortBy === col.key ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
          ))}
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50">Details</th>
        </tr>
      </thead>
      <tbody>
        {recurrings.map((recurring) => (
          <tr key={recurring.id} className="border-t border-gray-100">
            <td className="px-4 py-3 text-sm text-gray-900">{recurring.amount}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{recurring.next_occurence}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{recurring.end_date}</td>
            <td className="px-4 py-3 text-sm text-gray-900"><Link to={`/recurringTransactions/${recurring.id}`}> View Details</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
