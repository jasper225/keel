import { useRecentTransactions } from "../../hooks/useTransactions";
import TransactionRow from "../transactions/TransactionRow";

export default function RecentTransactions() {
  const { data: recentTransactions } = useRecentTransactions();

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">
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
