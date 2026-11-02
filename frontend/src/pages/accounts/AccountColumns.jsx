import { useParams, Link } from 'react-router-dom';
import { useAccounts, useAccountBalance } from "../../hooks/useAccounts";
import { ACCOUNT_LABELS } from "../../utils/constants/headerLabels";

export default function AccountColumns({ sortBy, sortDir, onSort }) {
  const { id } = useParams();
  const { data: accounts } = useAccounts();
  const { data: balance } = useAccountBalance(id);
  
  if (isLoading) return <p>Loading accounts...</p>;
  if (error) return <p className="text-red-600">Error loading accounts</p>;


  return (
    <table className="w-full border border-gray-200 bg-white rounded-md">
      <thead>
        <tr>
          {ACCOUNT_LABELS.map((col) => (
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
        {accounts.map((account) => (
          <tr key={account.id} className="border-t border-gray-100">
            <td className="px-4 py-3 text-sm text-gray-900">{account.name}</td>
            <td className="px-4 py-3 text-sm text-gray-900">{balance}</td>
            <td className="px-4 py-3 text-sm text-gray-900"><Link to={`/accounts/${account.id}`}>Details</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
