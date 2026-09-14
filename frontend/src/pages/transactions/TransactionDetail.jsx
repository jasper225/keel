import { useParams } from "react-router-dom";
import {
  useTransaction,
  useTransactionTags,
} from "../../hooks/useTransactions";

export default function TransactionDetail() {
  const { id } = useParams();
  const { data: transaction, isLoading, error } = useTransaction(id);
  const { data: tags } = useTransactionTags(id);
  if (isLoading) return <p>Loading transaction ...</p>;
  if (error) return <p className="text-red-600">Error loading transaction</p>;
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">
        Transaction Details
      </h1>
      <h2 className="font-semibold text-gray-900">
        Account: {transaction.account}
      </h2>
      <h2 className="font-semibold text-gray-900">
        Category: {transaction.category}
      </h2>
      <h2 className="font-semibold text-gray-900">Type: {transaction.type}</h2>
      <h2 className="font-semibold text-gray-900">
        Amount: {transaction.amount}
      </h2>
      <h2 className="font-semibold text-gray-900">
        Date Occured: {transaction.occured_at}
      </h2>
      <h2 className="font-semibold text-gray-900">Tags: {tags}</h2>
    </div>
  );
}


