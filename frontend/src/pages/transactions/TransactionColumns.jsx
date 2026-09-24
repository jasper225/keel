import { useTransactions } from "../../hooks/useTransactions";

export default function TransactionColumns({ filters, sortBy, sortDir, onEdit }) {
  const { data: transactions, isLoading, error } = useTransactions(filters, sortBy, sortDir);
  if (isLoading) return <p>Loading tags...</p>;
  if (error) return <p className="text-red-600">Error loading tags</p>;

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
      <div className="flex flex-col space-y-2">
          {transactions.map((transaction) => (
            <p className="font-medium text-gray-900">{transaction.account_id}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
          {transactions.map((transaction) => (
            <p className="font-medium text-gray-900">{transaction.category_id}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
          {transactions.map((transaction) => (
            <p className="font-medium text-gray-900">{transaction.amount}</p>
          ))}
      </div>
      <div className="flex flex-col space-y-2">
        {transactions.map((transaction) => (
          <p className="font-medium text-gray-900">{transaction.occured_at}</p>
        ))}
      </div>
    </div>
  );
}