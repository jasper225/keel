import { useRecentTransactions } from "../../hooks/useTransactions";
import TransactionRow from "../transactions/TransactionRow";

export default function RecentTransactions() {
  const { data: recentTransactions } = useRecentTransactions();

  return (
    <div className="m-0 min-w-0 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-xl font-semibold text-gray-900">
        Recent Transactions
      </h1>
      {recentTransactions.map((transaction) => (
        <TransactionRow
          key={transaction.id}
          transaction={transaction}
          onEdit={transaction}
        />
      ))}
    </div>
  );
}
