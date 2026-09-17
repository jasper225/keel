import { useParams } from "react-router-dom";
import { useTag, useTagTransactions } from "../../hooks/useTags";
import TransactionRow from "../../pages/transactions/TransactionRow";

export default function TransactionDetail() {
  const { id } = useParams();
  const { data: tag, isLoading, error } = useTag(id);
  const { data: transactions } = useTagTransactions(id);
  if (isLoading) return <p>Loading transaction ...</p>;
  if (error) return <p className="text-red-600">Error loading transaction</p>;
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">#{tag.name}</h1>
      <h2 className="font-semibold text-gray-900">Transactions</h2>
      <div className="flex flex-col space-y-2">
              {transactions.length === 0 ? (
                <p className="text-gray-500">No transactions yet for #{tag.name}.</p>
                  ) : (
                    <div className="space-y-2">
                    {transactions.map((transaction) => (
                    <TransactionRow
                      key={transaction.id}
                      transaction={transaction}
                      onEdit={onEdit}
                    />
                    ))}
                     </div>
              )}
            </div>
    </div>
  );
}
