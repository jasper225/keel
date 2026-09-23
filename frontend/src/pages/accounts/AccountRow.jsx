import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { formatCurrency } from "../../utils/formatCurrency";

export default function AccountRow({ account, balance, onEdit }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
      <div>
        <p className="font-medium text-gray-900">{account.name}</p>
        <p className="text-sm text-gray-500 capitalize">
          {" "}
          {account.type.replace("_", " ")} * {account.currency}
        </p>
        <span className="text-sm font-medium text-gray-900">
          {isLoading ? "..." : formatCurrency(balance, account.currency)}
        </span>
        <p className="font-medium text-gray-500">
          <Link to={`/accounts/${account.id}`}>Details</Link>
        </p>{" "}
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={() => onEdit(account)}>Edit</Button>
      </div>
    </div>
  );
}
