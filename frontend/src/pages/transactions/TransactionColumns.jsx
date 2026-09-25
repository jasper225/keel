import { useTransactions } from "../../hooks/useTransactions";
import Header from "../../components/ui/Header";

export default function TransactionColumns({ filters, sortBy, sortDir }) {
  const { data: transactions, isLoading, error } = useTransactions(filters, sortBy, sortDir);
  if (isLoading) return <p>Loading tags...</p>;
  if (error) return <p className="text-red-600">Error loading tags</p>;

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
      <Header label={"Account"} />
      <div className="flex flex-col space-y-2">
        {transactions.map((transaction) => (
          <p key={transaction.id} className="font-medium text-gray-900">
            {transaction.account_id}
          </p>
        ))}
      </div>
      <Header label={"Category"} />
      <div className="flex flex-col space-y-2">
        {transactions.map((transaction) => (
          <p key={transaction.id} className="font-medium text-gray-900">
            {transaction.category_id}
          </p>
        ))}
      </div>
      <Header label={"Amount"} />
      <div className="flex flex-col space-y-2">
        {transactions.map((transaction) => (
          <p key={transaction.id} className="font-medium text-gray-900">
            {transaction.amount}
          </p>
        ))}
      </div>
      <Header label={"Occured At"} />
      <div className="flex flex-col space-y-2">
        {transactions.map((transaction) => (
          <p key={transaction.id} className="font-medium text-gray-900">
            {transaction.occured_at}
          </p>
        ))}
      </div>
    </div>
  );
}
