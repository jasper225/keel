import TransactionRow from "./TransactionRow";
import { useTransactions } from '../../hooks/useTransactions';


export default function TransactionList({ filters, sortBy, sortDir, onEdit}) {
    const { data: transactions, isLoading, error } = useTransactions(filters, sortBy, sortDir);
    if (isLoading) return <p>Loading transactions...</p>;
    if (error) return <p className='text-red-600'>Error loading transactions</p>;

    return (
      <div className="flex flex-col space-y-2">
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet — add one to get started.</p>
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
    )
}