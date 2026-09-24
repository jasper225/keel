import { useAccounts, useAccountBalance } from "../../hooks/useAccounts";
import { useParams, Link } from "react-router-dom";

export default function AccountColumns({ sortBy, sortDir, onEdit }) {
  const { id } = useParams;
  const { data: accounts, isLoading, error } = useAccounts(sortBy, sortDir);
  const { data: balance } = useAccountBalance(id);
  if (isLoading) return <p>Loading accounts...</p>;
  if (error) return <p className="text-red-600">Error loading accounts</p>;

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
      <div className="flex flex-col space-y-2">
          {accounts.map((account) => (
            <p className="font-medium text-gray-900">{account.name}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
          {accounts.map((account) => (
            <p className="font-medium text-gray-900">{account.type}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
          {accounts.map((account) => (
            <p className="font-medium text-gray-900">{account.currency}</p>
          ))}
      </div>
       <div className="flex flex-col space-y-2">
        {accounts.map((account) => (
          <p key={account.id} className="font-medium text-gray-900">{balance}</p>
        ))}
        </div>
    </div>
  );
}
