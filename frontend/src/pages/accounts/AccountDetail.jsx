import { useParams } from "react-router-dom";
import {
  useAccount,
  useAccountBalance,
  useAccountTransactions,
} from "../../hooks/useAccounts";
import TransactionRow from "../../pages/transactions/TransactionRow";
import "../styles/Detail.css";

function formatCurrency(amount, currency) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount,
  );
}

export default function AccountDetail() {
  const { id } = useParams();
  const { data: account, isLoading, error } = useAccount(id);
  const { data: balance } = useAccountBalance(id);
  const { data: transactions = [] } = useAccountTransactions(id);
  if (isLoading) return <p>Loading account ...</p>;
  if (error) return <p className="text-red-600">Error loading account</p>;
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">{account.name}</h1>
      <h2 className="font-semibold text-gray-900">
        Account Type: {account.type}
      </h2>
      <h2 className="font-semibold text-gray-900">
        Account Currency: {account.currency}
      </h2>
      <h2 className="font-semibold text-gray-900">
        Account Balance:{" "}
        {balance !== undefined
          ? formatCurrency(balance, account.currency)
          : "..."}
      </h2>
      <h2 className="font-semibold text-gray-900">Transactions</h2>
      <div className="flex flex-col space-y-2">
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet for #{tag.name}.</p>
        ) : (
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
