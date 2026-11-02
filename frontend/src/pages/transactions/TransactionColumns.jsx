import { Link } from "react-router-dom";
import { useTransactions } from "../../hooks/useTransactions";
import { useAccounts } from "../../hooks/useAccounts";
import { useCategories } from "../../hooks/useCategories";
import { TRANSACTION_LABELS } from "../../utils/constants/headerLabels";

export default function TransactionColumns({ filters, sortBy, sortDir, onSort }) {
  const { data: transactions, isLoading, error } = useTransactions(filters, sortBy, sortDir);
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();
  
  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-600">Error loading transactions</p>;

  /*const accountName = (id) => accounts?.find((a) => a.id === id)?.name ?? "Unknown";
  const categoryName = (id) => (id ? categories?.find((c) => c.id === id)?.name ?? "Unknown" : "Uncategorized");*/

  return (
    <table className="w-full border border-gray-200 bg-white rounded-md">
      <thead>
        <tr>
          {TRANSACTION_LABELS.map((col) => (
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
        {transactions.map((transaction) => (
          <tr key={transaction.id} className="border-t border-gray-100">
            <td className="px-4 py-3 text-sm text-gray-900">{transaction.amount}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{transaction.occurred_at}</td>
            <td className="px-4 py-3 text-sm text-gray-900"><Link to={`/transactions/${transaction.id}`}> View Details</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
